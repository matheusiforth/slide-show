import React, { useState, useEffect, useContext } from 'react'
import * as S from './style'
import logoDexco from './imagens/dexco-logo.png'
import logoIforth from './imagens/logo-iforth.png'
import { Filtro } from './componentes/filtro';
import { useChamaComponente, useTratativas } from './util/hooks';
import { reqLinhaEscolha, reqLinhaProducao, reqUnidade } from './util/requisicoes';
import { useMutation, useQuery } from 'react-query';
import { MeuContexto } from './util/context';

export default function App() {

    const { estado, minhaFuncao } = useContext(MeuContexto)
    const {
        handleExecutaRequestions,
        dados: {
            dadosColunaDisponibilidade,
        },
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
        // Limpar o localStorage quando o componente é montado
        localStorage.clear();
    }, []);

    useEffect(() => {
        insereDados()
    }, [unidade, linhaProducao, linhaProducao, linhaEscolha, periodo]);



    return (
        <>
            <S.Pai>
                <div></div>
                <S.Principal>
                    <S.Img src={logoDexco} />
                    <Filtro
                        recebeDados={recebeDados}

                        unidade={dataUnidade}
                        linhaProducao={dataLinhaProducao}
                        linhaEscolha={dataLinhaEscolha}
                    />
                </S.Principal>
                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <span style={{ background: 'red', width: 'fit-content', height: '50px', color: 'white', fontSize: '2rem' }}>{dadosColunaDisponibilidade.valorTempoParado}</span>
                    <span style={{ background: 'blue', width: 'fit-content', height: '50px', color: 'white', fontSize: '2rem' }}>{dadosColunaDisponibilidade.valorDisponibilidade}</span>
                </div>

                <S.Footer>
                    <span style={{ color: 'white', width: 'fit-content' }}>logo grupo dexco</span>
                    <S.ImgFooter src={logoIforth} />
                </S.Footer>
            </S.Pai>
        </>
    )
}