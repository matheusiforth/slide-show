import * as S from './style'
import logoDexco from '../../imagens/dexco-logo.png'
import { date } from '../filtro'

export function Header() {

    return (
        <>
            <S.LogoLinha>
                <span style={{ color: 'white' }}>Ex Forno 1</span>
                <S.Img src={logoDexco} onClick={() => ''} />
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