//Importaciones de React:

//Importaciones de terceros:

//Importaciones de la App:

export const Sidebar = () => {

    
    return (
        <aside className="lateral">
            <div className="search">
                <h3 className="title">Searcher</h3>
                <form action="">
                    <input type="text" id="search" />
                    <button id="search">Search</button>
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