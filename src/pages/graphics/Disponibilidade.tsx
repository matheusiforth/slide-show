import { useCurrentLinesContext } from "../../contexts/current-lines"

export function TabelaDisponibilidade() {
  const { lines } = useCurrentLinesContext() // acessando as linhas atuais

  // lógicas da tabela

  return (
    <>
      Tabela Disponibilidade
    </>
  )
}
