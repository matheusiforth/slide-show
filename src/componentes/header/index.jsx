import * as S from './style'
import logoDexco from '../../imagens/dexco-logo.png'
import { date } from '../filtro'
import { useContext } from 'react';
import MeuContexto from '../../util/context';

export function Header(props) {

    console.log(date)

    const { atualizarContador } = useContext(MeuContexto);

    return (
        <>
            <S.LogoLinha>
                <span style={{ color: 'white' }}>{localStorage.getItem('linhaProducao')}</span>
                <S.Img src={logoDexco} onClick={() => {
                    props.atualizaEstadoComponente(true)
                    atualizarContador({ zeraDados: true })
                }
                } style={{ cursor: 'pointer' }} />
            </S.LogoLinha>
            <S.Pai>
                <S.EnglobaSubtitulo>
                    <span>Indicadores de produção - <span>{date}</span></span>
                    <span>Unidade {localStorage.getItem('unidade')}</span>
                </S.EnglobaSubtitulo>
            </S.Pai>
        </>
    )
}