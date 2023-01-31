import axiosModule from 'axios';

const axios = axiosModule.create({ baseURL: 'http://localhost:3001' });

/*Funcionario*/
async function apiListFuncionario() {
  const { data } = await axios.get(`/funcionario`, handleResponse);
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

async function apiPostEvento(post) {
  const { data } = await axios.post(`/evento`, post, handleResponse);
  return data;
}

/*Ponto*/
async function apiListPonto() {
  const { data } = await axios.get(`/ponto`, handleResponse);
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

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Erro ao carregar dados.');
  }
}

export {
  apiListFuncionario,
  apiPostFuncionario,
  apiListEvento,
  apiPostEvento,
  apiListPonto,
  apiGetPontoDia,
  apiPostPonto,
  apiPutPontoDia,
};
