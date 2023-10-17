import { testeMostraComponente } from "../../App";
import GraficoVertical from "../../componentes/graficoVertical";

export default function Teste1() {

    return (
        <>
            <div style={{ background: 'black', width: '100vw', height: '80vh', left: '0vh', top: '20vh' }}>
                {/* <div style={{ background: 'lightgreen', width: '100vw', height: '50vh' }}> */}
                <GraficoVertical />
                {/* <GraficoVertical /> */}
                {/* </div> */}
            </div>
        </>
    )
}