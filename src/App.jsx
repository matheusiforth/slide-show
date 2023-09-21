import React, { useEffect, useContext } from 'react'
import * as S from './style'
import logoDexco from './imagens/dexco-logo.png'
import logoIforth from './imagens/logo-iforth.png'
import { Filtro } from './componentes/filtro';
import { MeuContexto, useMeuContexto } from './util/context';
import { useTratativas } from './util/hooks';

export default function App() {

    const { estado, atualizaDados } = useMeuContexto()

    return (
        <>
            <S.Pai>
                <div></div>
                <S.Principal>
                    <S.Img src={logoDexco} />
                    <Filtro />
                </S.Principal>
                <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                    <span style={{ background: 'red', width: 'fit-content', height: '50px', color: 'white', fontSize: '2rem' }}>{estado?.valorTempoParado}</span>
                    <span style={{ background: 'blue', width: 'fit-content', height: '50px', color: 'white', fontSize: '2rem' }}>{estado?.valorDisponibilidade}</span>
                </div>

                <S.Footer>
                    <span style={{ color: 'white', width: 'fit-content' }}>logo grupo dexco</span>
                    <S.ImgFooter src={logoIforth} />
                </S.Footer>
            </S.Pai>
        </>
    )
}