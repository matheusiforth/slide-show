import { testeMostraComponente } from "../../App";
import GraficoVertical from "../../componentes/graficoVertical";
import { Header } from "../../componentes/header";

export default function Teste2() {

    return (
        <>
            <div style={{ background: 'lightblue', width: '100vw', height: '100vh', position: 'absolute', left: '0vh', top: '0vh' }}>
                <div style={{ background: 'lightgreen', width: '100vw', height: '50vh' }}>
                    <GraficoVertical />
                </div>
            </div>
        </>
    )
}