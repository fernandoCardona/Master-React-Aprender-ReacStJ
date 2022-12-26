//Importaciones de REACT
import reactLogo from '../../assets/react.svg'
//Importaciones de Terceros

//Importaciones de App

export const HeaderLogo = () => {



    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                 <img src="/vite.svg" className="logo" alt="Vite logo" />
                </a>
                <a href="https://reactjs.org" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
        </>
        
    )
}