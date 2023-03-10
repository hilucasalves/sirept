import React from "react";
import {
    Route,
    BrowserRouter,
    Routes,
} from 'react-router-dom';

import Home from './HomePage.js';
import { FuncionarioIndex, FuncionarioAdd } from './FuncionarioPage.js';
import { EventoIndex, EventoAdd } from './EventoPage.js';
import { PontoAdd } from './PontoPage.js';
import { ModeracaoIndex } from './ModeracaoPage.js';
import { LoginIndex, Logout } from './LoginPage.js';

const routes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login */}
                <Route path="/" element={<LoginIndex />} />
                {/* Home */}
                <Route path={`/home`} element={<Home />} />
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
                {/* Logout */}
                <Route path={`/logout`} element={<Logout />} />
                <Route path="*" element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default routes;