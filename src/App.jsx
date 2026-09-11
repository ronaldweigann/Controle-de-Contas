function App() {
  return (
    <div className="min-h-screen bg-slate-100">

        {/* HEADER */}
      <header className="border-b border-slate-200 bg-white">
        <div className="flex h-16 items-center justify-between px-6">

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Controle de Contas
            </h1>

            <p className="text-xs text-slate-500">
              Controle suas contas
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            R
          </div>

        </div>
      </header>

        {/* CONTEÚDO */}
      <main className="mx-auto max-w-7xl p-6">

          {/* TÍTULO */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">
            Olá
          </h2>

          <p className="mt-1 text-slate-500">
            Aqui está o resumo das suas conta.
          </p>
        </div>

          {/* CARD */}
        <div className="grid gap-4 md:grid-cols-3">
            {/* TOTAL */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Total de contas
            </p>

            <h3 className="mt-2 text-3xl font-bold text-slate-900">
              R$ 1.250,00
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Este mês
            </p>
          </div>

            {/* PAGAS */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Contas pagas
            </p>

            <h3 className="mt-2 text-3xl font-bold text-emerald-600">
              R$ 650,00
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Já quitadas
            </p>
          </div>

            {/* PENDENTES */}
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              Contas pendentes
            </p>

            <h3 className="mt-2 text-3xl font-bold text-orange-500">
              R$ 600,00
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Aguardando pagamento
            </p>
          </div>
        </div>

          {/* PRÓXIMAS CONTAS */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Próximas contas
              </h3>

              <p className="text-sm text-slate-500">
                Contas que estão próximas do vencimento
              </p>
            </div>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
              + Nova conta
            </button>
          </div>

            {/* CONTA 1 */}
          <div className="flex items-center justify-between border-b border-slate-100 py-4">
            <div>
              <h4 className="font-semibold text-slate-800">
                Internet
              </h4>

              <p className="text-sm text-slate-500">
                Vencimento: 15/09/2026
              </p>
            </div>

            <strong className="text-slate-900">
              R$ 140,00
            </strong>
          </div>

          {/* CONTA 2 */}
          <div className="flex items-center justify-between border-b border-slate-100 py-4">
            <div>
              <h4 className="font-semibold text-slate-800">
                Energia
              </h4>

              <p className="text-sm text-slate-500">
                Vencimento: 16/09/2026
              </p>
            </div>

            <strong className="text-slate-900">
              R$ 200,00
            </strong>
          </div>

          {/* CONTA 1 */}
          <div className="flex items-center justify-between border-b border-slate-100 py-4">
            <div>
              <h4 className="font-semibold text-slate-800">
                Água
              </h4>

              <p className="text-sm text-slate-500">
                Vencimento: 16/09/2026
              </p>
            </div>

            <strong className="text-slate-900">
              R$ 70,00
            </strong>
          </div>

        </section>
      </main>
    </div>
  );
}

export default App;
