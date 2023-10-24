import { useQuery } from "react-query"
import { useCurrentLinesContext } from "../contexts/current-lines"
import { useFilterContext } from "../contexts/filter"
import { Api } from "../utils/api"

import { ComposedChart, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer  } from 'recharts';

import * as S from "./styles";
import { useVerifyRangePeriod } from "../hooks";


type ProductionDataRequest = {
  DIA: {
    DATA: string
    PRODUCAO: number
    ADERENCIA: number
    ADERENCIAPROJETADA: number
  }[]
  MEDIA: {
    PRODUCAO: number
    ADERENCIA: number
  }
}

export function TabelaProducao() {
  const { outRange } = useVerifyRangePeriod()
  const query = useProductionRequest()


  if (!query.data?.DIA.length) {
    return <S.TitleGraph> Produção Diária: Sem Dados </S.TitleGraph>
  }

  return (
    <S.WrapperPage>
      <S.TitleGraph> Produção Diária (m²) </S.TitleGraph>

      <S.WrapperGraph>
        <ResponsiveContainer>
          <ComposedChart data={query.data.DIA}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="DATA" />
            <Tooltip wrapperStyle={{backgroundColor: 'black', color: 'black' }}  />
            <Bar name="Produção" type="monotone" dataKey="PRODUCAO" label={!outRange && { fill: '#E1E1DD', angle: -90 }} activeBar={{ stroke: 'white', strokeWidth: 2 }} fill='#002163' />
          </ComposedChart>
        </ResponsiveContainer>
      </S.WrapperGraph>

      <S.Legend.Root>
        <S.Legend.Box>
          <S.Legend.Color color="#002163" />
          <S.Legend.Label> Produção </S.Legend.Label>
        </S.Legend.Box>
      </S.Legend.Root>

      <S.TitleGraph> Aderência Diária (%) </S.TitleGraph>

      <S.WrapperGraph>
        <ResponsiveContainer>
          <ComposedChart data={query.data.DIA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="DATA" />
            <Tooltip wrapperStyle={{color: 'black'}} />
            <Bar
              name="Aderência"
              type="monotone"
              dataKey="ADERENCIA"
              label={!outRange && { fill: '#E1E1DD', angle: -90 }}
              activeBar={{ stroke: 'white', strokeWidth: 2 }}
              fill="#002163"
            >
              {query.data?.DIA.map((entry) => (
                  <Cell fill={entry.ADERENCIA > entry.ADERENCIAPROJETADA ? '#002163' : '#ff5252' } />
              ))}
            </Bar>

            <Line name="Aderência Projetada" type="monotone" dataKey='ADERENCIAPROJETADA' stroke="#fff" />
          </ComposedChart>
        </ResponsiveContainer>
      </S.WrapperGraph>
      <S.Legend.Root>
        <S.Legend.Box>
          <S.Legend.Color color="#002163" />
          <S.Legend.Label> Acima do projetado </S.Legend.Label>
        </S.Legend.Box>
        <S.Legend.Box>
          <S.Legend.Color color="#ff5252" />
          <S.Legend.Label> Abaixo do projetado </S.Legend.Label>
        </S.Legend.Box>
        <S.Legend.Box>
          <S.Legend.Color color="#fff" />
          <S.Legend.Label> Aderência Projetada </S.Legend.Label>
        </S.Legend.Box>
      </S.Legend.Root>
    </S.WrapperPage>
  )
}

/**
 * useProductionRequest - Custom React hook for making production data requests.
 *
 * This hook fetches production data from a specific API endpoint using query parameters.
 *
 * @example
 * const { data, error, isLoading, ... } = useProductionRequest()
 *
 * @returns {UseQueryResult<ProductionDataRequest, unknown>} The query result containing production data.
 */
function useProductionRequest() {
  const { lines } = useCurrentLinesContext()
  const { filter } = useFilterContext()

  const url = `v3/web/maine/producao/${filter.unit.value}/${lines.lineProduction.value}?dtIni=${filter.period.start.toString()}&dtFim=${filter.period.end.toString()}`

  return useQuery({
    queryKey: ['query-production-request', lines],
    queryFn: async () => {
      const response = await Api.get<ProductionDataRequest>(url);

      const data = response.data.DIA.map((production) => {
        return {
          ...production,
          ADERENCIAPROJETADA: 95
        }
      })

      data.push({
        ADERENCIA: response.data.MEDIA.ADERENCIA,
        PRODUCAO: response.data.MEDIA.PRODUCAO,
        ADERENCIAPROJETADA: 95,
        DATA: 'Média'
      })

      return {
        ...response.data,
        DIA: data
      }
    }
  })
}

