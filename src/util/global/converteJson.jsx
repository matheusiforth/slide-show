import { useTratativas } from "../hooks"

export function ConverteJson(props) {

    // const {
    //     dados: {
    //         dadosColunaDisponibilidade,
    //         dadosEficienciaProducao
    //     }
    // } = useTratativas()

    const teste = [
        {
            tituloHeader: 'Indicadores de produção',
            tituloGrafico: `Produção diária ${localStorage.getItem('linhaProducao')} (m²)`,
            labels: ['teste 1', 'teste 2', 'teste 3'],
            arrayDados: [30, 50, 70],
        }
    ]


    return { 
        teste
    }
}