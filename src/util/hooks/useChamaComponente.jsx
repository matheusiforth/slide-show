import { useState } from "react";
import { useMutation } from "react-query";
import { reqColunaDisponibilidadeTurno } from "../requisicoes";

export function useChamaComponente() {

    const [componente, setComponente] = useState(null);

    const atualizarComponente = (novoComponente) => {
        setComponente(novoComponente);
    };

    return { componente, atualizarComponente };
}

export function useMutations() {

    const useRequestions = () => {
        return useMutation({
            mutationFn: ({ unidade, linhaProducao, periodo }) => {
                const resultados = Promise.all([
                    reqColunaDisponibilidadeTurno({ unidade, linhaProducao, periodo }),
                ])
                return resultados
            }
        })
    }

    const requestions = useRequestions() //passei para const pois nao dava para usar no if
    const colunaDisponibilidade = useColunaDisponibilidade()

    if (!requestions.isSuccess) { //enquanto nao houver requisição e puxar dados, os valores serão zero
        return {
            dados: {
                dadosColunaDisponibilidade: {
                    valorDisponibilidade: 0,
                    valorTempoParado: 0,
                },
            },
            functions: {
                mutationColunaDisponibilidadeTurno: colunaDisponibilidade.mutationColunaDisponibilidadeTurno
            }
        }
    }

    const [responseColunaDisponibilidadeTurno] = requestions?.data

    console.log(requestions)

    const calcularDisponibilidade = () => {

        const valorDisponibilidade = responseColunaDisponibilidadeTurno?.[0]?.disponibilidade === undefined || responseColunaDisponibilidadeTurno?.[0]?.disponibilidade === 0 ? 0 : responseColunaDisponibilidadeTurno?.[0]?.disponibilidade?.toLocaleString('pt-BR', { currency: 'BRL' })
        const valorTempoParado = responseColunaDisponibilidadeTurno?.[0]?.tempoparado === undefined || responseColunaDisponibilidadeTurno?.[0]?.tempoparado === 0 ? 0 : responseColunaDisponibilidadeTurno?.[0]?.tempoparado?.toLocaleString('pt-BR', { currency: 'BRL' })

        return {
            valorDisponibilidade,
            valorTempoParado
        }
    }

    const { valorTempoParado, valorDisponibilidade } = calcularDisponibilidade();

    return {
        dados: {
            dadosColunaDisponibilidade: {
                valorTempoParado,
                valorDisponibilidade
            },
        },
        functions: {
            mutationColunaDisponibilidadeTurno: colunaDisponibilidade.mutationColunaDisponibilidadeTurno
        }
    }
}

function useColunaDisponibilidade() {

    const { mutate: mutateColunaDisponibilidadeTurno, data: dataColunaDisponibilidadeTurno } = useMutation({
        mutationKey: ['mutationDisponibilidadeTurno'],
        mutationFn: reqColunaDisponibilidadeTurno,
    })

    function validacaoColunaDisponibilidadeTurno(unidade, linhaProducao, periodo) {
        mutateColunaDisponibilidadeTurno({ unidade, linhaProducao, periodo })
    }

    // const valorDisponibilidade = dataColunaDisponibilidadeTurno?.[0]?.disponibilidade === undefined || dataColunaDisponibilidadeTurno?.[0]?.disponibilidade === 0 ? 0 : dataColunaDisponibilidadeTurno?.[0]?.disponibilidade?.toLocaleString('pt-BR', { currency: 'BRL' })
    // const valorTempoParado = dataColunaDisponibilidadeTurno?.[0]?.tempoparado === undefined || dataColunaDisponibilidadeTurno?.[0]?.tempoparado === 0 ? 0 : dataColunaDisponibilidadeTurno?.[0]?.tempoparado?.toLocaleString('pt-BR', { currency: 'BRL' })

    return {
        mutationColunaDisponibilidadeTurno: validacaoColunaDisponibilidadeTurno,
        // dadosColunaDisponibilidade: {
        //     valorDisponibilidade,
        //     valorTempoParado
        // },
    }
}