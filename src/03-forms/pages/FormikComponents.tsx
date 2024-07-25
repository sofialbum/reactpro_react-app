import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import '../styles/styles.css';

export const FormikComponents = () => {

  return (
    <div>
      <h1>Formik Components</h1>

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
                <label htmlFor="firstName">First Name</label>
                <Field name="firstName" type="text" />
                <ErrorMessage  name="firstName" component="span" />

                <label htmlFor="lastName">Last Name</label>
                <Field name="lastName" type="text" />
                <ErrorMessage  name="lastName" component="span" />

                <label htmlFor="email">Email Address</label>
                <Field name="email" type="text" />
                <ErrorMessage  name="email" component="span" />

                <label htmlFor="jobType">Job Type</label>
                <Field name="jobType" as="select">
                  <option value="">Choose an option</option>
                  <option value="developer">Developer</option>
                  <option value="designer">Designer</option>
                  <option value="it-senior">IT-Senior</option>
                  <option value="it-jr">IT-Junior</option>
                </Field>
                <ErrorMessage name="jobType" component="span" />


                <label htmlFor="terms">
                  <Field name="terms" type="checkbox" />
                  Terms and conditions
                </label>
                <ErrorMessage name="terms" component="span" />
              
                <button type="submit">Submit</button>
            </Form>
          )
        }

      </Formik>

      
    </div>
  )
}

