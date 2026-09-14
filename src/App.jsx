import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Welcome from "./components/Welcome";

import Dashboard from "./pages/Dashboard";
import Contas from "./pages/Contas";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";

const contasIniciais = [];

function App() {
  const [paginaAtual, setPaginaAtual] = useState("dashboard");

  const [nomeUsuario, setNomeUsuario] = useState(() => {
    return localStorage.getItem("conta-facil-nome") || "";
  });

  const [contas, setContas] = useState(() => {
    const contasSalvas = localStorage.getItem("conta-facil-contas");

    if (!contasSalvas) {
      return contasIniciais;
    }

    try {
      const contasConvertidas = JSON.parse(contasSalvas);

      if (Array.isArray(contasConvertidas)) {
        return contasConvertidas;
      }

      return contasIniciais;
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
      return contasIniciais;
    }
  });

  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    localStorage.setItem("conta-facil-contas", JSON.stringify(contas));
  }, [contas]);

  function salvarNome(nome) {
    const nomeFinal = nome.trim();

    if (!nomeFinal) {
      return;
    }

    localStorage.setItem("conta-facil-nome", nomeFinal);
    setNomeUsuario(nomeFinal);
  }

  function adicionarConta(novaConta) {
    const conta = {
      ...novaConta,
      id: Date.now(),
    };

    setContas((contasAtuais) => [...contasAtuais, conta]);

    setPaginaAtual("contas");
  }

  function editarConta(contaAtualizada) {
    setContas((contasAtuais) =>
      contasAtuais.map((conta) =>
        conta.id === contaAtualizada.id ? contaAtualizada : conta,
      ),
    );
  }

  function marcarComoPaga(id) {
    setContas((contasAtuais) =>
      contasAtuais.map((conta) =>
        conta.id === id ? { ...conta, paga: true } : conta,
      ),
    );
  }

  function excluirConta(id) {
    const confirmou = window.confirm("Deseja realmente excluir esta conta?");

    if (!confirmou) {
      return;
    }

    setContas((contasAtuais) =>
      contasAtuais.filter((conta) => conta.id !== id),
    );
  }

  function limparContas() {
    setContas([]);
  }

  function renderizarPagina() {
    switch (paginaAtual) {
      case "dashboard":
        return (
          <Dashboard
            contas={contas}
            nomeUsuario={nomeUsuario}
            irParaContas={() => setPaginaAtual("contas")}
          />
        );

      case "contas":
        return (
          <Contas
            contas={contas}
            adicionarConta={adicionarConta}
            editarConta={editarConta}
            marcarComoPaga={marcarComoPaga}
            excluirConta={excluirConta}
          />
        );

      case "relatorios":
        return <Relatorios contas={contas} />;

      case "configuracoes":
        return (
          <Configuracoes
            contas={contas}
            limparContas={limparContas}
            nomeUsuario={nomeUsuario}
            salvarNome={salvarNome}
          />
        );

      default:
        return (
          <Dashboard
            contas={contas}
            nomeUsuario={nomeUsuario}
            irParaContas={() => setPaginaAtual("contas")}
          />
        );
    }
  }

  // Se o usuário ainda não informou o nome,
  // mostra a tela de boas-vindas.
  if (!nomeUsuario) {
    return <Welcome salvarNome={salvarNome} />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex min-h-screen">
        <Sidebar
          paginaAtual={paginaAtual}
          mudarPagina={setPaginaAtual}
          menuAberto={menuAberto}
          fecharMenu={() => setMenuAberto(false)}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Header
            abrirMenu={() => setMenuAberto(true)}
            nomeUsuario={nomeUsuario}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">{renderizarPagina()}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
