const validator = require('validator');

//16.-HELPER Validar el articulo:
const validarArticle = (params) => {
    let validar_title = !validator.isEmpty(params.title) && 
                        validator.isLength(params.title, { min:5, max: undefined});
    let validar_content = !validator.isEmpty(params.content);

    if ( !validar_title || !validar_content) {
        throw new Error('No se ha validado la informacion!!');
    }
}  

module.exports = {
    validarArticle 
};