function AccountTable({ contas, marcarComoPaga, excluirConta }) {
  function formatarData(data) {
    const [ano, mes, dia] = data.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  function formatarValor(valor) {
    return Number(valor).toLocaleString(`pt-BR`, {
      style: "currency",
      currency: "BRL",
    });
  }

  if (contas.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <div className="text-4xl">🧾</div>

        <h3 className="mt-4 font-semibold text-slate-800">
          Nenhuma conta cadastrada
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Cadastre sua primeira conta para começar.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full `min-w-[700px]`">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Conta
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Categoria
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Vencimento
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Valor
              </th>

              <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-slate-500">
                Status
              </th>

              <th className="px-5 py-4 text-rigth text-xs font-semibold uppercase text-slate-500">
                Ações
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {contas.map((conta) => (
              <tr key={conta.id} className="hover:bg-slate-50">
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-800">{conta.nome}</p>
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                    {conta.categoria}
                </td>

                <td className="px-5 py-4 text-sm text-slate-500">
                    {formatarData(conta.data)}
                </td>

                <td className="px-5 py-4 font-semibold text-slate-800">
                    {formatarValor(conta.valor)}
                </td>

                <td className="px-5 py-4">
                    {conta.paga ? (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                            Paga
                        </span>
                    ) : (
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                            Pendente
                        </span>
                    )}
                </td>

                <td className="px-5 py-4">
                    <div>
                        {!conta.paga && (
                            <button onClick={() => marcarComoPaga(conta.id)} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emeralda-700 hover:bg-emerald-100">
                                ✓ Pagar
                            </button>
                        )}

                        <button onClick={() => excluirConta(conta.id)} className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-100">
                            🗑️
                        </button>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccountTable
