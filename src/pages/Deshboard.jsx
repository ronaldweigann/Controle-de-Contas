import SummaryCard from "../components/SummaryCard";

function Dashboard({ contas, irParaContas }) {
  const total = contas.reduce((soma, conta) => soma + Number(conta.valor), 0);

  const pagas = contas
    .filter((conta) => conta.paga)
    .reduce((soma, conta) => soma + Number(conta.valor), 0);

  const pendentes = contas
    .filter((conta) => !conta.paga)
    .reduce((soma, conta) => soma + Number(conta.valor), 0);

  const proximasContas = [...contas]
    .filter((conta) => !conta.paga)
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(0, 5);

  function formatarValor(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  return (
    <div>
      <div className="mb8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Olá 👋
        </h2>

        <p className="mt-1 text-slate-500">
          Aqui está o resumo das suas contas.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          titulo="Total de contas"
          valor={formatarValor(total)}
          descricao="Valor total cadastrado"
          icone="💰"
          tipo="azul"
        />

        <SummaryCard
          titulo="Contas pagas"
          valor={formatarValor(pagas)}
          descricao="Contas já quitadas"
          icone="✓"
          tipo="verde"
        />

        <SummaryCard
          titulo="Contas pendentes"
          valor={formatarValor(pendentes)}
          descricao="Aguardando pagamento"
          icone="⏳"
          tipo="laranja"
        />
      </div>

      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Próximas contas
            </h3>

            <p className="text-sm-text-slate-500">
              Contas pendentes mais próximas do vencimento
            </p>
          </div>

          <button
            onClick={irParaContas}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            + Nova conta
          </button>
        </div>

        {proximasContas.length === 0 ? (
          <div className="rounded-xl bg-emerald-50 p-6 text-center">
            <p className="font-semibold text-emerald-700">🎉 Tudo em dia!</p>

            <p className="mt-1 text-sm text-emerald-600">
              Você não possui contas pendentes.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {proximasContas.map((conta) => (
              <div
                key={conta.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <h4 className="truncate font-semibold text-slate-800">
                    {conta.nome}
                  </h4>

                  <p className="text-sm text-slate-500">
                    Vencimento: {formatarData(conta.data)}
                  </p>
                </div>

                <strong className="shrink-0 text-sm text-slate-900 sm:text-base">
                  {formatarValor(conta.valor)}
                </strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
