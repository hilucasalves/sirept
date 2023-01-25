import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { apiGetListEventoData, apiPostEventoData } from '../api/api.js';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

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
            {eventoData.map(evento => {
              const { id, nome, data_inicio, data_fim } = evento;
              return (
                <tr key={id} className="odd:bg-slate-100 even:bg-slate-50">
                  <td className="border border-slate-200 p-4">{nome}</td>
                  <td className="border border-slate-200 p-4">
                    {moment(data_inicio).format('DD/MM/YYYY')}
                  </td>
                  <td className="border border-slate-200 p-4">
                    {moment(data_fim).format('DD/MM/YYYY')}
                  </td>
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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    nome: '',
    data_inicio: '',
    data_fim: '',
  });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const resp = await apiPostEventoData(formData);
    if (resp.id) {
      navigate('/evento');
    }
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
      <h3 className="my-5 text-center">Adicionar Evento</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-1 mx-auto md:w-1/4">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="nome"
            >
              Evento
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="nome"
              name="nome"
              placeholder="Evento"
              required
              value={formData.nome}
              onChange={e => setFormData({ ...formData, nome: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="data_inicio"
            >
              Data Início
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="data_inicio"
              name="data_inicio"
              placeholder="Data Início"
              required
              value={moment(formData.data_inicio).format('YYYY-MM-DD')}
              onChange={e =>
                setFormData({ ...formData, data_inicio: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="data_fim"
            >
              Data Fim
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="data_fim"
              name="data_fim"
              placeholder="Data Fim"
              required
              value={moment(formData.data_fim).format('YYYY-MM-DD')}
              onChange={e =>
                setFormData({ ...formData, data_fim: e.target.value })
              }
            />
          </div>
          <button
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </>
  );
}

export { EventoPage, EventoAdd };
