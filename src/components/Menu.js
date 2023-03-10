
import { useEffect, useState } from 'react';
import { verifyLogin } from './LoginPage.js';

export default function Menu() {

  useEffect(() => {
    verifyLogin();
  }, []);

  function MenuAdmin() {
    return (
      <div className="container mx-auhref p-4">
        <ul className="flex flex-row flex-wrap justify-center">
          <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
            <a href="/funcionario">Funcionário</a>
          </li>
          <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
            <a href="/evento">Evento</a>
          </li>

          <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
            <a href="/moderacao">Moderação</a>
          </li>
          <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    );
  }

  function MenuUser() {
    return (
      <div className="container mx-auhref p-4">
        <ul className="flex flex-row flex-wrap justify-center">
          <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
            <a href="/ponto/add">Ponto</a>
          </li>
          <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
    );
  }

  function defineMenu() {
    var perfil = parseInt(localStorage.getItem('perfil'));
    if (perfil === 1) {
      return <MenuAdmin />;
    } else if (perfil === 2) {
      return <MenuUser />;
    }
  }

  return (
    <div>
      <main>
        {defineMenu()}
      </main>
    </div>
  );
}
