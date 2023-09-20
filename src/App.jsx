import React, { useEffect, useState } from 'react';
import { reqLinhaEscolha, reqLinhaProducao, reqUnidade } from './util/requisicoes';
import { useQuery, useMutation } from 'react-query';
import { Header } from './componentes/header';
import { Filtro } from './componentes/filtro';
import Menu from './componentes/menu';

export default function App() {




  return (
    <>
      <Menu />
      {/* <Filtro
        unidade={dataUnidade}
        linhaProducao={dataLinhaProducao}
        linhaEscolha={dataLinhaEscolha}
        recebeDados={recebeDados}
      /> */}
      {/* <Header date={date} /> */}
    </>
  );
}
