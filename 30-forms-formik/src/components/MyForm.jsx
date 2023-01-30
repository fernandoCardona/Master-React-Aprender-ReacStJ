//IMPORTACIONES DE REACT:
import { useState } from 'react';
//IMPORTACIONES DE EXTERNAL PACKS:
import { useFormik } from 'formik';
import * as Yup from 'yup';
//IMPORTACIONES DE HOOKS/HELPERS:

//IMPORTACIONES DE APP COMPONENTS:



export const MyForm = () => {
  const validationSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    
    email: Yup.string().email('Invalid email').required('Required'),
});
  const formik = useFormik ({

      initialValues: {
          nombre: '',
          email: ''
      },
      validationSchema,
      onSubmit: values => {
        console.log(values);
      }

  });

    return (
        <div>
            <h1>My Form with FORMIK:</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" name='nombre' values={formik.values.nombre} onChange={formik.handleChange}/>
                    
                    {formik.errors.nombre && formik.touched.nombre ? (<div className='errors'>{formik.errors.nombre}</div>) : ''}
                   
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" name='email' values={formik.values.email} onChange={formik.handleChange}/>
                    
                    {formik.errors.email && formik.touched.email ? (<div className='errors'>{formik.errors.email}</div>) : ''}

                </div>
                <input type="submit" value='Send'/>
            </form>
        </div>
      
    )
}
