import logoDexco from '../../imagens/dexco-logo.png'

import { useFilterContext } from '../../contexts/filter';
import { useCurrentLinesContext } from '../../contexts/current-lines';

import { useFormatPeriod } from '../../hooks';


import * as S from './style'

export function Header() {
  const { filter, reset } = useFilterContext()
  const { lines } = useCurrentLinesContext()
  const currentPeriod = useFormatPeriod(filter)

  return (
    <>
      <S.LogoLinha>
        <span> Linha de Produção - {lines.lineProduction.label} </span>
        <S.Img src={logoDexco} onClick={reset} />
      </S.LogoLinha>

      <S.Pai>
        <S.EnglobaSubtitulo>
          <span> Indicadores de produção - {currentPeriod} </span>
          <span>{filter.unit.label}</span>
        </S.EnglobaSubtitulo>
      </S.Pai>
    </>
  )
}

