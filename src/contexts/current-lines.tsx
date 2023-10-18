import * as React from 'react'
import { useFilterContext } from './filter'

type InitialCurrentLines = {
  lineProduction: {
    label: string
    value: number
  }
  lineChoice: {
    label: string
    value: number
  }
}

const NO_LINE_PRODUCTION = {
  label: 'Nenhuma linha de produção',
  value: 0
}

const NO_LINE_CHOICE = {
  label: 'Nenhuma linha de escolha',
  value: 0
}

const INITIAL_CURRENT_LINES = {
  lineProduction: NO_LINE_PRODUCTION,
  lineChoice: NO_LINE_CHOICE
} as InitialCurrentLines

type Context = {
  lines: InitialCurrentLines,
  handleLines: {
    next: () => void
    prev: () => void
  }
}

const CurrentLinesContext = React.createContext({ lines: INITIAL_CURRENT_LINES } as Context)

export function CurrentLinesProvider({
  children
}: {
  children: React.ReactNode
}) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { filter } = useFilterContext()
  const [currentLines, setCurrentLines] = React.useState<InitialCurrentLines>(INITIAL_CURRENT_LINES)

  React.useEffect(() => {
    const haveLines = !!filter.linesChoice[0]?.value
      && !!filter.linesProduction[0]?.value

    if (haveLines) {
      setCurrentLines({
        lineChoice: filter.linesChoice[0],
        lineProduction: filter.linesProduction[0]
      })
    }
  }, [filter])


  function handleNextLines() {
    let newIndex = currentIndex;
    let biggestList = filter.linesChoice.length;

    if (biggestList < filter.linesProduction.length) {
      biggestList = filter.linesProduction.length
    }

    if (currentIndex + 1 > biggestList - 1) {
      newIndex = 0
    } else {
      newIndex = currentIndex + 1
    }


    setCurrentLines((prev) => {
      if (filter.linesChoice[newIndex]?.value) {
        prev.lineChoice = filter.linesChoice[newIndex]
      } else {
        prev.lineChoice = NO_LINE_CHOICE
      }

      if (filter.linesProduction[newIndex]?.value) {
        prev.lineProduction = filter.linesProduction[newIndex]
      } else {
        prev.lineProduction = NO_LINE_PRODUCTION
      }

      return prev
    })

    setCurrentIndex(newIndex)
  }

  function handlePrevLines() {
    let newIndex = currentIndex;
    let biggestList = filter.linesChoice.length;

    if (biggestList < filter.linesProduction.length) {
      biggestList = filter.linesProduction.length
    }

    if (currentIndex - 1 < 0) {
      newIndex = biggestList - 1
    } else {
      newIndex = currentIndex - 1
    }


    setCurrentLines((prev) => {
      if (filter.linesChoice[newIndex]?.value) {
        prev.lineChoice = filter.linesChoice[newIndex]
      } else {
        prev.lineChoice = NO_LINE_CHOICE
      }

      if (filter.linesProduction[newIndex]?.value) {
        prev.lineProduction = filter.linesProduction[newIndex]
      } else {
        prev.lineProduction = NO_LINE_PRODUCTION
      }

      return prev
    })
    setCurrentIndex(newIndex)
  }

  const valueProvider = {
    lines: currentLines,
    handleLines: {
      next: handleNextLines,
      prev: handlePrevLines
    }
  } as Context

  return (
    <CurrentLinesContext.Provider value={valueProvider}>
      {children}
    </CurrentLinesContext.Provider>
  )
}

export const useCurrentLinesContext = () => React.useContext(CurrentLinesContext);
