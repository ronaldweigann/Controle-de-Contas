import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function Relatorios({ contas }) {
  // =========================================================
  // FUNÇÕES AUXILIARES
  // =========================================================

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

  // =========================================================
  // RESUMO FINANCEIRO
  // =========================================================

  const totalContas = contas.length;

  const contasPagas = contas.filter((conta) => conta.paga);

  const contasAtrasadas = contas.filter((conta) => estaAtrasada(conta));

  const contasPendentes = contas.filter(
    (conta) => !conta.paga && !estaAtrasada(conta),
  );

  const valorTotal = contas.reduce(
    (soma, conta) => soma + Number(conta.valor),
    0,
  );

  const valorPago = contasPagas.reduce(
    (soma, conta) => soma + Number(conta.valor),
    0,
  );

  const valorPendente = contasPendentes.reduce(
    (soma, conta) => soma + Number(conta.valor),
    0,
  );

  const valorAtrasado = contasAtrasadas.reduce(
    (soma, conta) => soma + Number(conta.valor),
    0,
  );

  // =========================================================
  // GASTOS POR CATEGORIA
  // =========================================================

  const dadosPorCategoria = contas.reduce((resultado, conta) => {
    const categoria = conta.categoria || "Outros";

    if (!resultado[categoria]) {
      resultado[categoria] = 0;
    }

    resultado[categoria] += Number(conta.valor);

    return resultado;
  }, {});

  const dados = Object.entries(dadosPorCategoria).map(([categoria, valor]) => ({
    categoria,
    valor,
  }));

  // =========================================================
  // RENDERIZAÇÃO
  // =========================================================

  return (
    <div>
      {/* =====================================================
          TÍTULO
          ===================================================== */}

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Relatórios
        </h2>

        <p className="mt-1 text-slate-500">
          Veja como suas contas estão distribuídas.
        </p>
      </div>

      {/* =====================================================
          ÁREA PRINCIPAL
          ===================================================== */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ===================================================
            CARD RESUMO FINANCEIRO
            =================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total cadastrado</p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {formatarValor(valorTotal)}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {totalContas}{" "}
            {totalContas === 1 ? "conta cadastrada" : "contas cadastradas"}
          </p>

          {/* Resumo financeiro */}

          <div className="mt-6 border-t border-slate-100 pt-6">
            <h4 className="text-sm font-bold text-slate-800">
              Resumo financeiro
            </h4>

            <div className="mt-4 space-y-3">
              {/* Valor pago */}

              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-emerald-700">
                      Contas pagas
                    </p>

                    <p className="mt-1 text-xs text-emerald-600">
                      {contasPagas.length}{" "}
                      {contasPagas.length === 1 ? "conta" : "contas"}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-emerald-800">
                    {formatarValor(valorPago)}
                  </p>
                </div>
              </div>

              {/* Valor pendente */}

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-amber-700">
                      Contas pendentes
                    </p>

                    <p className="mt-1 text-xs text-amber-600">
                      {contasPendentes.length}{" "}
                      {contasPendentes.length === 1 ? "conta" : "contas"}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-amber-800">
                    {formatarValor(valorPendente)}
                  </p>
                </div>
              </div>

              {/* Valor atrasado */}

              <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Contas atrasadas
                    </p>

                    <p className="mt-1 text-xs text-red-600">
                      {contasAtrasadas.length}{" "}
                      {contasAtrasadas.length === 1 ? "conta" : "contas"}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-red-800">
                    {formatarValor(valorAtrasado)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================
            GRÁFICO
            =================================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900">
            Gastos por categoria
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Distribuição das suas contas.
          </p>

          {dados.length === 0 ? (
            <div className="flex min-h-75 items-center justify-center">
              <p className="text-center text-sm text-slate-500">
                Cadastre contas para visualizar o gráfico.
              </p>
            </div>
          ) : (
            <div className="mt-6 h-87.5 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dados}
                    dataKey="valor"
                    nameKey="categoria"
                    cx="50%"
                    cy="50%"
                    outerRadius={110}
                    label={({ value }) => formatarValor(value)}
                  >
                    {dados.map((item, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          [
                            "#3b82f6",
                            "#10b981",
                            "#f59e0b",
                            "#ef4444",
                            "#8b5cf6",
                            "#06b6d4",
                            "#ec4899",
                            "#84cc16",
                            "#f97316",
                          ][index % 9]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip formatter={(valor) => formatarValor(valor)} />

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Relatorios;
