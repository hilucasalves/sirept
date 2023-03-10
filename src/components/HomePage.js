import { useEffect } from 'react';
import { verifyLogin } from './LoginPage.js';

export default function Home() {

  useEffect(() => {
    verifyLogin();
  }, []);

  return <p className="mt-8 text-center">Seja bem vindo</p>;
}
