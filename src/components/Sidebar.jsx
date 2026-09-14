function Sidebar({ paginaAtual, mudarPagina, menuAberto, fecharMenu }) {
  const itens = [
    {
      id: "dashboard",
      nome: "Dashboard",
      icone: "📊",
    },
    {
      id: "contas",
      nome: "Contas",
      icone: "💰",
    },
    {
      id: "relatorios",
      nome: "Relatórios",
      icone: "📈",
    },
    {
      id: "configuracoes",
      nome: "Configurações",
      icone: "⚙️",
    },
  ];

  function navegar(id) {
    mudarPagina(id);
    fecharMenu();
  }

  return (
    <>
      {menuAberto && (
        <div
          onClick={fecharMenu}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-72 flex-col
          border-r border-slate-200 bg-white
          transition-transform duration-300
          lg:static lg:translate-x-0
          ${menuAberto ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Conta Fácil</h1>

            <p className="text-xs text-slate-500">Controle financeiro</p>
          </div>

          <button
            type="button"
            onClick={fecharMenu}
            className="rounded-lg p-2 text-xl text-slate-500 transition hover:bg-slate-100 lg:hidden"
            aria-label="Fechar menu"
          >
            ✕
          </button>
        </div>

        <nav className="flex-1 space-y-2 p-4">
          {itens.map((item) => {
            const ativo = paginaAtual === item.id;

            return (
              <button
                key={item.id}
                onClick={() => navegar(item.id)}
                className={`
                  flex w-full items-center gap-3 rounded-xl px-4 py-3
                  text-left text-sm font-medium transition
                  ${
                    ativo
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100"
                  }
                `}
              >
                <span className="text-lg">{item.icone}</span>

                {item.nome}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-slate-200 p-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-xs text-slate-500">Conta Fácil</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              Organize sua vida financeira.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
