import { useState } from 'react';
import { apiGetFuncionario } from '../api/api.js';

export function verifyLogin() {
    if (!localStorage.getItem('user')) {
        window.location.assign('/');
    }
}

export function Logout() {
    localStorage.clear();
    window.location.assign('/');
}

export function LoginIndex() {

    const [usuario, setUsuario] = useState({ matricula: '', senha: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (usuario.matricula === 'admin') {
            localStorage.setItem('user', JSON.stringify(usuario));
            localStorage.setItem('perfil', 1);
            window.location.assign('home');
        } else {
            await apiGetFuncionario(usuario).then(resp => {
                if (resp[0]?.matricula) {
                    localStorage.setItem('user', JSON.stringify(usuario));
                    localStorage.setItem('perfil', 2);
                    window.location.assign('home');
                }
            });
        }
    };

    return (
        <div>
            <section className="mt-4">
                <div className="flex flex-col items-center justify-center mx-auto">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-center">
                                Login
                            </h1>
                            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="matricula"
                                    >
                                        Matrícula
                                    </label>
                                    <input type="text" name="matricula" id="matricula" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="12345" required={true}
                                        onChange={(e) =>
                                            setUsuario({ ...usuario, matricula: e.target.value })
                                        } />
                                </div>
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="senha"
                                    >
                                        Senha
                                    </label>
                                    <input type="password" name="senha" id="senha" placeholder="••••••••" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={true}
                                        onChange={(e) =>
                                            setUsuario({ ...usuario, senha: e.target.value })
                                        } />
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Entrar
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>
            </section >
        </div >

    );
}