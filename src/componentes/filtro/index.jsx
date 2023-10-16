import { useContext, useState } from 'react'
import * as S from './style'
import { useRequeIni } from '../../util/hooks/useReqInicial'
import MeuContexto from '../../util/context'
import { useChamaComponente } from '../../util/hooks';

let date = null;
// let testeFiltro = true

export function Filtro(props) {

    const {
        dadosIniciais: {
            dataUnidade,
            dataLinhaProducao,
            dataLinhaEscolha,
        },
        functions: {
            recebeDados
        },
    } = useRequeIni()
    // const { componente, atualizarComponente } = useChamaComponente()
    const { unidade, atualizarContador, linhaProducao, linhaEscolha, periodo } = useContext(MeuContexto)

    const [aberto, setAberto] = useState(true)
    const [periodoAtivo, setPeriodoAtivo] = useState(null);

    function pegaDados(value) {
        if (value?.idUnidade) {
            recebeDados({ idUnidade: value?.idUnidade })
            atualizarContador({ unidade: value?.idUnidade })
        }
        // if (value?.idLinhaProducao) {
        //     recebeDados({ idLinhaProducao: value?.idLinhaProducao })
        // }
        // if (value?.idLinhaEscolha) {
        //     recebeDados({ idLinhaEscolha: value?.idLinhaEscolha })
        // }
        if (value?.periodo) {
            setPeriodoAtivo(value?.periodo)
            recebeDados({ periodo: value?.periodo })
            atualizarContador({ periodo: value?.periodo })
        }
    }

    const optionsProducao = dataLinhaProducao?.map((value) => ({
        label: value?.DESCLINHA,
        value: value?.IDLINHA
    })) || [];

    const optionsEscolha = dataLinhaEscolha?.map((value) => ({
        label: value?.DESCLINHA,
        value: value?.IDLINHA
    })) || [];

    const onChangeProducao = (value) => {
        pegaDados({ idLinhaProducao: value?.map((value) => value?.value) })
        atualizarContador({ idLinhaProducao: value?.map((value) => value?.value) })

        // console.log(value)

        // const selectedOption = value.target.options[value.target.selectedIndex];
        // const selectedText = selectedOption.textContent;

        localStorage.setItem('linhaProducao', value?.map((value) => value?.label));
    };

    const onChangeEscolha = (value) => {
        pegaDados({ idLinhaEscolha: value?.map((value) => value?.value) })
        atualizarContador({ idLinhaEscolha: value?.map((value) => value?.value) })
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: '#171923',
            color: 'white',
            // fontSize: '12px',
            // height: '30px',
            ':hover': {
                backgroundColor: '#1e90ff',
            },
        }),
        control: (provided) => ({
            ...provided,
            backgroundColor: '#171923',
        }),
        placeholder: (provided, state) => ({
            ...provided,
            // fontSize: '14px',
            color: 'white',
            padding: '5px',
        }),
        menu: (provided) => ({
            ...provided,
            margin: 0,
            borderRadius: '5px',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
        }),
        singleValue: (provided, state) => ({
            ...provided,
            color: 'white',
        }),
    };

    function mesesAtras(value) {
        const meses = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];

        const data = new Date();
        let ano = data.getFullYear();

        if (value === 1) {
            data.setDate(data.getDate() - 1); // Subtrai 1 dia
            ano = data.getFullYear();
        }
        if (value === 2) {
            data.setMonth(data.getMonth())
            ano = data.getFullYear();
        }
        if (value === 3) {
            data.setMonth(data.getMonth() - 3); // Subtrai 3 mes
            ano = data.getFullYear();
        }

        const nomeMes = meses[data.getMonth()];
        date = `${nomeMes} de ${ano}`
    }

    return (
        <>
            {aberto &&
                <S.Sidebar>
                    <S.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

                            <S.SelectNomal name="unidade" onChange={(e) => {
                                pegaDados({ idUnidade: e.target.value });

                                const selectedOption = e.target.options[e.target.selectedIndex];
                                const selectedText = selectedOption.textContent;

                                localStorage.setItem('unidade', selectedText);
                            }}>
                                {unidade <= 0 &&
                                    <option value="0" disabled selected hidden>Selecione a unidade</option>
                                }
                                {dataUnidade?.map((value, index) => (
                                    <option key={index} value={value?.IDUNIDADE}>{value?.DESCUNIDADE}</option>
                                ))}
                            </S.SelectNomal>

                            <S.ReactSelect
                                isMulti
                                styles={customStyles}
                                onChange={(e) => onChangeProducao(e)}
                                // value={}
                                options={optionsProducao}
                                placeholder="Selecione a linha de Produção"
                            />

                            <S.ReactSelect
                                isMulti
                                styles={customStyles}
                                onChange={(e) => onChangeEscolha(e)}
                                options={optionsEscolha}
                                placeholder="Selecione a linha de Escolha"
                            />
                        </div>

                        <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr' }}>
                            <S.Button ativo={periodoAtivo === 4} onClick={() => { pegaDados({ periodo: 4 }); mesesAtras(1) }}>Ontem</S.Button>
                            <S.Button ativo={periodoAtivo === 1} onClick={() => { pegaDados({ periodo: 1 }); mesesAtras(2) }}>diário</S.Button>
                            <S.Button ativo={periodoAtivo === 2} onClick={() => { pegaDados({ periodo: 2 }); mesesAtras(2) }}>mensal</S.Button>
                            <S.Button ativo={periodoAtivo === 3} onClick={() => { pegaDados({ periodo: 3 }); mesesAtras(3) }}>trimestral</S.Button>
                        </div>

                        <S.Button style={{ background: '#5757aa', cursor: 'pointer' }}
                            onClick={() => {
                                if (linhaProducao?.length === 0 || linhaEscolha?.length === 0 || periodo === 0) {
                                    alert('Preencha todos os dados')
                                } else {
                                    { unidade > 0 && props?.atualizaEstadoComponente(false) }
                                    { unidade > 0 && props?.teste() }
                                }

                                // atualizarComponente(false)
                            }}
                        >Aplicar filtro</S.Button>
                    </S.Body>
                </S.Sidebar>
            }
        </>
    )
}

export { date, };