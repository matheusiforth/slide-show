import { useCurrentLinesContext } from "../../contexts/current-lines"

export function TabelaQualidade() {
  const { lines } = useCurrentLinesContext()
  console.log({ lines })

  return (
    <>
      Tabela Qualidade
    </>
  )
}
