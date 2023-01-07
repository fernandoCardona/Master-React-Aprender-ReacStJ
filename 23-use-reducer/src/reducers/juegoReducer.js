


export const juegoReducer = (state = [], action) => {

    switch (action.type) {

        case "crear":
            return [ ...state, action.payload ]
        
        case "editar":
            //obtenemos el indice a editar
            let indice = state.findIndex( juego => juego.id === action.payload.id);
            //actualizamos el estado de elemento editado
            state[indice] = action.payload;
            return [ ...state ];
        
        case "borrar":
            return state.filter(juego => juego.id !== action.payload);

        default:
            return state;
    }

}
