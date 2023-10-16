import { useState } from "react";

// let testeComponente = true

export function useChamaComponente() {

    const [componente, setComponente] = useState(true);

    const atualizarComponente = (novoComponente) => {
        setComponente(novoComponente);
    };

    // console.log(componente)

    return { componente, atualizarComponente };
}