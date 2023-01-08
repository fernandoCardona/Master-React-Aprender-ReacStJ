import { useState } from 'react';

export const useMays = (texto) => {

    const [miTexto, setMiText] = useState( texto );

    const mayusculas = () => {
        setMiText(texto.toUpperCase());
    }
    const minusculas = () => {
        setMiText(texto.toLowerCase());
    }
    const concatenar = (added) => {
        setMiText(texto + ' ' + added)
    }

    return {
        estado: miTexto,
        mayusculas,
        minusculas,
        concatenar
    }
}
