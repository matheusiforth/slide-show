import React, { createContext, useState } from 'react';

export const MeuContexto = createContext();

export const MeuContextoProvider = ({ children }) => {
    const [estado, setEstado] = useState(false);

    const minhaFuncao = (novoValue) => {
        setEstado(novoValue)
    };

    console.log(estado)

    return (
        <MeuContexto.Provider value={{ estado, minhaFuncao }}>
            {children}
        </MeuContexto.Provider>
    );
}