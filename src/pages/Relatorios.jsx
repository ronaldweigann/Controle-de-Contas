import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function Relatorios({ contas }) {
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

  const total = contas.reduce((soma, conta) => soma + Number(conta.valor), 0);

  function formatarValor(valor) {
    return Number(valor).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Relatórios
        </h2>

        <p className="mt-1 text-slate-500">
          Veja como suas contas estão distribuídas.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total cadastrado</p>

          <h3 className="mt-2 text-3xl font-bold text-slate-900">
            {formatarValor(total)}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {contas.length} conta(s) cadastrada(s)
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-slate-900">
            Gastos por categoria
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Distribuição das suas contas.
          </p>

          {dados.length === 0 ? (
            <div className="flex min-h-75 items-center justify-center">
              <p className="text-sm text-slate-500">
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
