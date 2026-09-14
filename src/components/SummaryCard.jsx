function SummaryCard({ titulo, valor, descricao, icone, tipo }) {
  const cores = {
    azul: "bg-blue-50 text-blue-600",
    verde: "bg-emerald-50 text-emerald-600",
    laranja: "bg-orange-50 text-orange-600",
    vermelho: "bg-red-50 text-red-600",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{titulo}</p>

          <h3 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
            {valor}
          </h3>

          <p className="mt-2 text-xs text-slate-500">{descricao}</p>
        </div>

        <div
          className={`
            flex h-11 w-11 items-center justify-center
            rounded-xl text-xl
            ${cores[tipo] || cores.azul}
          `}
        >
          {icone}
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
