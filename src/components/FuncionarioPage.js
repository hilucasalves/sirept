import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { apiGetFuncionarioData } from '../api/api.js';

export default function FuncionarioPage() {
  const [funcionarioData, setFuncionarioData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFuncionarioData() {
      const data = await apiGetFuncionarioData();
      setFuncionarioData(data);
      setLoading(false);
      console.log(data);
    }
    getFuncionarioData();
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
      {funcionarioData.map((funcionario, index) => {
        const { id, nome } = funcionario;
        return <p key={id}>{nome}</p>;
      })}
    </>
  );
}
