import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Bar } from 'react-chartjs-2';
import "chartjs-plugin-datalabels";
import { larguraMonitor } from '../../util/global/varGlobal';
import { date } from '../filtro';

export function GraficoHorizontal() {

    //#002163 - azul 
    //#ff5252 - vermelho 

    ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels, CategoryScale, LinearScale);
    ChartJS.register(...registerables);

    const options = {
        indexAxis: 'y',
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
                // text: teste?.[0]?.tituloGrafico,
            }
        },
        scales: {
            x: {
                grid: {
                    display: false, //tira as barrinhas de fundo
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

    // console.log(teste)

    const dataFake = {
        labels: ['teste 1', 'teste 2'],
        datasets: [
            {
                label: 'valores de exemplo',
                type: 'bar',
                data: [20, 30],
                backgroundColor: [
                    '#002163'
                ],
                borderWidth: 1,
            },
        ],
    }

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <div style={{ background: 'black', textTransform: 'uppercase', color: 'white', border: 'solid 1px white', width: '280px', padding: '10px', borderRadius: '6px' }}>
                    disponibilidade acumulada
                </div>
                <div style={{ background: 'black', textTransform: 'uppercase', color: 'white', border: 'solid 1px white', width: '220px', padding: '10px', borderRadius: '6px' }}>
                    {date}
                </div>
                <div style={{ background: 'TRANSPARENT' }}>
                    <Bar options={options} data={dataFake} />
                </div>
            </div>
        </>
    )
}