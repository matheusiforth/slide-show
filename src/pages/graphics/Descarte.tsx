import { useCurrentLinesContext } from "../../contexts/current-lines"

export function TabelaDescarte() {
  const { lines } = useCurrentLinesContext()
  console.log({ lines })

  return (
    <>
      Tabela Descarte
    </>
  )
}
