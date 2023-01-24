import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { apiGetListEventoData } from '../api/api.js';

function EventoPage() {
  const [eventoData, setEventoData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEventoData = async () => {
      const data = await apiGetListEventoData();
      setEventoData(data);
      setLoading(false);
    };
    getEventoData();
  }, []);

  if (loading) {
    return (
      <div className="mt-8 text-center">
        <ClipLoader />
      </div>
    );
  }

  return (
    <>
      <div className="text-center my-6">
        <a
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          href="/evento/add"
        >
          Adicionar Evento
        </a>
      </div>
      {eventoData.length > 0 && (
        <table className="mx-auto border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-200 p-4">Evento</th>
              <th className="border border-slate-200 p-4">Dia Início</th>
              <th className="border border-slate-200 p-4">Dia Fim</th>
            </tr>
          </thead>
          <tbody>
            {eventoData.map((evento, index) => {
              const { id, nome, data_inicio, data_fim } = evento;
              return (
                <tr key={id} className="odd:bg-slate-100 even:bg-slate-50">
                  <td className="border border-slate-200 p-4">{nome}</td>
                  <td className="border border-slate-200 p-4">{data_inicio}</td>
                  <td className="border border-slate-200 p-4">{data_fim}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

function EventoAdd() {
  //const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    matricula: '',
    nome: '',
    cargo: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    /*const resp = await apiPostFuncionarioData(formData);
    if (resp.id) {
      navigate('/funcionario');
    }*/
  };

  if (loading) {
    return (
      <div className="mt-8 text-center">
        <ClipLoader />
      </div>
    );
  }

  return (
    <>
      <p className="mt-5 text-center">Adicionar Funcionário</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="matricula"
          >
            Matrícula
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="matricula"
            name="matricula"
            placeholder="Matrícula"
            required
            value={formData.matricula}
            onChange={e =>
              setFormData({ ...formData, matricula: e.target.value })
            }
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="nome"
          >
            Nome
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="nome"
            name="nome"
            placeholder="Nome"
            required
            value={formData.nome}
            onChange={e => setFormData({ ...formData, nome: e.target.value })}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cargo"
          >
            Cargo
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            id="cargo"
            name="cargo"
            placeholder="Cargo"
            required
            value={formData.cargo}
            onChange={e => setFormData({ ...formData, cargo: e.target.value })}
          />
        </div>

        <button
          className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </>
  );
}

export { EventoPage, EventoAdd };
