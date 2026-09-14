function Dashboard({ contas, nomeUsuario, irParaContas }) {
  function estaAtrasada(conta) {
    if (conta.paga) {
      return false;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const vencimento = new Date(`${conta.data}T00:00:00`);

    return vencimento < hoje;
  }

  function formatarValor(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(data) {
    if (!data) {
      return "-";
    }

    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  const totalContas = contas.length;

  const contasPagas = contas.filter((conta) => conta.paga);

  const contasAtrasadas = contas.filter((conta) => estaAtrasada(conta));

  const contasPendentes = contas.filter(
    (conta) => !conta.paga && !estaAtrasada(conta),
  );

  const valorTotal = contas.reduce(
    (total, conta) => total + Number(conta.valor),
    0,
  );

  const valorPago = contasPagas.reduce(
    (total, conta) => total + Number(conta.valor),
    0,
  );

  const valorPendente = contasPendentes.reduce(
    (total, conta) => total + Number(conta.valor),
    0,
  );

  const valorAtrasado = contasAtrasadas.reduce(
    (total, conta) => total + Number(conta.valor),
    0,
  );

  const proximasContas = contas
    .filter((conta) => !conta.paga && !estaAtrasada(conta))
    .sort((a, b) => new Date(a.data) - new Date(b.data))
    .slice(0, 5);

  return (
    <div>
      {/* Cabeçalho */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Olá, {nomeUsuario}! 👋
        </h2>

        <p className="mt-1 text-slate-500">
          Aqui está um resumo das suas contas.
        </p>
      </div>

      {/* Cards principais */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total de contas
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {totalContas}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl">
              💰
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {formatarValor(valorTotal)}
          </p>
        </div>

        {/* Pagas */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">Contas pagas</p>

              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {contasPagas.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl">
              ✓
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {formatarValor(valorPago)}
          </p>
        </div>

        {/* Pendentes */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Contas pendentes
              </p>

              <p className="mt-2 text-2xl font-bold text-amber-600">
                {contasPendentes.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-2xl">
              ⏳
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            {formatarValor(valorPendente)}
          </p>
        </div>

        {/* Atrasadas */}
        <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Contas atrasadas
              </p>

              <p className="mt-2 text-2xl font-bold text-red-600">
                {contasAtrasadas.length}
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-2xl">
              🔴
            </div>
          </div>

          <p className="mt-4 text-sm text-red-600">
            {formatarValor(valorAtrasado)}
          </p>
        </div>
      </div>

      {/* Próximas contas */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Próximas contas
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Contas pendentes com vencimento mais próximo.
            </p>
          </div>

          <button
            type="button"
            onClick={irParaContas}
            className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Ver todas
          </button>
        </div>

        {proximasContas.length === 0 ? (
          <div className="p-8 text-center">
            <div className="text-4xl">🎉</div>

            <p className="mt-3 font-semibold text-slate-800">
              Nenhuma conta pendente próxima!
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Você está em dia com suas contas futuras.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {proximasContas.map((conta) => (
              <div
                key={conta.id}
                className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-800">{conta.nome}</p>

                  <p className="mt-1 text-sm text-slate-500">
                    {conta.categoria} • Vence em {formatarData(conta.data)}
                  </p>
                </div>

                <p className="font-bold text-slate-800">
                  {formatarValor(conta.valor)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resumo financeiro */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm font-medium text-emerald-700">Valor já pago</p>

          <p className="mt-2 text-xl font-bold text-emerald-800">
            {formatarValor(valorPago)}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-medium text-amber-700">Valor pendente</p>

          <p className="mt-2 text-xl font-bold text-amber-800">
            {formatarValor(valorPendente)}
          </p>
        </div>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm font-medium text-red-700">Valor atrasado</p>

          <p className="mt-2 text-xl font-bold text-red-800">
            {formatarValor(valorAtrasado)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
