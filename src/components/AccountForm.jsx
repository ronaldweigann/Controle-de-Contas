import { useState } from "react";

function AccountForm({ adicionarConta }) {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [categoria, setCategoria] = useState("Casa");

  function enviarFormulario(event) {
    event.preventDefault();

    const nomeFinal = nome.trim();
    const valorFinal = valor.trim();
    const dataFinal = data;

    if (!nomeFinal || !valorFinal || !dataFinal) {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const valorNumerico = Number(
      valorFinal.replace(/\./g, "").replace(",", ".")
    );

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      alert("Digite um valor válido.");
      return;
    }

    adicionarConta({
      nome: nomeFinal,
      valor: valorNumerico,
      data: dataFinal,
      categoria,
      paga: false,
    });

    setNome("");
    setValor("");
    setData("");
    setCategoria("Casa");
  }

  return (
    <form
      onSubmit={enviarFormulario}
      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h3 className="text-lg font-bold text-slate-900">
          Nova conta
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Cadastre uma conta para acompanhar seus pagamentos.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Nome da conta
          </label>

          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Ex: Internet"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Valor
          </label>

          <input
            type="text"
            inputMode="decimal"
            value={valor}
            onChange={(event) => setValor(event.target.value)}
            placeholder="Ex: 139,90"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Data de vencimento
          </label>

          <input
            type="date"
            value={data}
            onChange={(event) => setData(event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Categoria
          </label>

          <select
            value={categoria}
            onChange={(event) => setCategoria(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
      >
        + Cadastrar conta
      </button>
    </form>
  );
}

export default AccountForm;