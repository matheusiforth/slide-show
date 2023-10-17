import { GraficoHorizontal } from "../../componentes/graficoHorizontal";
import GraficoVertical from "../../componentes/graficoVertical";

export default function Teste2() {
    return (
        <div style={{ background: 'black', width: '100vw', height: '70vh', left: '0vh', top: '20vh' }}>
            <GraficoVertical gh={false} />
        </div>
    )
}