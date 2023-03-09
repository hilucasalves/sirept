import axiosModule from 'axios';

const axios = axiosModule.create({ baseURL: 'http://localhost:3001' });

/*Funcionario*/
async function apiListFuncionario() {
  const { data } = await axios.get(
    `/funcionario?_sort=nome&_order=asc`,
    handleResponse
  );
  return data;
}

async function apiGetFuncionario(get) {
  const { data } = await axios.get(
    `/funcionario?matricula=${get.matricula}`,
    handleResponse
  );
  return data;
}

async function apiPostFuncionario(post) {
  const { data } = await axios.post(`/funcionario`, post, handleResponse);
  return data;
}

/*Evento*/
async function apiListEvento() {
  const { data } = await axios.get(`/evento`, handleResponse);
  return data;
}

async function apiGetEventoMes(get) {
  const { data } = await axios.get(
    `/evento?data_inicio_like=${get.mes}&_sort=data_inicio&_order=asc`,
    handleResponse
  );
  return data;
}

async function apiPostEvento(post) {
  const { data } = await axios.post(`/evento`, post, handleResponse);
  return data;
}

/*Ponto*/
async function apiListPonto() {
  const { data } = await axios.get(`/ponto`, handleResponse);
  return data;
}

async function apiGetPonto(id) {
  const { data } = await axios.get(`/ponto/${id}`, handleResponse);
  return data;
}

async function apiGetPontoDia(get) {
  const { data } = await axios.get(
    `/ponto?matricula=${get.matricula}&data=${get.data}`,
    handleResponse
  );
  return data;
}

async function apiPostPonto(post) {
  const { data } = await axios.post(`/ponto`, post, handleResponse);
  return data;
}

async function apiPutPontoDia(id, put) {
  const { data } = await axios.put(`/ponto/${id}`, put, handleResponse);
  return data;
}

async function apiGetPontoModeracao(get) {
  const { data } = await axios.get(
    `/ponto?matricula=${get.matricula}&data_like=${get.data}&_sort=data&_order=asc`,
    handleResponse
  );
  return data;
}

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Erro ao carregar dados.');
  }
}

export {
  apiListFuncionario,
  apiGetFuncionario,
  apiPostFuncionario,
  apiListEvento,
  apiGetEventoMes,
  apiPostEvento,
  apiListPonto,
  apiGetPonto,
  apiGetPontoDia,
  apiPostPonto,
  apiPutPontoDia,
  apiGetPontoModeracao,
};
