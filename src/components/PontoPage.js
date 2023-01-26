import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import moment from 'moment';

import { apiGetListPontoData, apiPostPontoData } from '../api/api.js';

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

  return (
    <>
      <p>a</p>
    </>
  );
}

function PontoAdd() {
  const [loading, setLoading] = useState(false);
  const [ponto, setPonto] = useState([]);

  const [matricula, setMatricula] = useState(null);
  const [data, setData] = useState(null);

  const [formData, setFormData] = useState(
    { matricula: null, data: null, horas: [] },
    [ponto]
  );

  const statusPonto = [
    'Entrada 1',
    'Saída 1',
    'Entrada 2',
    'Saída 2',
    'Entrada 3',
    'Saída 3',
  ];

  const [txtPonto, setTxtPonto] = useState(statusPonto[0]);

  async function handleClick(e) {
    e.preventDefault();
    let now = moment();
    if (now.isValid()) {
      setPonto([...ponto, now.format('YYYY-MM-DD HH:mm')]);

      //setFormData();

      //const resp = await apiPostPontoData(formData);
      //if (resp) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, '500');
      setTxtPonto(statusPonto[ponto.length + 1]);
      //}
    }
  }

  useEffect(() => {
    setMatricula(12345);
    setData(moment().format('YYYY-MM-DD'));
  }, [matricula, data]);

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

      {ponto.length <= 5 && (
        <div className="text-center">
          <button
            className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type=" button"
            onClick={handleClick}
          >
            Bater Ponto: {txtPonto}
          </button>
        </div>
      )}

      {ponto.map((p, i) => {
        return (
          <p className="mt-3 text-justify" key={i}>
            {statusPonto[i]}: {moment(p).format('DD/MM/YYYY HH:mm')}
          </p>
        );
      })}
    </>
  );
}

export { PontoPage, PontoAdd };
