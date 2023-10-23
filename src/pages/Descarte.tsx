import { useQuery } from "react-query"
import { useCurrentLinesContext } from "../contexts/current-lines"
import { useFilterContext } from "../contexts/filter"
import { Api } from "../util/api"

import { ComposedChart, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer  } from 'recharts';
import * as S from "./styles";


type DisposalDataRequest = {
  DIA: {
    DATA: string
    DESCARTE: number
    DESCARTEPROJETADO: number
  }[]
  MEDIA: {
    DESCARTE: number
  }
}

export function TabelaDescarte() {
  const query = useDisposalRequest()


  return (
    <S.WrapperPage>
      {query?.data?.DIA.length ? (
        <>
          <S.TitleGraph> Descarte Diário (%) </S.TitleGraph>

          <S.WrapperGraph>
            <ResponsiveContainer>
              <ComposedChart data={query.data?.DIA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="DATA" />
                <YAxis />
                <Tooltip wrapperStyle={{ color: 'black' }} />
                <Bar
                  name="Descarte"
                  type="monotone"
                  dataKey="DESCARTE"
                  label={{ fill: '#E1E1DD', angle: -90 }}
                  activeBar={{ stroke: 'white', strokeWidth: 2 }}
                  fill="#000024"
                >
                  {query.data?.DIA.map((entry) => (
                    <Cell fill={entry.DESCARTE < entry.DESCARTEPROJETADO ? '#000024' : '#f13f09'} />
                  ))}
                </Bar>

                <Line name="Descarte Projetado" type="monotone" dataKey='DESCARTEPROJETADO' stroke="#FF8600" />
              </ComposedChart>
            </ResponsiveContainer>
          </S.WrapperGraph>

          <S.Legend.Root>
            <S.Legend.Box>
              <S.Legend.Color color="#000024" />
              <S.Legend.Label> Dentro do projetado </S.Legend.Label>
            </S.Legend.Box>
            <S.Legend.Box>
              <S.Legend.Color color="#f13f09" />
              <S.Legend.Label> Acima do projetado </S.Legend.Label>
            </S.Legend.Box>
            <S.Legend.Box>
              <S.Legend.Color color="#FF8600" />
              <S.Legend.Label> Qualidade Projetada </S.Legend.Label>
            </S.Legend.Box>
          </S.Legend.Root>
        </>
      ) : (
        <S.TitleGraph> Descarte Diário: Sem Dados </S.TitleGraph>
      )}
    </S.WrapperPage>
  )
}

/**
 * useDisposalRequest - Custom React hook for making disposal data requests.
 *
 * This hook fetches disposal data from a specific API endpoint using query parameters.
 *
 * @example
 * const { data, error, isLoading, ... } = useDisposalRequest()
 *
 * @returns {UseQueryResult<DisposalDataRequest, unknown>} The query result containing disposal data.
 */
function useDisposalRequest() {
  const { lines } = useCurrentLinesContext()
  const { filter } = useFilterContext()

  const url = `v3/web/maine/descarte/${filter.unit.value}/${lines.lineProduction.value}?dtIni=${filter.period.start.toString()}&dtFim=${filter.period.end.toString()}`

  return useQuery({
    queryKey: ['query-disposal-request'],
    queryFn: async () => {
      const response = await Api.get<DisposalDataRequest>(url);

      const data = response.data.DIA.map((disposal) => {
        return {
          ...disposal,
          DESCARTEPROJETADO: 0.44
        }
      })

      data.push({
        DESCARTE: response.data.MEDIA.DESCARTE,
        DESCARTEPROJETADO: 0.44,
        DATA: 'Média'
      })

      return {
        ...response.data,
        DIA: data
      }
    }
  })
}
