//IMPORTACIONES DE REACT:


//IMPORTACIONES DE TERCEROS:


//IMPORTACIONES DE APP:



export const Buscador = () => {




    return (
        <div className="search">
            <h3 className="title">Buscador</h3>
            <form>
                <input 
                    type="text" 
                    id="search_field" 
                    name="busqueda"
                    autoComplete="off"
                />
                <button id="search">Buscar</button>
            </form>
        </div>
    )
}
