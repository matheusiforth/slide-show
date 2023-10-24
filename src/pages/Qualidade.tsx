import { useQueries } from "react-query"
import { useCurrentLinesContext } from "../contexts/current-lines"
import { useFilterContext } from "../contexts/filter"
import { Api } from "../utils/api"

import { ComposedChart, Cell, Line, XAxis, YAxis, CartesianGrid, Tooltip, Bar, ResponsiveContainer, Pie, PieChart } from 'recharts';
import * as S from "./styles";
import { useVerifyRangePeriod } from "../hooks";


type QualityDataRequest = {
  DIA: {
    DATA: string
    QUALIDADE: number
    QUALIDADEPROJETADA: number
  }[]
  MEDIA: {
    QUALIDADE: number
  }
}

type DefectDataRequest = {
  PERCENTUAL: number
  DEFEITO: {
    ID: number
    DESCRICAO: string
  }
}

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text style={{fontSize: '0.9rem'}} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff4242', '#dd6fff'];

export function TabelaQualidade() {
  const { outRange } = useVerifyRangePeriod()
  const [queryQuality, queryDefect] = useQualityRequest()

  return (
    <S.WrapperPage>
      {queryQuality?.data?.DIA.length ? (
        <>
          <S.TitleGraph> Qualidade Diária (%) </S.TitleGraph>

          <S.WrapperGraph>
            <ResponsiveContainer>
              <ComposedChart data={queryQuality.data?.DIA} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="DATA" />
                <Tooltip wrapperStyle={{ color: 'black' }} />
                <Bar
                  name="Qualidade"
                  type="monotone"
                  dataKey="QUALIDADE"
                  label={!outRange && { fill: '#E1E1DD', angle: -90 }}
                  activeBar={{ stroke: 'white', strokeWidth: 2 }}
                  fill="#002163"
                >
                  {queryQuality.data?.DIA.map((entry) => (
                    <Cell fill={entry.QUALIDADE > entry.QUALIDADEPROJETADA ? '#002163' : '#ff5252'} />
                  ))}
                </Bar>

                <Line name="Qualidade Projetada" type="monotone" dataKey='QUALIDADEPROJETADA' stroke="#fff" />
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
              <S.Legend.Label> Qualidade Projetada </S.Legend.Label>
            </S.Legend.Box>
          </S.Legend.Root>
        </>
      ) : (
        <S.TitleGraph> Qualidade Diária: Sem Dados </S.TitleGraph>
      )}

      {queryDefect?.data?.length ? (
        <>
          <S.TitleGraph> Qualidade Diária (%) </S.TitleGraph>

          <div style={{ display: 'flex', height: 'calc(30vh)' }}>
            <S.WrapperPizza>
              <ResponsiveContainer >
                <PieChart >
                  <Pie data={queryDefect.data} dataKey='PERCENTUAL' label={renderCustomizedLabel} labelLine={false} >
                    {queryDefect.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} name={entry.DEFEITO.DESCRICAO} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </S.WrapperPizza>

            <S.Legend.Root orientation="vertical" style={{ gap: 'none' }}>
              {queryDefect.data.map((entry, index) => (
                <S.Legend.Box key={entry.DEFEITO.ID}>
                  <S.Legend.Color color={COLORS[index % COLORS.length]} />
                  <S.Legend.Label style={{ fontSize: '0.9rem' }}> {entry.DEFEITO.DESCRICAO} </S.Legend.Label>
                </S.Legend.Box>
              ))}
            </S.Legend.Root>
          </div>
        </>
      ) : (
        <S.TitleGraph> Gráfico de Defeitos Agrupados: Sem dados </S.TitleGraph>
      )}
    </S.WrapperPage>
  )
}

/**
 * useQualityRequest - Custom React hook for making quality data requests.
 *
 * This hook fetches quality data from a specific API endpoint using query parameters.
 *
 * @example
 * const { data, error, isLoading, ... } = useQualityRequest()
 *
 * @returns {UseQueryResult<QualityDataRequest, unknown>} The query result containing quality data.
 */
function useQualityRequest() {
  const { lines } = useCurrentLinesContext()
  const { filter } = useFilterContext()

  const urlQuality = `v3/web/maine/qualidade/${filter.unit.value}/${lines.lineProduction.value}?dtIni=${filter.period.start.toString()}&dtFim=${filter.period.end.toString()}`
  const urlDefect = `v3/web/maine/defeito/${filter.unit.value}/${lines.lineProduction.value}?dtIni=${filter.period.start.toString()}&dtFim=${filter.period.end.toString()}`

  return useQueries([
    {
      queryKey: ['query-quality-request'],
      queryFn: async () => {
        const response = await Api.get<QualityDataRequest>(urlQuality);

        const data = response.data.DIA.map((quality) => {
          return {
            ...quality,
            QUALIDADEPROJETADA: 96
          }
        })

        data.push({
          QUALIDADE: response.data.MEDIA.QUALIDADE,
          QUALIDADEPROJETADA: 96,
          DATA: 'Média'
        })

        return {
          ...response.data,
          DIA: data
        }
      }
    },
    {
      queryKey: ['query-defect-request'],
      queryFn: async () => {
        const response = await Api.get<DefectDataRequest[]>(urlDefect);

        let percentage = 100;

        response.data.forEach((entry) => {
          percentage = percentage - entry.PERCENTUAL
        })

        return [...response.data, { PERCENTUAL: percentage, DEFEITO: { DESCRICAO: 'OUTROS', ID: 12323 } }]
      }
    }
  ])
}
