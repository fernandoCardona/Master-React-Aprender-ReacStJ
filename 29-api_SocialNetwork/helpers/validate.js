const validator = require('validator');

const validate = (params) => {
    let name = !validator.isEmpty(params.name) &&
                validator.isLength(params.name,{min: 2, max: undefined}) &&
                validator.isAlpha(params.name, 'en-US');

    
    let surname = !validator.isEmpty(params.surname) &&
                   validator.isLength(params.surname,{min: 2, max: undefined}) &&
                   validator.isAlpha(params.surname, 'en-US');
    
    let nick =  !validator.isEmpty(params.nick) &&
                 validator.isLength(params.nick,{min: 2, max: undefined});
    
    let email = !validator.isEmpty(params.email) &&
                 validator.isEmail(params.email);
   
    let password = !validator.isPassword(params.passwordemail);

   if (params.bio) {
        let bio = validator.isLength(params.bio,{min: undefined, max: 255});
        if ( !bio ) {
            throw new Error('No se ha superado la validacion bio');
       }else {
            console.log('Validacion Superada');
       }
   }
   
 
   if ( !name || !surname || !nick || !email || !password || !bio ) {
        throw new Error('No se ha superado la validacion');
   }else {
        console.log('Validacion Superada');
   }
}


module.exports = validate
