import {
  NavLink,
  Route,
  BrowserRouter,
  Navigate,
  Routes,
} from 'react-router-dom';

import Home from './HomePage.js';
import { FuncionarioIndex, FuncionarioAdd } from './FuncionarioPage.js';
import { EventoIndex, EventoAdd } from './EventoPage.js';
import { PontoAdd } from './PontoPage.js';
import { ModeracaoIndex, ModeracaoAdd } from './ModeracaoPage.js';
import { MyDocument } from './PontoDocument.js';

export default function Menu() {
  return (
    <BrowserRouter>
      <div>
        <main>
          <div className="container mx-auto p-4">
            <ul className="flex flex-row flex-wrap justify-center">
              <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
                <NavLink to="/inicio">Início</NavLink>
              </li>
              <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
                <NavLink to="/funcionario">Funcionário</NavLink>
              </li>
              <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
                <NavLink to="/evento">Evento</NavLink>
              </li>
              <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
                <NavLink to="/ponto/add">Ponto</NavLink>
              </li>
              <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
                <NavLink to="/moderacao">Moderação</NavLink>
              </li>
              <li className="mx-2 cursor-pointer text-blue-500 hover:text-blue-800">
                <NavLink to="/folha-ponto">Folha de Ponto</NavLink>
              </li>
            </ul>
            <Routes>
              <Route
                path="/inicio"
                element={<Navigate to="/" />}
                replace={true}
              />
              {/* Home */}
              <Route path="/" element={<Home />} />
              {/* Funcionario */}
              <Route path={`/funcionario`} element={<FuncionarioIndex />} />
              <Route path={`/funcionario/add`} element={<FuncionarioAdd />} />
              {/* Evento */}
              <Route path={`/evento`} element={<EventoIndex />} />
              <Route path={`/evento/add`} element={<EventoAdd />} />
              {/* Ponto */}
              {/*<Route path={`/ponto`} element={<PontoPage />} />*/}
              <Route path={`/ponto/add`} element={<PontoAdd />} />
              {/* Moderação */}
              <Route path={`/moderacao`} element={<ModeracaoIndex />} />
              <Route path={`/moderacao/:id`} element={<ModeracaoAdd />} />
              {/* Folha de Ponto */}
              <Route path={`/folha-ponto`} element={<MyDocument />} />
            </Routes>
          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}
