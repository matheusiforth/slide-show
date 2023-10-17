import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import "chartjs-plugin-datalabels";
import * as S from './styles'
import { larguraMonitor } from '../../util/global/varGlobal';
import { ConverteJson } from '../../util/global/converteJson';
import { GraficoHorizontal } from '../graficoHorizontal';

// let testeGrafico = false

export default function GraficoVertical(props) {

    //#002163 - azul 
    //#ff5252 - vermelho 

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale);
    ChartJS.register(...registerables);

    const { teste } = ConverteJson()

    const options = {
        indexAxis: 'x',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
            autoPadding: true,
        },
        plugins: {
            datalabels: {
                color: 'white',
                font: { weight: 'normal', size: 11 },
                align: 'start',
                anchor: 'end',
                clamp: true,
                clip: false,
                rotation: -90,
                font: {
                    size: larguraMonitor >= 2800 ? 45 : 20
                },
            },
            legend: {
                align: 'center',
                position: 'bottom',
                display: false,
                textAlign: 'left',
                // color: 'white',
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
                text: teste?.[0]?.tituloGrafico,
                color: 'white',
                font: {
                    size: 15
                }
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, //tira as barrinhas de fundo
                    color: 'yellow',
                },
                ticks: {
                    // display: true,
                    color: 'white',
                    font: {
                        weight: 800,
                        size: 0,
                    },
                },
            },
            y: {
                grid: {
                    display: false, //tira as barrinhas de fundo
                    color: 'white',
                },
                ticks: {
                    display: false,
                    font: {
                        size: larguraMonitor >= 2800 ? 30 : 14
                    }
                }
            },
        }
    }

    const dataFake = {
        labels: teste?.[0]?.labels,
        datasets: [
            {
                label: 'valores de exemplo',
                type: 'bar',
                data: teste?.[0]?.arrayDados,
                backgroundColor: [
                    '#002163'
                ],
                borderWidth: 1,
            },
            {
                label: ' ',
                type: 'line',
                data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                // data: [100],
                fill: false,
                borderWidth: 2,
                borderColor: 'white'
                // pointRadius: 
            }
        ],

    }

    return (
        <>
            <S.Pai>
                <S.EnglobaGrafico style={{ width: props?.gh ? '87%' : "100%" }}>
                    <Bar options={options} data={dataFake} />
                    <Bar options={options} data={dataFake} />
                </S.EnglobaGrafico>
                {props?.gh && <GraficoHorizontal />}
            </S.Pai>
        </>
    );
}