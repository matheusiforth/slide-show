import * as S from './style'
import logo from '../../util/dexco-logo.png'

export function Header(props) {

    return (
        <>
            <S.LogoLinha>
                <span style={{ color: 'white' }}>Ex Forno 1</span>
                <S.Img src={logo} />
            </S.LogoLinha>
            <S.Pai>
                <S.EnglobaSubtitulo>
                    <span>Indicadores de produção - <span>{props?.date}</span></span>
                    <span>Unidade {localStorage.getItem('unidade')}</span>
                </S.EnglobaSubtitulo>
            </S.Pai>
        </>
    )
}