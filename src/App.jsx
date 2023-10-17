import React, { useState, useContext } from 'react'
import * as S from './style'
import logoDexco from './imagens/dexco-logo.png'
import logoIforth from './imagens/logo-iforth.png'
import { Filtro, testeFiltro } from './componentes/filtro';
import Teste1 from './pages/teste1';
import Teste2 from './pages/teste2';
import Teste3 from './pages/teste3';
import { useChamaComponente } from './util/hooks';
// import { testeGrafico } from './componentes/graficoVertical';
import { Header } from './componentes/header';
import DadosFlutuantes from './pages/dadosFlutuantes';
import MeuContexto from './util/context';

export default function App() {

    const { componente } = useChamaComponente()
    // const { unidade, } = useContext(MeuContexto)

    const componentes = [Teste1, Teste2, Teste3]
    const [indiceComponente, setIndiceComponente] = useState(-1);
    const [mostraComponente, setMostraComponente] = useState(true)

    const atualizaEstadoComponente = (novoEstado) => {
        setMostraComponente(novoEstado)
        setIndiceComponente(-1)
    }

    const proximoComponente = () => {
        if (indiceComponente < componentes.length - 1) {
            setIndiceComponente(indiceComponente + 1);
        }
    };

    const componenteAnterior = (value) => {
        setIndiceComponente(indiceComponente - 1);

        if (indiceComponente > 0) {
            setIndiceComponente(indiceComponente - 1);
        }
    };

    const ComponenteAtual = componentes[indiceComponente];

    function teste() {
        setIndiceComponente(indiceComponente - indiceComponente)
    }

    return (
        <>
            {/* <DadosFlutuantes /> */}
            <S.Pai>
                {indiceComponente >= 0 ? <Header atualizaEstadoComponente={atualizaEstadoComponente} /> : <div></div>}
                {!mostraComponente && <div>
                    <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        {indiceComponente > 0 && <button onClick={componenteAnterior} style={{ background: 'black', border: 'solid 1px white', textTransform: 'uppercase', color: 'white', borderRadius: '4px', width: '120px', height: '40px', cursor: 'pointer' }}>Anterior</button>}
                        <button onClick={proximoComponente} style={{ background: 'black', border: 'solid 1px white', textTransform: 'uppercase', color: 'white', borderRadius: '4px', width: '120px', height: '40px', cursor: 'pointer' }}>Próximo</button>
                    </div>
                    <ComponenteAtual />
                </div>}

                <S.Principal>
                    {indiceComponente < 0 && <S.Img src={logoDexco} />}
                    {mostraComponente && <Filtro atualizaEstadoComponente={atualizaEstadoComponente} teste={teste} />}
                </S.Principal>

                <div></div>
                <S.Footer>
                    <span style={{ color: 'white', width: 'fit-content' }}>logo grupo dexco</span>
                    <S.ImgFooter src={logoIforth} />
                </S.Footer>
            </S.Pai >
        </>
    )
}