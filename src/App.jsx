import React, { useState } from 'react'
import * as S from './style'
import logoDexco from './imagens/dexco-logo.png'
import logoIforth from './imagens/logo-iforth.png'
import { Filtro } from './componentes/filtro';
import Teste2 from './pages/teste2';
import Teste3 from './pages/teste3';
import Teste4 from './pages/teste4';

export default function App() {

    const componentes = [Teste2, Teste3, Teste4]
    const [indiceComponente, setIndiceComponente] = useState(-1);
    const [mostraComponente, setMostraComponente] = useState(true)

    const atualizaEstadoComponente = (novoEstado) => {
        setMostraComponente(novoEstado)
    }

    const proximoComponente = () => {
        if (indiceComponente < componentes.length - 1) {
            setIndiceComponente(indiceComponente + 1);
        }
    };

    const componenteAnterior = () => {
        if (indiceComponente > 0) {
            setIndiceComponente(indiceComponente - 1);
        }
    };

    const ComponenteAtual = componentes[indiceComponente];

    return (
        <>
            {/* <Teste /> */}
            <S.Pai>
                <div></div>
                {!mostraComponente && <div>
                    <button onClick={componenteAnterior}>Anterior</button>
                    <button onClick={proximoComponente}>Próximo</button>
                    <ComponenteAtual />
                </div>}

                <S.Principal>
                    <S.Img src={logoDexco} />
                    {mostraComponente && <Filtro atualizaEstadoComponente={atualizaEstadoComponente} proximoComponente={proximoComponente} />}
                </S.Principal>

                <S.Footer>
                    <span style={{ color: 'white', width: 'fit-content' }}>logo grupo dexco</span>
                    <S.ImgFooter src={logoIforth} />
                </S.Footer>
            </S.Pai>
        </>
    )
}