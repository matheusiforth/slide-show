import * as React from 'react'

import { SchemaFilter } from '../Filter'
import { INITIAL_PERIOD } from '../constants';

const INITIAL_FILTER = {
  linesChoice: [{}],
  linesProduction: [{}],
  period: INITIAL_PERIOD,
  unit: {}
} as SchemaFilter

type Context = {
  filter: SchemaFilter,
  onChangeFilter: (filter: SchemaFilter) => void
  reset: () => void
  haveFilter: boolean
}

const FilterContext = React.createContext({ filter: INITIAL_FILTER } as Context)

export function FilterContextProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [filter, setFilter] = React.useState<SchemaFilter>(INITIAL_FILTER)

  function handleChangeFilter(data: SchemaFilter) {
    setFilter(data)
  }

  function reset() {
    setFilter(INITIAL_FILTER)
  }

  const haveFilter = !!filter.unit?.value && !!filter.linesChoice[0]?.value && !!filter.linesChoice[0]?.value && !!filter.period

  const valueProvider = {
    filter,
    onChangeFilter: handleChangeFilter,
    reset,
    haveFilter
  } as Context

  return (
    <FilterContext.Provider value={valueProvider}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => React.useContext(FilterContext);
