function Header({ abrirMenu, nomeUsuario }) {
  const inicial = nomeUsuario ? nomeUsuario.charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6">
        <button
          onClick={abrirMenu}
          className="rounded-lg p-2 text-xl text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <div className="ml-auto flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {nomeUsuario}
            </p>

            <p className="text-xs text-slate-500">Controle financeiro</p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            {inicial}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
