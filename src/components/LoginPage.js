import { useContext, createContext, useEffect, useState } from 'react';
import { apiGetFuncionario } from '../api/api.js';

export const MyContext = createContext();

export const UserProvider = ({ children }) => {
    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');

    return (
        <MyContext.Provider
            value={{
                matricula,
                setMatricula,
                senha,
                setSenha
            }}
        >
            {children}
        </MyContext.Provider>
    );
};

export function LoginIndex() {

    const usuario = useContext(MyContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await apiGetFuncionario(usuario).then(resp => {
            if (resp.matricula) {
                localStorage.setItem('user', usuario.matricula);
            }
        });
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
                                    <input type="text" name="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="name@company.com" required={true}
                                        onChange={(e) =>
                                            usuario.setMatricula(e.target.value)
                                        }
                                    />
                                </div>
                                <div>
                                    <label
                                        className="block text-gray-700 text-sm font-bold mb-2"
                                        htmlFor="senha"
                                    >
                                        Senha
                                    </label>
                                    <input type="password" name="senha" id="senha" placeholder="••••••••" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required={true} onChange={(e) =>
                                        usuario.setSenha(e.target.value)
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