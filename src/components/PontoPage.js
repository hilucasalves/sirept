import { useEffect, useState, useMemo } from 'react';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';

import { apiPostPonto, apiGetPontoDia, apiPutPontoDia } from '../api/api.js';

function PontoClock() {
  const [data, setData] = useState(new Date());

  useEffect(() => {
    setInterval(
      () => setData(new Date()),
      (60 - new Date().getSeconds()) * 1000
    );
  }, []);

  return (
    <>
      {data.toLocaleString('pt-BR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      })}
    </>
  );
}

function PontoAdd() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    matricula: null,
    data: null,
    ponto: [],
    id: null,
  });

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

  const [txtPonto, setTxtPonto] = useState(statusPonto[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let now = moment();
    if (now.isValid()) {
      setForm((form) => ({
        ...form,
        ponto: [...form['ponto'], now.format('HH:mm')],
      }));
      setLoading(true);
    }
  };

  useEffect(() => {
    const setTextStatus = async () => {
      if (form.ponto?.length > 0) {
        await apiPutPontoDia(form.id, form);
        setLoading(false);
      }
    };
    setTextStatus();
  }, [form]);

  useEffect(() => {
    const setTextStatus = () => {
      if (form.ponto?.length > 0) {
        setTxtPonto(statusPonto[form.ponto?.length]);
      }
    };
    setTextStatus();
  }, [form.ponto?.length, statusPonto]);

  useEffect(() => {
    let fetchPonto = async () => {
      let dados = {
        id: null,
        matricula: 12345,
        data: moment().format('YYYY-MM-DD'),
        ponto: [],
      };

      let pontoDia = await apiGetPontoDia(dados);
      pontoDia =
        pontoDia?.length === 0 ? await apiPostPonto(dados) : pontoDia[0];

      if (await pontoDia?.id) {
        dados.id = pontoDia?.id;
        dados.matricula = pontoDia?.matricula;
        dados.data = pontoDia?.data;
        pontoDia?.ponto?.forEach((p) => {
          dados.ponto.push(p);
        });
      }

      setForm({
        ...form,
        id: dados.id,
        matricula: dados.matricula,
        data: dados.data,
        ponto: dados.ponto,
      });
    };
    fetchPonto();
  }, []);

  return (
    <>
      <h1 className="my-8 text-lg text-center">
        <PontoClock />
      </h1>

      {loading && (
        <div className="mt-8 text-center">
          <ClipLoader />
        </div>
      )}

      {!loading && form.ponto?.length <= 5 && (
        <div className="text-center">
          <form onSubmit={handleSubmit} className="mt-8">
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Bater Ponto {txtPonto}
            </button>
          </form>
        </div>
      )}

      {!loading && form.ponto?.length > 0 && (
        <table className="mt-8 mx-auto border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-200 p-2">Status do Ponto</th>
              <th className="border border-slate-200 p-2">Hora da Batida</th>
            </tr>
          </thead>
          <tbody>
            {form.ponto?.map((p, i) => {
              return (
                <tr key={i} className="odd:bg-slate-100 even:bg-slate-50">
                  <td className="border border-slate-200 p-2">
                    {statusPonto[i]}
                  </td>
                  <td className="border border-slate-200 p-2">
                    {moment(form.data + ' ' + p).format('HH:mm')}
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

export { PontoAdd };
