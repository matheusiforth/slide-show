import React, { useEffect, useState } from 'react';
import { reqLinhaProducao, reqUnidade } from './util/requisicoes';
import { useQuery, useMutation } from 'react-query';
import { Header } from './componentes/header';
import { Filtro } from './componentes/filtro';

export default function App() {

  const [periodo, setPeriodo] = useState(null)
  const [unidade, setUnidade] = useState(0)
  const [date, setDate] = useState(null)

  const { error: erroUnidade, data: dataUnidade } = useQuery('unidade', async () => reqUnidade(), {
    refetchOnWindowFocus: false
  })

  const { mutate: mutateLinhaProducao, data: dataLinhaProducao } = useMutation({ //linha producao 
    mutationKey: ['mutationLinhaProducao'],
    mutationFn: reqLinhaProducao,
  })

  function recebeDados(value) {
    if (value?.idUnidade) {
      setUnidade(value?.idUnidade)
      mutateLinhaProducao(value?.idUnidade)
    }
    if (value?.periodo) {
      setPeriodo(value?.periodo)
      console.log(value?.periodo)
    }
    if (value?.date) {
      console.log(value?.date)
      setDate(value?.date)
    }
  }

  useEffect(() => {
    // Limpar o localStorage quando o componente é montado
    localStorage.clear();
  }, []);

  return (
    <>
      <Filtro
        unidade={dataUnidade}
        linhaProducao={dataLinhaProducao}
        recebeDados={recebeDados}
      />
      <Header date={date} />
    </>
  );
}
