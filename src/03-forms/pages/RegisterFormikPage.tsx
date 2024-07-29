import { Formik, Form} from 'formik';
import * as Yup from 'yup';

import { MyTextInput } from '../components';

import '../styles/styles.css';

export const RegisterFormikPage = () => {

  
  return (
    <div>
      <h1>Register Formik Page</h1>

      <Formik
          initialValues={{ name: '', email: '', password1: '', password2: '' }} 
          onSubmit={ ( values ) => {
            console.log( values );
          }}
          validationSchema={
            Yup.object({
              name: Yup.string()
                        .min(2, 'Debe tener al menos 2 caracteres')
                        .required('Este campo es requerido'),
              email: Yup.string()
                        .email('Email no tiene un formato válido')
                        .required('Este campo es requerido'),
              password1: Yup.string()
                            .min(6, 'Debe tener al menos 6 caracteres')
                            .required('Este campo es requerido'),
              password2: Yup.string()
                            .oneOf([Yup.ref('password1')], 'Las contraseñas deben coincidir')
                            .required('Este campo es requerido'),
                            
            })
          }
      >

        {({ handleReset }) => (
            <Form>
                <MyTextInput label='Name' name='name' placeholder='Sofía' />
                
                <MyTextInput label='Email Address' name='email' type='email' placeholder='example@google.com' />

                <MyTextInput label='Password1' name='password1' type='password' placeholder='******' />

                <MyTextInput label='Confirm password' name='password2' type='password' placeholder='******' />

                <button type="submit">Create</button>
                <button type="button" onClick={ handleReset }>Reset Form</button>
            </Form>
          )
        }
      </Formik>
    </div>
  )
}


