import { useMutation, useQuery } from "react-query";
import { Api } from "../utils/api";

type UnitRequest = {
  CONSIDERARQUEBRAUNIDADE: number
  DESCUNIDADE: string
  FLAGDESCUNIDADE: string
  FLAGUNIDADE: number
  IDUNIDADE: number
  SINCUNIDADE: number
  SOLICAPROREPROMEM: number
}

type LineProductionRequest = {
  DESCPCP: string
  IDLINHA: number
  DESCLINHA: string
  METRAPROGRAPCPITEM: number
  PRODUZIDOPCPITEM: number
  DIFERENCA: number
  REFFICHAPROD: number
  DESCFICHAPROD: string
  STATUS: string
}

function formatDataForSelectOptions<T, K extends keyof T>(
  data: T[],
  label: K,
  value: K
) {
  return data.map((itemData: T) => ({
    label: itemData[label],
    value: itemData[value],
    ...itemData
  }))
}

export const useQueryUnit = () => useQuery({
  queryKey: ['query-unit'],
  queryFn: async () => {
    const url = 'v1/public/unidade'
    const response = await Api.get<UnitRequest[]>(url);
    return formatDataForSelectOptions(response.data, 'DESCUNIDADE', 'IDUNIDADE')
  },
  refetchOnWindowFocus: false
})

export const useMutationLineProduction = (resetField: () => void | undefined) => useMutation({
  mutationKey: ['mutation-line-production'],
  mutationFn: async (unitId: string | undefined) => {
    if (resetField) resetField()

    if (!unitId) return []
    const url = `/v1/web/consulta/tv/linhas/pcp/${unitId}/0`
    const response = await Api.get<LineProductionRequest[]>(url)
    return formatDataForSelectOptions(response.data, 'DESCLINHA', 'IDLINHA')
  }
})

export const useMutationLineChoice = (resetField: () => void | undefined) => useMutation({
  mutationKey: ['mutation-line-choice'],
  mutationFn: async (unitId: string | undefined) => {
    if (resetField) resetField()

    if (!unitId) return []
    const url = `/v1/linha/${unitId}`
    const response = await Api.get<LineProductionRequest[]>(url)
    return formatDataForSelectOptions(response.data, 'DESCLINHA', 'IDLINHA')
  }
})
