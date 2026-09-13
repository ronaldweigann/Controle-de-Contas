function Configuracoes({ contas, limparContas }) {
  function confirmarLimpeza() {
    const confirmou = window.confirm(
      'Tem certeza que deseja apagar todas as contas? Essa ação não pode ser desfeita.'
    )

    if (confirmou) {
      limparContas()
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

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h3 className="text-lg font-bold text-slate-900">
            Informações do sistema
          </h3>

          <div className="mt-5 space-y-4">

            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-sm text-slate-500">
                Contas cadastradas
              </span>

              <strong className="text-slate-800">
                {contas.length}
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                Armazenamento
              </span>

              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                LocalStorage
              </span>
            </div>

          </div>

        </section>

        <section className="rounded-2xl border border-red-200 bg-white p-6 shadow-sm">

          <h3 className="text-lg font-bold text-slate-900">
            Zona de perigo
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Essa ação removerá todas as contas salvas neste navegador.
          </p>

          <button
            onClick={confirmarLimpeza}
            className="mt-5 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
          >
            🗑️ Apagar todas as contas
          </button>

        </section>

      </div>

    </div>
  )
}

export default Configuracoes