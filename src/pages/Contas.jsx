import AccountForm from "../components/AccountForm";
import AccountTable from "../components/AccountTable";

function Contas({ contas, adicionarConta, editarConta, marcarComoPaga, excluirConta }) {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Minhas contas
        </h2>

        <p className="mt-1 text-slate-500">Cadastre e acompanhe suas contas.</p>
      </div>

      <AccountForm adicionarConta={adicionarConta} />

      <div className="mt-8">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Contas cadastradas
          </h3>

          <p className="text-sm text-slate-500">
            Gerencie suas contas e pagamentos.
          </p>
        </div>

        <AccountTable
          contas={contas}
          editarConta={editarConta}
          marcarComoPaga={marcarComoPaga}
          excluirConta={excluirConta}
        />
      </div>
    </div>
  );
}

export default Contas;
