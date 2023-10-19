import { useTratativas } from "../hooks"

export function ConverteJson(props) {

    // const {
    //     dados: {
    //         dadosColunaDisponibilidade,
    //         dadosEficienciaProducao
    //     }
    // } = useTratativas()

    function geraLabel() {
        const labels = [];
        for (let i = 1; i <= 30; i++) {
            labels.push(`teste ${i}`);
        }
        return labels;
    }

    function geraNumero() {
        const numbers = [];
        for (let i = 1; i <= 30; i++) {
            numbers.push(i);
        }
        return numbers;
    }

    const trintaLabels = geraLabel();
    const numeros = geraNumero();

    const teste = [
        {
            tituloHeader: 'Indicadores de produção',
            tituloGrafico: `Produção diária ${localStorage.getItem('linhaProducao')} (m²)`,
            labels: trintaLabels,
            arrayDados: numeros,
        },
        {
            tituloHeader: 'Indicadores de produção',
            tituloGrafico: `Aderência diária ${localStorage.getItem('linhaProducao')} (m²)`,
            labels: trintaLabels,
            arrayDados: numeros,
        }
    ]

    return {
        teste
    }
}