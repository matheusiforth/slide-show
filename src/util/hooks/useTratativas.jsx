import React, { useContext, useEffect } from 'react'
import { useMutation, useQuery } from "react-query";
import { reqColunaDisponibilidadeTurno, reqEficienciaProducaoTurnoDia } from "../requisicoes";
import { useColunaDisponibilidade, useEficienciaProducaoTurnoDia } from "./useRequisicoes";
import MeuContexto from '../context';
import { converteJson } from '../global/converteJson';

export function useTratativas() {
    const useRequestions = () => {
        return useMutation({
            mutationFn: ({ unidade, linhaProducao, periodo }) => {
                const resultados = Promise.all([
                    reqColunaDisponibilidadeTurno({ unidade, linhaProducao, periodo }),
                    reqEficienciaProducaoTurnoDia({ linhaProducao }),
                ])
                return resultados
            }
        })
    }

    const requestions = useRequestions() //passei para const pois nao dava para usar no if
    const colunaDisponibilidade = useColunaDisponibilidade()
    const eficienciaProducaoTurnoDia = useEficienciaProducaoTurnoDia()

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
            eficienciaProducaoTurnoDia.mutationEficienciaProducaoTurnoDia(linhaProducao)
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
                    valorProducao: 0,
                    arrayTempoParado: 0,

                },
                dadosEficienciaProducao: {
                    valorProducao: 0,
                    arrayProducao: 0,
                }
            },
            functions: {
                mutationColunaDisponibilidadeTurno: colunaDisponibilidade.mutationColunaDisponibilidadeTurno,
                mutationEficienciaProducaoTurnoDia: eficienciaProducaoTurnoDia.mutationEficienciaProducaoTurnoDia

            }
        }
    }

    const [responseColunaDisponibilidadeTurno, responseEficienciaProducaoTurnoDia] = requestions?.data

    const calcularDisponibilidade = () => {

        const valorDisponibilidade = responseColunaDisponibilidadeTurno?.[0]?.DISPONIBILIDADE === undefined || responseColunaDisponibilidadeTurno?.[0]?.DISPONIBILIDADE === 0 ? 0 : responseColunaDisponibilidadeTurno?.[0]?.DISPONIBILIDADE?.toLocaleString('pt-BR', { currency: 'BRL' })
        const valorTempoParado = responseColunaDisponibilidadeTurno?.[0]?.TEMPOPARADO === undefined || responseColunaDisponibilidadeTurno?.[0]?.TEMPOPARADO === 0 ? 0 : responseColunaDisponibilidadeTurno?.[0]?.TEMPOPARADO?.toLocaleString('pt-BR', { currency: 'BRL' })
        const arrayTempoParado = responseColunaDisponibilidadeTurno?.[0]?.TEMPOPARADO === undefined || responseColunaDisponibilidadeTurno?.[0]?.TEMPOPARADO === 0 ? 0 : responseColunaDisponibilidadeTurno?.map((value, index) => value?.TEMPOPARADO)

        // console.log(teste)

        return {
            valorDisponibilidade,
            valorTempoParado,
            arrayTempoParado
        }
    }

    const calculaEficienciaProducao = () => {

        const valorProducao = responseEficienciaProducaoTurnoDia?.[0]?.PRODUCAO === undefined || responseEficienciaProducaoTurnoDia?.[0]?.PRODUCAO === 0 ? 0 : responseEficienciaProducaoTurnoDia?.[0]?.PRODUCAO?.toLocaleString('pt-BR', { currency: 'BRL' })
        const arrayProducao = responseEficienciaProducaoTurnoDia?.[0]?.PRODUCAO === undefined || responseEficienciaProducaoTurnoDia?.[0]?.PRODUCAO === 0 ? 0 : responseEficienciaProducaoTurnoDia?.map((value, index) => value?.PRODUCAO)

        // converteJson(arrayProducao)

        return {
            valorProducao,
            arrayProducao
        }
    }

    const { valorTempoParado, valorDisponibilidade, arrayTempoParado } = calcularDisponibilidade();
    const { valorProducao, arrayProducao } = calculaEficienciaProducao();

    return {
        handleExecutaRequestions,
        dados: {
            dadosColunaDisponibilidade: { valorTempoParado, valorDisponibilidade, arrayTempoParado },
            dadosEficienciaProducao: { valorProducao, arrayProducao }
        },
        // functions: {
        //     mutationColunaDisponibilidadeTurno: colunaDisponibilidade.mutationColunaDisponibilidadeTurno
        // }
    }
}