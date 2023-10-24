import { useQuery } from "react-query"
import { useCurrentLinesContext } from "../contexts/current-lines"
import { useFilterContext } from "../contexts/filter"
import { Api } from "../utils/api"

import { BarChart, ComposedChart, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer  } from 'recharts';
import * as S from "./styles";
import { useFormatPeriod, useVerifyRangePeriod } from "../hooks";

type Availability = {
  MINUTOS: number
  PORCENTAGEM: number
}


type AvailabilityDataRequest = {
  DIA: {
    DATA: string
    DISPONIBILIDADE: Availability
  }[]
  MEDIA: {
    DISPONIBILIDADE: Availability
  }
  TOTAL: {
    MINUTOS: {
      UTILIZADAS: number
      DISPONIVEIS: number
    }
  }
}

export function TabelaDisponibilidade() {
  const { outRange } = useVerifyRangePeriod()
  const query = useAvailabilityRequest()
  const { filter } = useFilterContext()
  const currentPeriod = useFormatPeriod(filter)

  const accumulatedAvailability = [
    { name: 'Horas utilizadas', value: Math.floor((query?.data?.TOTAL?.MINUTOS?.UTILIZADAS || 0) / 60) },
    { name: 'Horas Disponíveis', value: Math.floor((query?.data?.TOTAL?.MINUTOS?.DISPONIVEIS || 0) / 60) }
  ]

  return (
    <S.BoxPage>
      <div style={{ width: '65%' }}>
        {query?.data?.DIA.length ? (
          <>
            <S.TitleGraph> Disponibilidade Diária (Horas) </S.TitleGraph>

            <S.WrapperGraph>
              <ResponsiveContainer>
                <ComposedChart data={query.data?.DIA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="DATA" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ color: 'black' }} />
                  <Bar
                    name="Horas"
                    type="monotone"
                    dataKey="DISPONIBILIDADE.MINUTOS"
                    label={!outRange && { fill: '#E1E1DD', angle: -90 }}
                    activeBar={{ stroke: 'white', strokeWidth: 2 }}
                    fill="#002163"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </S.WrapperGraph>

            <S.Legend.Root>
              <S.Legend.Box>
                <S.Legend.Color color="#002163" />
                <S.Legend.Label> Horas </S.Legend.Label>
              </S.Legend.Box>
            </S.Legend.Root>
          </>
        ) : (
          <S.TitleGraph> Horas Disponibilidade Diária: Sem Dados </S.TitleGraph>
        )}

        {query?.data?.DIA.length ? (
          <>
            <S.TitleGraph> Disponibilidade Diária (%) </S.TitleGraph>

            <S.WrapperGraph>
              <ResponsiveContainer>
                <ComposedChart data={query.data?.DIA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="DATA" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ color: 'black' }} />
                  <Bar
                    name="Horas"
                    type="monotone"
                    dataKey="DISPONIBILIDADE.PORCENTAGEM"
                    label={!outRange && { fill: '#E1E1DD', angle: -90 }}
                    activeBar={{ stroke: 'white', strokeWidth: 2 }}
                    fill="#002163"
                  >
                    {query.data?.DIA.map((entry) => (
                      <Cell fill={entry.DISPONIBILIDADE.PORCENTAGEM > entry.DISPONIBILIDADEPROJETADA ? '#002163' : '#ff5252'} />
                    ))}
                  </Bar>
                  <Line name="Descarte Projetado" type="monotone" dataKey='DISPONIBILIDADEPROJETADA' stroke="#fff" />
                </ComposedChart>
              </ResponsiveContainer>
            </S.WrapperGraph>

            <S.Legend.Root>
              <S.Legend.Box>
                <S.Legend.Color color="#002163" />
                <S.Legend.Label> Dentro do projetado </S.Legend.Label>
              </S.Legend.Box>
              <S.Legend.Box>
                <S.Legend.Color color="#ff5252" />
                <S.Legend.Label> Acima do projetado </S.Legend.Label>
              </S.Legend.Box>
              <S.Legend.Box>
                <S.Legend.Color color="#fff" />
                <S.Legend.Label> Qualidade </S.Legend.Label>
              </S.Legend.Box>
            </S.Legend.Root>
          </>
        ) : (
          <S.TitleGraph> Porcentagem Disponibilidade Diária: Sem Dados </S.TitleGraph>
        )}
      </div>
      <div style={{ width: '30%' }}>
        <S.Box.Title> Disponibilidade Acumulada </S.Box.Title>
        <S.Box.SubTitle> {currentPeriod} </S.Box.SubTitle>

        {query?.data?.TOTAL && (
          <S.AccumulatedBox>
            <ResponsiveContainer>
              <BarChart
                layout="vertical"
                data={accumulatedAvailability}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}
              >
                <XAxis type="number" />
                <YAxis type="category"  dataKey="name" />
                <CartesianGrid vertical={false} />
                <Tooltip wrapperStyle={{ color: 'black' }} />
                <Bar
                  name="Horas"
                  type="monotone"
                  dataKey="value"
                  label={{ fill: '#E1E1DD' }}
                  activeBar={{ stroke: 'white', strokeWidth: 2 }}
                  fill="#002163"
                >
                  {accumulatedAvailability.map((entry) => (
                    <Cell fill={entry.name === 'Horas Disponíveis' ? '#002163' : '#ff5252'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </S.AccumulatedBox>
        )}
      </div>
    </S.BoxPage>
  )
}


/**
 * useAvailabilityRequest - Custom React hook for making availability data requests.
 *
 * This hook fetches availability data from a specific API endpoint using query parameters.
 *
 * @example
 * const { data, error, isLoading, ... } = useAvailabilityRequest()
 *
 * @returns {UseQueryResult<AvailabilityDataRequest, unknown>} The query result containing availability data.
 */
function useAvailabilityRequest() {
  const { lines } = useCurrentLinesContext()
  const { filter } = useFilterContext()

  const url = `v3/web/maine/disponibilidade/${filter.unit.value}/${lines.lineProduction.value}?dtIni=${filter.period.start.toString()}&dtFim=${filter.period.end.toString()}`

  return useQuery({
    queryKey: ['query-availability-request'],
    queryFn: async () => {
      const response = await Api.get<AvailabilityDataRequest>(url);

      const data = response.data.DIA.map((availability) => {
        return {
          ...availability,
          DISPONIBILIDADE: {
            ...availability.DISPONIBILIDADE,
            MINUTOS: Math.floor(availability.DISPONIBILIDADE.MINUTOS / 60),
          },
          DISPONIBILIDADEPROJETADA: 95
        }
      })

      data.push({
        DISPONIBILIDADE: {
          ...response.data.MEDIA.DISPONIBILIDADE,
          MINUTOS: Math.floor(response.data.MEDIA.DISPONIBILIDADE.MINUTOS / 60),
        },
        DISPONIBILIDADEPROJETADA: 95,
        DATA: 'Média'
      })

      return {
        ...response.data,
        DIA: data
      }
    }
  })
}
