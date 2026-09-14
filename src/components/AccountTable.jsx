import { useState } from "react";

function AccountTable({ contas, editarConta, marcarComoPaga, excluirConta }) {
  const [contaEditando, setContaEditando] = useState(null);

  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("Casa");

  function iniciarEdicao(conta) {
    setContaEditando(conta.id);
    setNome(conta.nome);

    setValor(
      Number(conta.valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );

    setData(conta.data);
    setCategoria(conta.categoria);
  }

  function cancelarEdicao() {
    setContaEditando(null);
    setNome("");
    setValor("");
    setData("");
    setCategoria("Casa");
  }

  function salvarEdicao(event, conta) {
    event.preventDefault();

    const nomeFinal = nome.trim();
    const valorFinal = valor.trim();

    if (!nomeFinal || !valorFinal || !data) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const valorNumerico = Number(
      valorFinal.replace(/\./g, "").replace(",", "."),
    );

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Digite um valor válido.");
      return;
    }

    editarConta({
      ...conta,
      nome: nomeFinal,
      valor: valorNumerico,
      data,
      categoria,
    });

    cancelarEdicao();
  }

  function estaAtrasada(conta) {
    if (conta.paga) {
      return false;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const vencimento = new Date(`${conta.data}T00:00:00`);

    return vencimento < hoje;
  }

  function formatarValor(valorConta) {
    return Number(valorConta).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatarData(dataConta) {
    if (!dataConta) {
      return "-";
    }

    const [ano, mes, dia] = dataConta.split("-");

    return `${dia}/${mes}/${ano}`;
  }

  function renderizarStatus(conta) {
    if (conta.paga) {
      return (
        <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          ✓ Paga
        </span>
      );
    }

    if (estaAtrasada(conta)) {
      return (
        <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700">
          🔴 Atrasada
        </span>
      );
    }

    return (
      <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-700">
        ⏳ Pendente
      </span>
    );
  }

  if (contas.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="text-4xl">📋</div>

        <h3 className="mt-4 text-lg font-bold text-slate-900">
          Nenhuma conta cadastrada
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Cadastre sua primeira conta para começar a organizar suas finanças.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* =========================================================
          VERSÃO DESKTOP
          ========================================================= */}

      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Conta
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Valor
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Vencimento
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Categoria
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {contas.map((conta) => (
                <tr key={conta.id} className="transition hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-800">{conta.nome}</p>
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {formatarValor(conta.valor)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {formatarData(conta.data)}
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                      {conta.categoria}
                    </span>
                  </td>

                  <td className="px-5 py-4">{renderizarStatus(conta)}</td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      {!conta.paga && (
                        <button
                          type="button"
                          onClick={() => marcarComoPaga(conta.id)}
                          className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                          ✓ Pagar
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => iniciarEdicao(conta)}
                        className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        ✏️ Editar
                      </button>

                      <button
                        type="button"
                        onClick={() => excluirConta(conta.id)}
                        className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                      >
                        🗑️ Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* =========================================================
          VERSÃO MOBILE
          ========================================================= */}

      <div className="space-y-4 md:hidden">
        {contas.map((conta) => (
          <div
            key={conta.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            {/* Cabeçalho do card */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Conta
                </p>

                <h3 className="mt-1 wrap-break-word text-lg font-bold text-slate-900">
                  {conta.nome}
                </h3>
              </div>

              <div className="shrink-0">{renderizarStatus(conta)}</div>
            </div>

            {/* Informações */}
            <div className="mt-5 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Valor</p>

                <p className="mt-1 text-base font-bold text-slate-800">
                  {formatarValor(conta.valor)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs font-medium text-slate-500">Vencimento</p>

                <p className="mt-1 text-base font-semibold text-slate-800">
                  {formatarData(conta.data)}
                </p>
              </div>
            </div>

            {/* Categoria */}
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <span className="text-sm text-slate-500">Categoria</span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                {conta.categoria}
              </span>
            </div>

            {/* Ações */}
            <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {!conta.paga && (
                <button
                  type="button"
                  onClick={() => marcarComoPaga(conta.id)}
                  className="rounded-xl bg-emerald-50 px-3 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 active:scale-[0.98]"
                >
                  ✓ Marcar como paga
                </button>
              )}

              <button
                type="button"
                onClick={() => iniciarEdicao(conta)}
                className="rounded-xl bg-blue-50 px-3 py-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-100 active:scale-[0.98]"
              >
                ✏️ Editar
              </button>

              <button
                type="button"
                onClick={() => excluirConta(conta.id)}
                className="rounded-xl bg-red-50 px-3 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100 active:scale-[0.98]"
              >
                🗑️ Excluir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================
          FORMULÁRIO DE EDIÇÃO
          ========================================================= */}

      {contaEditando !== null && (
        <div className="mt-4 rounded-2xl border border-blue-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5">
            <h3 className="text-lg font-bold text-slate-900">
              ✏️ Editar conta
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Altere as informações da conta e salve as modificações.
            </p>
          </div>

          <form
            onSubmit={(event) => {
              const conta = contas.find((item) => item.id === contaEditando);

              if (conta) {
                salvarEdicao(event, conta);
              }
            }}
          >
            <div className="grid gap-5 md:grid-cols-2">
              {/* Nome */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nome da conta
                </label>

                <input
                  type="text"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Valor */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Valor
                </label>

                <input
                  type="text"
                  inputMode="decimal"
                  value={valor}
                  onChange={(event) => setValor(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Data */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Data de vencimento
                </label>

                <input
                  type="date"
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Categoria
                </label>

                <select
                  value={categoria}
                  onChange={(event) => setCategoria(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option>Casa</option>
                  <option>Moradia</option>
                  <option>Transporte</option>
                  <option>Alimentação</option>
                  <option>Internet</option>
                  <option>Educação</option>
                  <option>Saúde</option>
                  <option>Lazer</option>
                  <option>Cartões</option>
                  <option>Outros</option>
                </select>
              </div>
            </div>

            {/* Botões */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
              >
                ✓ Salvar alterações
              </button>

              <button
                type="button"
                onClick={cancelarEdicao}
                className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 active:scale-[0.98]"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AccountTable;
