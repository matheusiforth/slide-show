import React, { useState, useEffect, useContext } from 'react'
import { useMutation, useQuery } from "react-query"
import { reqLinhaEscolha, reqLinhaProducao, reqUnidade } from "../requisicoes"
import { useTratativas } from "./useTratativas"

export function useRequeIni() {

    const {
        handleExecutaRequestions,
        functions: {
            mutationColunaDisponibilidadeTurno,
        }
    } = useTratativas()

    const [unidade, setUnidade] = useState(0)
    const [linhaProducao, setLinhaProducao] = useState([])
    const [linhaEscolha, setLinhaEscolha] = useState([])
    const [periodo, setPeriodo] = useState(null)
    const [date, setDate] = useState(null)

    const { error: erroUnidade, data: dataUnidade } = useQuery('unidade', async () => reqUnidade(), {
        refetchOnWindowFocus: false
    })

    const { mutate: mutateLinhaProducao, data: dataLinhaProducao } = useMutation({ //linha producao 
        mutationKey: ['mutationLinhaProducao'],
        mutationFn: reqLinhaProducao,
    })

    const { mutate: mutateLinhaEscolha, data: dataLinhaEscolha } = useMutation({
        mutationKey: ['mutationLinhaEscolha'],
        mutationFn: reqLinhaEscolha,
    })

    function recebeDados(value) {
        if (value?.idUnidade) {
            setUnidade(value?.idUnidade)
            mutateLinhaProducao(value?.idUnidade)
            mutateLinhaEscolha(value?.idUnidade)
        }
        if (value?.idLinhaProducao) {
            setLinhaProducao(value?.idLinhaProducao)
        }
        if (value?.idLinhaEscolha) {
            setLinhaEscolha(value?.idLinhaEscolha)
        }
        if (value?.periodo) {
            setPeriodo(value?.periodo)
        }
        if (value?.date) {
            setDate(value?.date)
        }

        insereDados()
    }

    function insereDados() {
        if (linhaProducao > 0 && periodo) {
            mutationColunaDisponibilidadeTurno(unidade, linhaProducao, periodo)
            handleExecutaRequestions(unidade, linhaProducao, periodo)
        }
    }

    useEffect(() => {
        insereDados()
    }, [unidade, linhaProducao, linhaProducao, linhaEscolha, periodo]);

    return {
        dadosIniciais: {
            dataUnidade,
            dataLinhaProducao,
            dataLinhaEscolha,
            unidade,
            linhaProducao,
            linhaEscolha,
            periodo
        },
        functions: {
            recebeDados,
        }
    }

}