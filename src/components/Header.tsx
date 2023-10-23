import logoDexco from '../images/dexco-logo.png'

import { useFilterContext } from '../contexts/filter';
import { useCurrentLinesContext } from '../contexts/current-lines';

import { useFormatPeriod } from "../hooks";

import * as S from './Header.style'

export function Header() {
  const { filter, reset } = useFilterContext()
  const { lines } = useCurrentLinesContext()
  const currentPeriod = useFormatPeriod(filter)

  return (
    <>
      <S.LogoLine>
        <span> Linha de Produção - {lines.lineProduction.label} </span>
        <S.Image onClick={reset} src={logoDexco} />
      </S.LogoLine>

      <S.Wrapper>
        <S.BoxSubtitle>
          <span> Indicadores de produção - {currentPeriod} </span>
          <span> {filter.unit.label} </span>
        </S.BoxSubtitle>
      </S.Wrapper>
    </>
  )
}

