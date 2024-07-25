import { Formik, Form} from 'formik';
import * as Yup from 'yup';

import { MyCheckbox, MySelect, MyTextInput} from '../components';

import '../styles/styles.css';


export const FormikAbstraction = () => {

  return (
    <div>
      <h1>Formik Abstraction</h1>

      <Formik
          initialValues={{ firstName: '', lastName: '', email: '', terms: false, jobType: '' }} 
          onSubmit={ ( values ) => {
            console.log( values );
          }}
          validationSchema={
            Yup.object({
              firstName: Yup.string()
                            .max(15, 'Debe tener 15 caracteres o menos')
                            .required('Este campo es requerido'),
              lastName: Yup.string()
                            .max(10, 'Debe tener 10 caracteres o menos')
                            .required('Este campo es requerido'),
              email: Yup.string()
                        .email('Email no tiene un formato válido')
                        .required('Este campo es requerido'),
              terms: Yup.boolean()
                        .oneOf([true], 'Debe aceptar los términos y condiciones'),
              jobType: Yup.string()
                          .oneOf([ 'IT-Junior' ], 'Esta opción no está permitida')
                          .required('Este campo es requerido'),
            })
          }
      >

        {(formik) => (
            <Form>
                <MyTextInput label='First Name' name='firstName' placeholder='Sofía' />

                <MyTextInput label='Last Name' name='lastName' placeholder='González' />
                
                <MyTextInput label='Email Address' name='email' placeholder='example@google.com' type='email'/>

                <MySelect label="Job Type" name="jobType" >
                  <option value="">Choose an option</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="it-senior">IT-Senior</option>
                  <option value="it-jr">IT-Junior</option>
                </MySelect>
              
                <MyCheckbox label="Terms & Conditions" name="terms" />

                <button type="submit">Submit</button>
            </Form>
          )
        }

      </Formik>

      
    </div>
  )
}


