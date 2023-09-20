import { useState } from 'react'
import * as S from './style'

export function Filtro(props) {

    const [aberto, setAberto] = useState(true)
    const [backupUnidade, setBackupUnidade] = useState(0)
    const [periodoAtivo, setPeriodoAtivo] = useState(null);
    const [backupLinhaProducao, setBackupLinhaProducao] = useState([])
    const [backupLinhaEscolha, setBackupLinhaEscolha] = useState([])

    function pegaDados(value) {
        if (value?.idUnidade) {
            setBackupUnidade(value?.idUnidade)
            props.recebeDados({ idUnidade: value?.idUnidade })
        }
        if (value?.idLinhaProducao) {
            setBackupLinhaProducao(value?.idLinhaProducao)
            props.recebeDados({ idLinhaProducao: value?.idLinhaProducao })
        }
        if (value?.idLinhaEscolha) {
            setBackupLinhaEscolha(value?.idLinhaEscolha)
            props.recebeDados({ idLinhaEscolha: value?.idLinhaEscolha })
        }
        if (value?.periodo) {
            setPeriodoAtivo(value?.periodo)
            props.recebeDados({ periodo: value?.periodo })
        }
    }

    const optionsProducao = props?.linhaProducao?.map((value) => ({
        label: value?.desclinha,
        value: value?.idlinha
    })) || [];

    const optionsEscolha = props?.linhaEscolha?.map((value) => ({
        label: value?.desclinha,
        value: value?.idlinha
    })) || [];

    const onChangeProducao = (value) => {
        setBackupLinhaProducao(value);
        pegaDados({ idLinhaProducao: value?.map((value) => value?.value) })
    };

    const onChangeEscolha = (value) => {
        setBackupLinhaEscolha(value);
        pegaDados({ idLinhaEscolha: value?.map((value) => value?.value) })
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
        let date = null

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
        props?.recebeDados({ date: `${nomeMes} de ${ano}` })
    }

    return (
        <>
            {aberto &&
                <S.Sidebar>
                    <S.Header>
                        <S.Fechar onClick={() => {
                            setAberto(!aberto);
                            props?.alterarAberto(false)
                        }}
                        >X</S.Fechar>
                    </S.Header>

                    <S.Body>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <S.SelectNomal name="unidade" value={backupUnidade} onChange={(e) => {
                                pegaDados({ idUnidade: e.target.value });

                                const selectedOption = e.target.options[e.target.selectedIndex];
                                const selectedText = selectedOption.textContent;

                                localStorage.setItem('unidade', selectedText);
                            }}>
                                {backupUnidade <= 0 &&
                                    <option value="0" disabled selected hidden>Selecione a unidade</option>
                                }
                                {props?.unidade?.map((value, index) => (
                                    <option key={index} value={value?.idunidade}>{value?.descunidade}</option>
                                ))}
                            </S.SelectNomal>

                            <S.ReactSelect
                                isMulti
                                styles={customStyles}
                                onChange={(e) => onChangeProducao(e)}
                                value={backupLinhaProducao}
                                options={optionsProducao}
                                placeholder="Selecione a linha de Produção"
                            />

                            <S.ReactSelect
                                isMulti
                                styles={customStyles}
                                onChange={(e) => onChangeEscolha(e)}
                                value={backupLinhaEscolha}
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

                        <S.Button style={{ background: '#5757aa' }} onClick={() => { setAberto(!aberto); props?.alterarAberto(false) }}
                        >Aplicar filtro</S.Button>
                    </S.Body>
                </S.Sidebar>
            }
        </>
    )
}