import { useState } from "react";

export function useChamaComponente() {

    const [componente, setComponente] = useState(null);

    const atualizarComponente = (novoComponente) => {
        setComponente(novoComponente);
    };

    return { componente, atualizarComponente };
}