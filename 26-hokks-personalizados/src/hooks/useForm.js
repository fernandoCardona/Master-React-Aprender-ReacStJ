import { useState } from "react";


export const useForm = ( objetoInicial = {} ) => {
   
    const[ formulario, setFormulario ] = useState(objetoInicial);

    const serializarFormulario = (formulario) => {

        const formData = new FormData(formulario);
        const objetoCompleto = {};

        for ( let[ name, value ] of formData ) {
            objetoCompleto[name] = value;
        }
        return objetoCompleto;
    }
    const guardarDatos = (e) =>{
        e.preventDefault();
        let datos = serializarFormulario(e.target);
        // let datos =  {
        //     email: e.target.email.value,
        //     nombre: e.target.nombre.value,
        //     password: e.target.password.value,
        //     descripcion: e.target.descripcion.value
        // }
        setFormulario(datos);
    }
    const handleInputChange = ({target}) => {
        const { name, value } = target;
        setFormulario({
            ...formulario,
            [name]: value
        })
    }

    return {
        formulario,
        handleInputChange,
        guardarDatos
    }
}
