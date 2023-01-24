import axiosModule from 'axios';

const axios = axiosModule.create({ baseURL: 'http://localhost:3001' });

async function apiGetListFuncionarioData() {
  const { data } = await axios.get(`/funcionarios`, handleResponse);
  return data;
}

async function apiPostFuncionarioData(post) {
  const { data } = await axios.post(`/funcionarios`, post, handleResponse);
  return data;
}

async function apiGetListEventoData() {
  const { data } = await axios.get(`/eventos`, handleResponse);
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
  apiGetListFuncionarioData,
  apiPostFuncionarioData,
  apiGetListEventoData,
};
