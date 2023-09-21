import { useMutation } from "react-query";
import { reqColunaDisponibilidadeTurno } from "../requisicoes";

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