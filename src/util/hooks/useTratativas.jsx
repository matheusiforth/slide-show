import React, { useContext, useEffect } from 'react'
import { useMutation, useQuery } from "react-query";
import { reqColunaDisponibilidadeTurno } from "../requisicoes";
import { useColunaDisponibilidade } from "./useRequisicoes";
import MeuContexto from '../context';

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
    const { unidade, linhaProducao, periodo } = useContext(MeuContexto)

    const handleExecutaRequestions = async (unidade, linhaProducao, periodo) => { //desgraçado
        if (linhaProducao?.length > 0 && periodo) {
            // console.log(unidade, linhaProducao, periodo)
            requestions.mutate({ unidade, linhaProducao, periodo })
        }
    }

    useEffect(() => {
        if (linhaProducao?.length > 0 && periodo) {
            colunaDisponibilidade.mutationColunaDisponibilidadeTurno(unidade, linhaProducao, periodo)
            handleExecutaRequestions(unidade, linhaProducao, periodo)
        }
    }, [unidade, linhaProducao, periodo]);

    if (!requestions.isSuccess) { //enquanto nao houver requisição e puxar dados, os valores serão zero
        // console.log('if do zero')
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

        const valorDisponibilidade = responseColunaDisponibilidadeTurno?.[0]?.DISPONIBILIDADE === undefined || responseColunaDisponibilidadeTurno?.[0]?.DISPONIBILIDADE === 0 ? 0 : responseColunaDisponibilidadeTurno?.[0]?.DISPONIBILIDADE?.toLocaleString('pt-BR', { currency: 'BRL' })
        const valorTempoParado = responseColunaDisponibilidadeTurno?.[0]?.TEMPOPARADO === undefined || responseColunaDisponibilidadeTurno?.[0]?.TEMPOPARADO === 0 ? 0 : responseColunaDisponibilidadeTurno?.[0]?.TEMPOPARADO?.toLocaleString('pt-BR', { currency: 'BRL' })

        return {
            valorDisponibilidade,
            valorTempoParado
        }
    }

    const { valorTempoParado, valorDisponibilidade } = calcularDisponibilidade();

    return {
        handleExecutaRequestions,
        dados: {
            dadosColunaDisponibilidade: {
                valorTempoParado,
                valorDisponibilidade
            },
        },
        // functions: {
        //     mutationColunaDisponibilidadeTurno: colunaDisponibilidade.mutationColunaDisponibilidadeTurno
        // }
    }
}