import { useEffect, useState, useMemo } from 'react';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';
import 'moment/locale/pt-br';
import { apiListFuncionario, apiGetPontoModeracao } from '../api/api.js';

import { GoSearch } from 'react-icons/go';

function ModeracaoIndex() {
  const [mes, setMes] = useState(moment().format('YYYY-MM'));
  const [funcionario, setFuncionario] = useState(0);
  const [listFuncionario, setListFuncionario] = useState([]);
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);

  const statusPonto = useMemo(
    () => [
      'Entrada 1',
      'Saída 1',
      'Entrada 2',
      'Saída 2',
      'Entrada 3',
      'Saída 3',
    ],
    []
  );

  useEffect(() => {
    let fetchFuncionario = async () => {
      await apiListFuncionario().then((data) => {
        setListFuncionario(data);
      });
    };

    fetchFuncionario();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (funcionario != 0) {
      setLoading(true);
      await apiGetPontoModeracao({
        matricula: funcionario,
        data: mes,
      }).then((data) => {
        setData(data);
        setLoading(false);
      });
    }
  };

  return (
    <>
      <div className="text-center mt-8 grid gap-6 md:grid-cols-1 mx-auto md:w-1/4">
        <form onSubmit={handleSubmit}>
          <input
            name="mes"
            type="month"
            value={mes}
            onChange={(e) => setMes(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
          <select
            name="funcionario"
            className="mt-8 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={funcionario}
            onChange={(e) => setFuncionario(e.target.value)}
            required
          >
            <option key="0" value="0">
              Selecione um funcionário
            </option>

            {listFuncionario.map((f, i) => {
              const { matricula, nome } = f;
              return (
                <option key={i} value={matricula}>
                  {nome}
                </option>
              );
            })}
          </select>

          <button
            className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            <GoSearch />
          </button>
        </form>
      </div>

      {loading && (
        <div className="mt-8 text-center">
          <ClipLoader />
        </div>
      )}

      {!loading && data?.length > 0 && (
        <table className="mt-8 mx-auto border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-200 p-2">Data</th>
              <th
                className="border border-slate-200 p-2"
                title={statusPonto[0]}
              >
                E/1
              </th>
              <th
                className="border border-slate-200 p-2"
                title={statusPonto[1]}
              >
                S/1
              </th>
              <th
                className="border border-slate-200 p-2"
                title={statusPonto[2]}
              >
                E/2
              </th>
              <th
                className="border border-slate-200 p-2"
                title={statusPonto[3]}
              >
                S/2
              </th>
              <th
                className="border border-slate-200 p-2"
                title={statusPonto[4]}
              >
                E/3
              </th>
              <th
                className="border border-slate-200 p-2"
                title={statusPonto[5]}
              >
                S/3
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((f, i) => {
              return (
                <tr key={i} className="odd:bg-slate-100 even:bg-slate-50">
                  <td className="border border-slate-200 p-2">
                    {moment(f.data).locale('pt-br').format('DD/MM/YYYY (dddd)')}
                  </td>
                  <td className="border border-slate-200 p-2">{f.ponto[0]}</td>
                  <td className="border border-slate-200 p-2">{f.ponto[1]}</td>
                  <td className="border border-slate-200 p-2">{f.ponto[2]}</td>
                  <td className="border border-slate-200 p-2">{f.ponto[3]}</td>
                  <td className="border border-slate-200 p-2">{f.ponto[4]}</td>
                  <td className="border border-slate-200 p-2">{f.ponto[5]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

export { ModeracaoIndex };
