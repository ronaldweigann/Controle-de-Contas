import { useState } from "react";

function Welcome({ salvarNome }) {
  const [nome, setNome] = useState("");

  function enviarFormulario(event) {
    event.preventDefault();

    const nomeFinal = nome.trim();

    if (!nomeFinal) {
      alert("Digite seu nome para continuar.");
      return;
    }

    salvarNome(nomeFinal);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-3xl">
            💰
          </div>

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Bem-vindo ao Conta Fácil!
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Antes de começar, queremos saber como podemos chamar você.
          </p>
        </div>

        <form onSubmit={enviarFormulario}>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Seu nome
          </label>

          <input
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite seu nome"
            autoFocus
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          <button
            type="submit"
            className="mt-5 w-full rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Começar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Welcome;
