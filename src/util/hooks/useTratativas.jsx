import React from 'react'
import { useMutation } from "react-query";
import { reqColunaDisponibilidadeTurno } from "../requisicoes";
import { useColunaDisponibilidade } from "./useRequisicoes";

export function useTratativas() {

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

    const handleExecutaRequestions = async (unidade, linhaProducao, periodo) => { //desgraçado
        if (linhaProducao > 0 && periodo) {
            console.log('id do handle')
            requestions.mutate({ unidade, linhaProducao, periodo })
        }
    }

    if (!requestions.isSuccess) { //enquanto nao houver requisição e puxar dados, os valores serão zero
        console.log('if do zero')
        return {
            handleExecutaRequestions,
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

    const calcularDisponibilidade = () => {

        const valorDisponibilidade = responseColunaDisponibilidadeTurno?.[0]?.disponibilidade === undefined || responseColunaDisponibilidadeTurno?.[0]?.disponibilidade === 0 ? 0 : responseColunaDisponibilidadeTurno?.[0]?.disponibilidade?.toLocaleString('pt-BR', { currency: 'BRL' })
        const valorTempoParado = responseColunaDisponibilidadeTurno?.[0]?.tempoparado === undefined || responseColunaDisponibilidadeTurno?.[0]?.tempoparado === 0 ? 0 : responseColunaDisponibilidadeTurno?.[0]?.tempoparado?.toLocaleString('pt-BR', { currency: 'BRL' })

        return {
            valorDisponibilidade,
            valorTempoParado
        }
    }

    const { valorTempoParado, valorDisponibilidade } = calcularDisponibilidade();
    console.log(valorDisponibilidade, valorTempoParado)

    return {
        handleExecutaRequestions,
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