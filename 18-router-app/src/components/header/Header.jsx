//Importaciones de REACT



//Importaciones de Terceros

//Importaciones de App
import { HeaderLogo } from "./HeaderLogo";
import { Navbar } from "./Navbar"

export const Header = () => {



    return (
        <>
            <div className="header-wrapper">
                <HeaderLogo/>
                <Navbar/>
            </div>
        </>
        
    )
}