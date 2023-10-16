import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import "chartjs-plugin-datalabels";
import * as S from './styles'
import { larguraMonitor } from '../../util/global/varGlobal';
import logoDexco from '../../imagens/dexco-logo.png'
import { date } from '../filtro';
import { useChamaComponente } from '../../util/hooks';

// let testeGrafico = false

export default function GraficoVertical(props) {

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale);
    ChartJS.register(...registerables);

    // const { componente, atualizarComponente } = useChamaComponente()

    const options = {
        indexAxis: 'x',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            autoPadding: true,
        },
        plugins: {
            datalabels: {
                color: 'black',
                font: { weight: 'normal', size: 11 },
                align: 'start',
                anchor: 'end',
                clamp: true,
                clip: false,
                rotation: 0,
                font: {
                    size: larguraMonitor >= 2800 ? 45 : 20
                },
            },
            legend: {
                align: 'center',
                position: 'bottom',
                display: false,
                textAlign: 'left',
                font: {
                    size: 20
                },

                labels: {
                    boxWidth: 15,
                    boxHeight: 15,
                    color: 'black'
                }
            },
            title: {
                display: true,
                text: `Produção diária ${localStorage.getItem('linhaProducao')} (m²)`
            }
        },
        scales: {
            x: {
                grid: {
                    display: true, //tira as barrinhas de fundo
                },
                ticks: {
                    color: '#000',
                    font: {
                        weight: 800,
                        size: 0,
                    },
                },
            },
            y: {
                grid: {
                    display: false, //tira as barrinhas de fundo
                },
                ticks: {
                    font: {
                        size: larguraMonitor >= 2800 ? 30 : 14
                    }
                }
            },
        }
    }

    const dataFake = {
        labels: ['teste1', 'teste2', 'teste3'],
        datasets: [
            {
                label: 'valores de exemplo',
                type: 'bar',
                data: [50, 60, 70],
                backgroundColor: [
                    'rgb(241, 137, 233)', 'rgba(77, 201, 246, 0.5)',
                    'rgba(246, 112, 25, 0.5)', 'rgba(157, 90, 249, 0.5)',
                    'rgba(22, 106, 143, 0.5)', 'rgba(0, 169, 80, 0.5)',
                    'rgba(133, 73, 186, 0.8)', 'rgba(83, 123, 196, 0.5)',
                    'rgba(245, 55, 148, 1)', 'rgba(255, 0, 0, 0.5)',
                    'rgb(112, 148, 222)', 'rgba(0, 0, 255, 0.5)',
                    'rgba(255, 192, 203, 0.5)', 'rgba(255, 255, 0, 0.5)',
                    'rgba(100, 100, 0, 0.5)', 'rgba(131, 155, 107, 0.5)',
                    'rgba(100, 255, 100, 0.5)', 'rgba(100, 0, 255, 0.5)',
                    'rgba(255, 0, 0, 0.5)', 'rgba(150, 10, 80, 0.5)',
                    'rgba(12, 12, 12, 0.5)', 'rgba(255, 99, 132, 0.5)',
                    'rgba(150, 200, 180, 1)', 'rgb(160, 11, 245)',
                    'rgb(201, 144, 168)', 'rgba(172, 194, 54, 0.5)',
                ],
                borderWidth: 1,
            },
        ],
    }

    // testeGrafico = componente

    return (
        <>
            {/* <Header /> */}
            {/* <S.LogoLinha>
                <span style={{ color: 'white' }}>Ex Forno 1</span>
                <S.Img src={logoDexco} onClick={() => atualizarComponente(true)} style={{ cursor: 'pointer' }} />
            </S.LogoLinha>
            <S.PaiHeader>
                <S.EnglobaSubtitulo>
                    <span>Indicadores de produção - <span>{date}</span></span>
                    <span>Unidade {localStorage.getItem('unidade')}</span>
                </S.EnglobaSubtitulo>
            </S.PaiHeader> */}

            <S.Pai>
                <S.EnglobaGrafico>
                    <Bar options={options} data={dataFake} />
                    {/* <Bar options={options} data={dataFake} /> */}
                    {/* <Bar options={options} data={dataFake} /> */}
                </S.EnglobaGrafico>
            </S.Pai>
        </>
    );
}

// export { testeGrafico }