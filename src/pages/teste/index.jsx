import React, { useContext } from 'react';
import MeuContexto from "../../util/context";
import { useTratativas } from "../../util/hooks"

export default function Teste() {

    const {
        dados: {
            dadosColunaDisponibilidade
        }
    } = useTratativas()

    // console.log(dadosColunaDisponibilidade)

    const { unidade, linhaProducao, linhaEscolha } = useContext(MeuContexto);

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', position: 'absolute', left: '0', zIndex: '999' }}>
                <h1 style={{
                    width: 'fit-content',
                    height: '5vh',
                    background: 'red',
                    color: 'white'
                }}>
                    tempo parado: {dadosColunaDisponibilidade?.valorTempoParado}
                </h1>
                <h1 style={{
                    width: 'fit-content',
                    height: '5vh',
                    background: 'blue',
                    color: 'white'
                }}>
                    disponibilidade {dadosColunaDisponibilidade?.valorDisponibilidade}
                </h1>
                <h1 style={{
                    width: 'fit-content',
                    height: '5vh',
                    background: 'green',
                    color: 'white'
                }}>
                    unidade: {unidade}
                </h1>
                <h1 style={{
                    width: 'fit-content',
                    height: '5vh',
                    background: 'purple',
                    color: 'white'
                }}>
                    linha produção: {linhaProducao}
                </h1>
                <h1 style={{
                    width: 'fit-content',
                    height: '5vh',
                    background: 'brown',
                    color: 'white'
                }}>
                    linha escolha: {linhaEscolha}
                </h1>
            </div>
        </>
    )
}

// export function useBuscaDados() {
//     const {
//         dados: {
//             dadosColunaDisponibilidade
//         }
//     } = useTratativas()

//     console.log(dadosColunaDisponibilidade)

//     return {
//         dados: {
//             dadosColunaDisponibilidade,
//         }
//     }
// }