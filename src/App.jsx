import { useEffect, useState } from 'react'

import Sidebar from './components/Sidebar'
import Header from './components/Header'

import Dashboard from './pages/Dashboard'
import Contas from './pages/Contas'
import Relatorios from './pages/Relatorios'
import Configuracoes from './pages/Configuracoes'

const contasIniciais = [
  {
    id: 1,
    nome: 'Internet',
    valor: 140,
    data: '2026-09-15',
    categoria: 'Internet',
    paga: false,
  },
  {
    id: 2,
    nome: 'Energia',
    valor: 200,
    data: '2026-09-16',
    categoria: 'Casa',
    paga: false,
  },
  {
    id: 3,
    nome: 'Água',
    valor: 70,
    data: '2026-09-18',
    categoria: 'Casa',
    paga: true,
  },
]

function App() {
  const [paginaAtual, setPaginaAtual] = useState('dashboard')

  const [contas, setContas] = useState(() => {
    const contasSalvas = localStorage.getItem('conta-facil-contas')

    if (contasSalvas) {
      return JSON.parse(contasSalvas)
    }

    return contasIniciais
  })

  const [menuAberto, setMenuAberto] = useState(false)

  useEffect(() => {
    localStorage.setItem(
      'conta-facil-contas',
      JSON.stringify(contas)
    )
  }, [contas])

  function adicionarConta(novaConta) {
    const conta = {
      ...novaConta,
      id: Date.now(),
    }

    setContas((contasAtuais) => [
      ...contasAtuais,
      conta,
    ])

    setPaginaAtual('contas')
  }

  function marcarComoPaga(id) {
    setContas((contasAtuais) =>
      contasAtuais.map((conta) =>
        conta.id === id
          ? { ...conta, paga: true }
          : conta
      )
    )
  }

  function excluirConta(id) {
    const confirmou = window.confirm(
      'Deseja realmente excluir esta conta?'
    )

    if (!confirmou) {
      return
    }

    setContas((contasAtuais) =>
      contasAtuais.filter((conta) => conta.id !== id)
    )
  }

  function limparContas() {
    setContas([])
  }

  function renderizarPagina() {
    switch (paginaAtual) {
      case 'dashboard':
        return (
          <Dashboard
            contas={contas}
            irParaContas={() => setPaginaAtual('contas')}
          />
        )

      case 'contas':
        return (
          <Contas
            contas={contas}
            adicionarConta={adicionarConta}
            marcarComoPaga={marcarComoPaga}
            excluirConta={excluirConta}
          />
        )

      case 'relatorios':
        return <Relatorios contas={contas} />

      case 'configuracoes':
        return (
          <Configuracoes
            contas={contas}
            limparContas={limparContas}
          />
        )

      default:
        return (
          <Dashboard
            contas={contas}
            irParaContas={() => setPaginaAtual('contas')}
          />
        )
    }
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
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
              {renderizarPagina()}
            </div>
          </main>

        </div>

      </div>

    </div>
  )
}

export default App