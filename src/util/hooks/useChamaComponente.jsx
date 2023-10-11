import { useState } from "react";

// let testeComponente = true

export function useChamaComponente() {

    const [componente, setComponente] = useState(true);

    const atualizarComponente = (novoComponente) => {
        setComponente(novoComponente);
    };

    return { componente, atualizarComponente };
}