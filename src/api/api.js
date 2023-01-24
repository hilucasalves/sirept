import axiosModule from 'axios';

const axios = axiosModule.create({ baseURL: 'http://localhost:3001' });

async function apiGetFuncionarioData() {
  const { data: funcionarioData } = await axios.get(`/funcionarios`);
  return funcionarioData;
}

export { apiGetFuncionarioData };
