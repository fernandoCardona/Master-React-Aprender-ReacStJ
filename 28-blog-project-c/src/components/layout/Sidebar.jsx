//Importaciones de React:
import { useState } from "react";
import { useNavigate } from "react-router-dom";
//Importaciones de terceros:

//Importaciones de la App:

export const Sidebar = () => {

    const [ search, setSearch ] = useState('');
    const navegar = useNavigate();

    const doSearch = (e) => {
        e.preventDefault();
        let mySearch = e.target.searchArticle.value;
        //redireccion
        navegar('/search/'+ mySearch, {replace: true});
    }
    return (
        <aside className="lateral">
            <div className="search">
                <h3 className="title">Searcher</h3>
                <form onSubmit={ doSearch }>
                    <input type="text" name="searchArticle" />
                    <input type="submit" className="btn-success" value="Search"/>
                </form>
            </div>
            {/* <div className="add">
                <h3 className="title">Add Article</h3>
                <form action="">
                    <input type="text" id="title" placeholder="Title"/>
                    <textarea name="" id="description" placeholder="Description"cols="30" rows="10"></textarea>
                    <button id="save">Send</button>
                </form>
            </div> */}
        </aside>
    )
}