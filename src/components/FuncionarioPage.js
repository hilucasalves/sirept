import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { apiListFuncionario, apiPostFuncionario } from '../api/api.js';

import { useNavigate } from 'react-router-dom';

function FuncionarioIndex() {
  const [funcionario, setFuncionario] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFuncionario = async () => {
    await apiListFuncionario().then((data) => {
      setFuncionario(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchFuncionario();
  }, [funcionario]);

  return (
    <>
      <div className="text-center my-8">
        <a
          className=" bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline"
          href="/funcionario/add"
        >
          Adicionar Funcionário
        </a>

        {loading && (
          <div className="mt-8 text-center">
            <ClipLoader />
          </div>
        )}
      </div>

      {funcionario.length > 0 && (
        <table className="mx-auto border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-200 p-4">Matricula</th>
              <th className="border border-slate-200 p-4">Nome</th>
              <th className="border border-slate-200 p-4">Cargo</th>
            </tr>
          </thead>
          <tbody>
            {funcionario.map((f) => {
              const { id, nome, matricula, cargo } = f;
              return (
                <tr key={id} className="odd:bg-slate-100 even:bg-slate-50">
                  <td className="border border-slate-200 p-4">{matricula}</td>
                  <td className="border border-slate-200 p-4">{nome}</td>
                  <td className="border border-slate-200 p-4">{cargo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

function FuncionarioAdd() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    matricula: '',
    nome: '',
    cargo: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await apiPostFuncionario(formData).then((resp) => {
      if (resp.id) navigate('/funcionario');
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="grid gap-6 md:grid-cols-1 mx-auto md:w-1/4">
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
              onChange={(e) =>
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
              onChange={(e) =>
                setFormData({ ...formData, nome: e.target.value })
              }
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
              onChange={(e) =>
                setFormData({ ...formData, cargo: e.target.value })
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

export { FuncionarioIndex, FuncionarioAdd };
