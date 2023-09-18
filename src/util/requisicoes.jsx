import { idText } from "typescript";
import { Api } from "./api";

export async function reqUnidade() {
    const res = await Api.get(`v1/public/unidade`);
    return res.data;
}

export async function reqLinhaProducao(idUnidade) { //producao filtro
    const res = await Api.get(`/v1/web/consulta/tv/linhas/pcp/${idUnidade}/0`);
    return res.data;
}