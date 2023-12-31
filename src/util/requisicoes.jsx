import { Api } from "./api";

export async function reqUnidade() {
    const res = await Api.get(`v1/public/unidade`);
    // console.log(res.data)
    return res.data;
}

export async function reqLinhaProducao(idUnidade) { //producao filtro
    // console.log(idUnidade)
    const res = await Api.get(`/v1/web/consulta/tv/linhas/pcp/${idUnidade}/0`);
    return res.data;
}

export async function reqLinhaEscolha(idUnidade) { //escolha
    const res = await Api.get(`/v1/linha/${idUnidade}`);
    return res.data;
}

export async function reqColunaDisponibilidadeTurno(value) {
    const res = await Api.get(`/v1/web/consulta/gerencial/disponibilidade/turno/dia/${value.unidade}/${value.linhaProducao}/0/${value.periodo}`);
    console.log(res.data)
    return res.data;
}

export async function reqEficienciaProducaoTurnoDia(value) {
    const res = await Api.get(`/v1/web/producao/turno/${value.linhaProducao}/0/3`);
    console.log(res.data)
    return res.data;
}