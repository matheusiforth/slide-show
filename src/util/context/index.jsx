import React, { createContext, useState, useEffect, useContext } from 'react';

export const MeuContexto = createContext();

export const MeuContextoProvider = ({ children }) => {
    const [estado, setEstado] = useState(null);

    const atualizaDados = (novosDados) => {
        // if (novosDados) {
        setEstado(novosDados);
        // }
    };

    useEffect(() => {
        // limpa o localStorage quando o componente é montado
        localStorage.clear();
    }, []);


    return (
        <MeuContexto.Provider value={{ estado, atualizaDados }}>
            {children}
        </MeuContexto.Provider>
    );
}

export const useMeuContexto = () => {
    return useContext(MeuContexto)
}