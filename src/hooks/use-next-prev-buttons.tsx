import { useState } from "react";
import { useCurrentLinesContext } from "../contexts/current-lines";
import { ButtonNavigation, ButtonBox } from "../style";
import { useFilterContext } from "../contexts/filter";

export function useNextPrevButtons(lengthList: number) {
  const { filter } = useFilterContext()
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
  const haveJustOneLine = filter.linesProduction.length === 1

  const Buttons = () => (
    <ButtonBox>
      {isFirstElement && (
        <ButtonNavigation type="button" onClick={() => { goToLast(); handleLines.prev() }}>
          {!haveJustOneLine ? 'Linha Anterior' : 'Anterior'}
        </ButtonNavigation>
      )}

      {!isFirstElement && (
        <ButtonNavigation type="button" onClick={goToPrev}>
          Anterior
        </ButtonNavigation>
      )}

      {!isLastElement && (
        <ButtonNavigation type="button" onClick={goToNext}>
          Próximo
        </ButtonNavigation>
      )}

      {isLastElement && (
        <ButtonNavigation type="button" onClick={() => { goToFirst(); handleLines.next() }}>
          {!haveJustOneLine ? 'Próxima Linha' : 'Próximo'}
        </ButtonNavigation>
      )}
    </ButtonBox>
  );

  return {
    Buttons,
    currentValueIndex
  }
}
