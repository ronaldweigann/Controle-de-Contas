import { useState } from "react";

function Configuracoes({ contas, limparContas, nomeUsuario, salvarNome }) {
  const [editandoNome, setEditandoNome] = useState(false);
  const [novoNome, setNovoNome] = useState(nomeUsuario);

  function alterarNome(event) {
    event.preventDefault();

    const nomeFinal = novoNome.trim();

    if (!nomeFinal) {
      alert("Digite um nome válido.");
      return;
    }

    salvarNome(nomeFinal);
    setNovoNome(nomeFinal);
    setEditandoNome(false);
  }

  function cancelarAlteracao() {
    setNovoNome(nomeUsuario);
    setEditandoNome(false);
  }

  function confirmarLimpeza() {
    const confirmou = window.confirm(
      "Tem certeza que deseja apagar todas as contas? Essa ação não pode ser desfeita.",
    );

    if (confirmou) {
      limparContas();
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Configurações
        </h2>

        <p className="mt-1 text-slate-500">
          Gerencie as configurações do seu Conta Fácil.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">
        {/* PERFIL */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Perfil</h3>

          <p className="mt-1 text-sm text-slate-500">
            Personalize as informações que aparecem no seu Conta Fácil.
          </p>

          {!editandoNome ? (
            <div className="mt-5">
              <div className="flex flex-col gap-4 rounded-xl bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase text-slate-500">
                    Seu nome
                  </p>

                  <p className="mt-1 text-lg font-semibold text-slate-800">
                    {nomeUsuario}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setEditandoNome(true)}
                  className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  ✏️ Alterar nome
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={alterarNome} className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Seu nome
              </label>

              <input
                type="text"
                value={novoNome}
                onChange={(event) => setNovoNome(event.target.value)}
                autoFocus
                placeholder="Digite seu nome"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                >
                  ✓ Salvar alteração
                </button>

                <button
                  type="button"
                  onClick={cancelarAlteracao}
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancelar
                </button>
              </div>
            </form>
          )}
        </section>

        {/* INFORMAÇÕES DO SISTEMA */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">
            Informações do sistema
          </h3>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-sm text-slate-500">Contas cadastradas</span>

              <strong className="text-slate-800">{contas.length}</strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">Armazenamento</span>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                LocalStorage
              </span>
            </div>
          </div>
        </section>

        {/* ZONA DE PERIGO */}
        <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900">Zona de perigo</h3>

          <p className="mt-1 text-sm text-slate-500">
            Essa ação removerá todas as contas salvas neste navegador.
          </p>

          <button
            type="button"
            onClick={confirmarLimpeza}
            className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            🗑️ Apagar todas as contas
          </button>
        </section>
      </div>
    </div>
  );
}

export default Configuracoes;
