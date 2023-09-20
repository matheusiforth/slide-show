import { useState } from "react";
import { useMutation } from "react-query";
import { reqColunaDisponibilidadeAgrupado, reqColunaDisponibilidadeTurno, reqColunaProducao } from "../requisicoes";

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

    const calcularDisponibilidade = () => {

        const buscaDadosDisponibilidade = responseColunaDisponibilidadeTurno
        const valorDisponibilidade = buscaDadosDisponibilidade?.[0]?.disponibilidade === undefined || buscaDadosDisponibilidade?.[0]?.disponibilidade === 0 ? 0 : buscaDadosDisponibilidade?.[0]?.disponibilidade?.toLocaleString('pt-BR', { currency: 'BRL' })
        const valorTempoParado = buscaDadosDisponibilidade?.[0]?.tempominparada === undefined || buscaDadosDisponibilidade?.[0]?.tempominparada === 0 ? 0 : buscaDadosDisponibilidade?.[0]?.tempominparada?.toLocaleString('pt-BR', { currency: 'BRL' })

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

    const buscaDadosDisponibilidade = dataColunaDisponibilidadeTurno

    // disponibilidade
    const valorDisponibilidade = buscaDadosDisponibilidade?.[0]?.disponibilidade === undefined || buscaDadosDisponibilidade?.[0]?.disponibilidade === 0 ? 0 : buscaDadosDisponibilidade?.[0]?.disponibilidade?.toLocaleString('pt-BR', { currency: 'BRL' })
    const valorTempoParado = buscaDadosDisponibilidade?.[0]?.tempominparada === undefined || buscaDadosDisponibilidade?.[0]?.tempominparada === 0 ? 0 : buscaDadosDisponibilidade?.[0]?.tempominparada?.toLocaleString('pt-BR', { currency: 'BRL' })

    return {
        mutationColunaDisponibilidadeTurno: validacaoColunaDisponibilidadeTurno,
        dadosColunaDisponibilidade: {
            valorDisponibilidade,
            valorTempoParado,
        }
    }
}