import { useEffect, useState, useMemo } from 'react';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';

import {
  apiGetListPontoData,
  apiPostPontoData,
  apiGetPontoDiaData,
  apiPutPontoDiaData,
} from '../api/api.js';

function ClockNow() {
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

function PontoPage() {
  return (
    <>
      <h3>Página de Ponto</h3>
      <PontoAdd />
      <PontoList />
    </>
  );
}

function PontoList() {
  useEffect(() => {
    const getEventoData = async () => {
      const data = await apiGetListPontoData();
      //console.log(data);
      //setEventoData(data);
      //setLoading(false);
    };
    getEventoData();
  }, []);

  return <></>;
}

function PontoAdd() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
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

  async function handleClick(e) {
    e.preventDefault();
    let now = moment();
    if (now.isValid()) {
      setFormData(formData => ({
        ...formData,
        ponto: [...formData['ponto'], now.format('HH:mm')],
      }));
      setLoading(true);
    }
  }

  useEffect(() => {
    const setTextStatus = async () => {
      if (formData.ponto?.length > 0) {
        await apiPutPontoDiaData(formData.id, formData);
        setLoading(false);
      }
    };
    setTextStatus();
  }, [formData]);

  useEffect(() => {
    const setTextStatus = () => {
      if (formData.ponto?.length > 0) {
        setTxtPonto(statusPonto[formData.ponto?.length]);
      }
    };
    setTextStatus();
  }, [formData, statusPonto]);

  useEffect(() => {
    let fetchData = async () => {
      let dados = {
        matricula: 12345,
        data: moment().format('YYYY-MM-DD'),
        ponto: [],
      };

      let pontoDia = await apiGetPontoDiaData(dados);
      pontoDia =
        pontoDia?.length === 0 ? await apiPostPontoData(dados) : pontoDia[0];

      if (pontoDia?.id) {
        setFormData({
          ...formData,
          id: pontoDia?.id,
          matricula: pontoDia?.matricula,
          data: pontoDia?.data,
        });

        pontoDia?.ponto?.forEach(p => {
          setFormData(formData => ({
            ...formData,
            ponto: [...formData['ponto'], p],
          }));
        });
      }
    };
    fetchData();
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
      <h1 className="text-lg mt-3 text-center">
        <ClockNow />
      </h1>

      {formData.ponto?.length <= 5 && (
        <div className="text-center">
          <button
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type=" button"
            onClick={handleClick}
          >
            Bater Ponto {txtPonto}
          </button>
        </div>
      )}

      {formData.ponto?.map((p, i) => {
        return (
          <p className="mt-3 text-justify" key={i}>
            {statusPonto[i]}: {moment(formData.data + ' ' + p).format('HH:mm')}
          </p>
        );
      })}
    </>
  );
}

export { PontoPage, PontoAdd };
