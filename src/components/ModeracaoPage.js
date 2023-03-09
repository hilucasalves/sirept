import { useEffect, useState, useMemo } from 'react';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';
import 'moment/locale/pt-br';
import {
  apiGetPonto,
  apiListFuncionario,
  apiGetPontoModeracao,
  apiPutPontoDia,
  apiGetEventoMes,
} from '../api/api.js';
import { GoSearch, GoFilePdf } from 'react-icons/go';
import { useParams, Link } from 'react-router-dom';
import { PontoDocument } from './PontoDocument.js';
import { PDFDownloadLink } from '@react-pdf/renderer';

function ModeracaoIndex() {
  const [mes, setMes] = useState(moment().format('YYYY-MM'));
  const [funcionario, setFuncionario] = useState(0);
  const [listFuncionario, setListFuncionario] = useState([]);
  const [data, setData] = useState([]);
  const [evento, setEvento] = useState([]);

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

    let fetchEvento = async () => {
      await apiGetEventoMes({
        mes: mes
      }).then((data) => {
        const dados = [];
        data.forEach((e) => {
          const start = moment(e.data_inicio);
          const end = moment(e.data_fim);
          while (start.isSameOrBefore(end)) {
            const pos = dados.map(e => e.data).indexOf(start.format('YYYY-MM-DD'));
            if (pos === -1) {
              dados.push({
                data: start.format('YYYY-MM-DD'),
                desc: e.nome
              });
            }
            start.add(1, "day");
          }
        });
        setEvento(dados);
      });
    }
    fetchFuncionario();
    fetchEvento();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (funcionario !== 0) {
      setLoading(true);

      await apiGetPontoModeracao({
        matricula: funcionario,
        data: mes,
      }).then((data) => {
        setLoading(false);

        const start = moment(mes).startOf('month');
        const end = moment(mes).endOf('month');
        const dados = [];

        while (start.isSameOrBefore(end)) {

          let find = null;
          find = evento.find(({ data }) => data === start.format('YYYY-MM-DD'));

          if (!find) {
            find = data.find(({ data }) => data === start.format('YYYY-MM-DD'));
          }

          dados.push({
            id: find?.id,
            dia: start.format("DD"),
            data: start.format('DD/MM/YYYY'),
            ext: start.format("dddd"),
            ponto: find?.ponto,
            evento: find?.desc
          });

          start.add(1, "day");
        }

        setData(dados);
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

          {funcionario > 0 && (
            <button
              className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <GoSearch />
            </button>
          )}

          {!loading && data?.length > 0 && funcionario > 0 && (
            <div>
              <PDFDownloadLink document={<PontoDocument data={data} />} fileName="folha-ponto.pdf">
                {({ blob, url, loading, error }) => (loading ? '...'
                  :
                  <button
                    className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    <GoFilePdf />
                  </button>)}
              </PDFDownloadLink>
            </div>
          )}

        </form>
      </div>

      {loading && (
        <div className="mt-8 text-center">
          <ClipLoader />
        </div>
      )}

      {!loading && data?.length > 0 && funcionario > 0 && (
        <table className="mt-8 mx-auto border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-200 p-2">Dia</th>
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
                    {f.id > 0 ?
                      <Link to={`/moderacao/${f.id}`}>
                        {f.dia + ', ' + f.ext}
                      </Link>
                      : f.dia + ', ' + f.ext
                    }
                  </td>

                  {f.evento && (
                    <td className="border border-slate-200 p-2 text-center" colSpan={6}>{f.evento}</td>
                  )}

                  {f.ponto && (
                    f.ponto.map((p, i) => {
                      return (<td key={i} className="border border-slate-200 p-2">{p}</td>);
                    })
                  )}

                  {!f.evento && !f.ponto && (
                    <td className="border border-slate-200 p-2 text-center" colSpan={6}></td>
                  )}

                </tr>
              );
            })}
          </tbody>
        </table>
      )
      }
    </>
  );
}

function ModeracaoAdd() {
  let { id } = useParams();

  const [form, setForm] = useState({
    matricula: null,
    data: null,
    ponto: [],
    id: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let fetchPonto = async () => {
      await apiGetPonto(id).then((data) => {
        if (data.id) {
          setForm({
            ...form,
            id: data.id,
            matricula: data.matricula,
            data: data.data,
            ponto: data.ponto,
          });
        }
      });
    };
    fetchPonto();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await apiPutPontoDia(form.id, form).then((data) => {
      if (data.id) {
        setLoading(false);
      }
    });
  };

  const updatePonto = (index) => (e) => {
    const newForm = { ...form };
    const newPonto = [...newForm.ponto];
    newPonto[index] = e.target.value;
    newForm.ponto = newPonto;
    setForm(newForm);
  };

  return (
    <>
      {loading && (
        <div className="mt-8 text-center">
          <ClipLoader />
        </div>
      )}

      {!loading && form.id && (
        <form onSubmit={handleSubmit}>
          <div className="mt-8 grid grid-cols-2 gap-2">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="e1"
              >
                Entrada 1
              </label>
              <input
                type="time"
                id="e1"
                name="e1"
                min="07:00"
                max="18:00"
                value={form.ponto[0] || ''}
                onChange={updatePonto(0)}
                required
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="s1"
              >
                Saída 1
              </label>

              <input
                type="time"
                id="s1"
                name="s1"
                min="07:00"
                max="18:00"
                value={form.ponto[1] || ''}
                onChange={updatePonto(1)}
                required
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="e1"
              >
                Entrada 2
              </label>
              <input
                type="time"
                id="e2"
                name="e2"
                min="07:00"
                max="18:00"
                value={form.ponto[2] || ''}
                onChange={updatePonto(2)}
                required
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="s2"
              >
                Saída 2
              </label>

              <input
                type="time"
                id="s2"
                name="s2"
                min="07:00"
                max="18:00"
                value={form.ponto[3] || ''}
                onChange={updatePonto(3)}
                required
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2">
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="e3"
              >
                Entrada 3
              </label>
              <input
                type="time"
                id="e3"
                name="e3"
                min="07:00"
                max="18:00"
                value={form.ponto[4] || ''}
                onChange={updatePonto(4)}
                required
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="s3"
              >
                Saída 3
              </label>

              <input
                type="time"
                id="s3"
                name="s3"
                min="07:00"
                max="18:00"
                value={form.ponto[5] || ''}
                onChange={updatePonto(5)}
                required
                className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline"
            >
              Salvar
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export { ModeracaoIndex, ModeracaoAdd };
