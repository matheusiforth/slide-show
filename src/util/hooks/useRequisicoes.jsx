import { useMutation } from "react-query";
import { reqColunaDisponibilidadeTurno, reqEficienciaProducaoTurnoDia } from "../requisicoes";

export function useColunaDisponibilidade() {

    const { mutate: mutateColunaDisponibilidadeTurno, data: dataColunaDisponibilidadeTurno } = useMutation({
        mutationKey: ['mutationDisponibilidadeTurno'],
        mutationFn: reqColunaDisponibilidadeTurno,
    })

    function validacaoColunaDisponibilidadeTurno(unidade, linhaProducao, periodo) {
        mutateColunaDisponibilidadeTurno({ unidade, linhaProducao, periodo })
    }

    return {
        mutationColunaDisponibilidadeTurno: validacaoColunaDisponibilidadeTurno,
    }
}

export function useEficienciaProducaoTurnoDia() {

    const { mutate: mutateEficienciaProducaoTurnoDia, data: dataEficienciaProducaoTurnoDia } = useMutation({
        mutationKey: ['mutationEficienciaProducaoTurnoDia'],
        mutationFn: reqEficienciaProducaoTurnoDia,
    })

    function validacaoEficienciaProducaoTurnoDia(linhaProducao) {
        mutateEficienciaProducaoTurnoDia({ linhaProducao })
    }

    return {
        mutationEficienciaProducaoTurnoDia: validacaoEficienciaProducaoTurnoDia,
    }
}