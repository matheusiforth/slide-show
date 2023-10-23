
import { Tables } from './pages';
import { FilterPage, Footer, Header } from './components';
import { useNextPrevButtons } from './hooks';

import { useFilterContext } from './contexts/filter';
import { ConditionalRendering } from './utils';

import * as S from './style'

const { Switch, Case, Default } = ConditionalRendering

export default function App() {
  const { haveFilter } = useFilterContext()
  const { Buttons, currentValueIndex } = useNextPrevButtons(Object.values(Tables).length)

  return (
    <S.Wrapper>
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
          <FilterPage />
        </Default>
      </Switch>


      <Footer />
    </S.Wrapper>
  )
}

