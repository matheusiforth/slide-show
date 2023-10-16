import React, { createContext, useContext, useState } from 'react';
import { useRequeIni } from './hooks/useReqInicial';

const MeuContexto = createContext();

export function MeuContextoProvider({ children }) {

    const [unidade, setUnidade] = useState(0)
    const [linhaProducao, setLinhaProducao] = useState([])
    const [linhaEscolha, setLinhaEscolha] = useState([])
    const [periodo, setPeriodo] = useState(null)

    function atualizarContador(value) {
        const { unidade, idLinhaProducao, idLinhaEscolha, periodo, zeraDados } = value;

        if (unidade !== undefined) {
            setUnidade(unidade);
        }
        if (idLinhaProducao !== undefined) {
            setLinhaProducao(idLinhaProducao);
        }
        if (idLinhaEscolha !== undefined) {
            setLinhaEscolha(idLinhaEscolha);
        }
        if (periodo != undefined) {
            setPeriodo(periodo)
        }
        if (zeraDados === true) {
            setUnidade(0)
            setLinhaProducao(0)
            setLinhaEscolha(0)
            setPeriodo(0)
        }
    }

    return (
        <MeuContexto.Provider value={{ atualizarContador, unidade, linhaProducao, linhaEscolha, periodo }}>
            {children}
        </MeuContexto.Provider>
    );
}

export default MeuContexto;