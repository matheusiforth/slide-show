import { useState } from 'react';

import logoDexco from './imagens/dexco-logo.png'
import logoIforth from './imagens/logo-iforth.png'

import { FilterPage } from './Filter';

import { Header } from './componentes/header';
import { ConditionalRendering } from './utils';

import { useCurrentLinesContext } from './contexts/current-lines';
import { useFilterContext } from './contexts/filter';

import * as S from './style'
import { Tables } from './pages/graphics';

const { Switch, Case, Default } = ConditionalRendering

export default function App() {
  const { haveFilter } = useFilterContext()
  const { Buttons, currentValueIndex } = useNextPrevButtons(Object.values(Tables).length)

  return (
    <S.Pai>
      <Header />

      <Buttons />

      <Switch>

        <Case condition={haveFilter && currentValueIndex[0]}>
          <Tables.Producao />
        </Case>

        <Case condition={haveFilter && currentValueIndex[1]}>
          <Tables.Qualidade />
        </Case>

        <Case condition={haveFilter && currentValueIndex[2]}>
          <Tables.Descarte />
        </Case>

        <Case condition={haveFilter && currentValueIndex[3]}>
          <Tables.Disponibilidade />
        </Case>

        <Default>
          <S.Principal>
            <S.Img src={logoDexco} />
            <FilterPage />
          </S.Principal>
        </Default>

      </Switch>


      <S.Footer>
        <span style={{ color: 'white', width: 'fit-content' }}>logo grupo dexco</span>
        <S.ImgFooter src={logoIforth} />
      </S.Footer>
    </S.Pai>
  )
}

function useNextPrevButtons(lengthList: number) {
  const { handleLines } = useCurrentLinesContext()

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentValueIndex, setCurrentValueIndex] = useState(
    Array.from({ length: lengthList }, (_, index) => index === currentIndex)
  );

  if (lengthList === 1) {
    return {
      Buttons: () => <></>,
      currentValueIndex
    }
  }

  function goToFirst() {
    setCurrentIndex(0);
    setCurrentValueIndex(Array.from({ length: lengthList }, (_, index) => index === 0))
  }

  function goToPrev() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setCurrentValueIndex(Array.from({ length: lengthList }, (_, index) => index === currentIndex - 1))
    }
  }

  function goToNext() {
    if (currentIndex < lengthList - 1) {
      setCurrentIndex(currentIndex + 1);
      setCurrentValueIndex(Array.from({ length: lengthList }, (_, index) => index === currentIndex + 1))
    }
  }

  function goToLast() {
    setCurrentIndex(lengthList - 1);
    setCurrentValueIndex(Array.from({ length: lengthList }, (_, index) => index === lengthList - 1))
  }

  const isFirstElement = currentIndex === 0
  const isLastElement = currentIndex === lengthList - 1

  const Buttons = () => (
    <>
      {isFirstElement && (
        <button type="button" onClick={() => { goToLast(); handleLines.prev() }}>
          Linha Anterior
        </button>
      )}

      {!isFirstElement && (
        <button type="button" onClick={goToPrev}>
          Anterior
        </button>
      )}

      {!isLastElement && (
        <button type="button" onClick={goToNext}>
          Próximo
        </button>
      )}

      {isLastElement && (
        <button type="button" onClick={() => { goToFirst(); handleLines.next() }}>
          Próxima Linha
        </button>
      )}
    </>
  );

  return {
    Buttons,
    currentValueIndex
  }
}


// {/* <DadosFlutuantes /> */}

// {/*
// {/* <div>
//           <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
//             {indiceComponente > 0 && <button onClick={componenteAnterior} style={{ background: 'black', border: 'solid 1px white', textTransform: 'uppercase', color: 'white', borderRadius: '4px', width: '120px', height: '40px', cursor: 'pointer' }}>Anterior</button>}
//             <button onClick={proximoComponente} style={{ background: 'black', border: 'solid 1px white', textTransform: 'uppercase', color: 'white', borderRadius: '4px', width: '120px', height: '40px', cursor: 'pointer' }}>Próximo</button>
//           </div>
//           {/* <ComponenteAtual /> */}
//         </div> */}
// */}

// {/* {indiceComponente >= 0 ? <Header atualizaEstadoComponente={atualizaEstadoComponente} /> : <div></div>} */}
// {/* {indiceComponente < 0 && <S.Img src={logoDexco} />} */}
// {/* {mostraComponente && <Filtro atualizaEstadoComponente={atualizaEstadoComponente} teste={teste} />} */}
// {/* {haveFilter && <div> Voltar ao filtro </div>} */}
