import { Formik, Form } from 'formik'
import { MySelect, MyTextInput } from '../components';
import formJson from '../data/custom-form.json'
import * as Yup from 'yup';

const initialValues: { [key: string]: any } = {};
const requiredFields: { [key: string]: any } = {}

for (const input of formJson) {
  initialValues[ input.name ] = input.value;

  if ( !input.validations ) continue;

  let schema = Yup.string()

  for (const rule of input.validations) {
    if ( rule.type === 'required' ) {
      schema = schema.required('This field is required')
    }

    if ( rule.type === "minLength") {
      schema = schema.min( (rule as any).value || 2, `Mínimo de ${ (rule as any).value || 2 } caracteres` )
    }

    if ( rule.type === "email") {
      schema = schema.email('Check the email format')
    }

  }

  requiredFields[input.name] = schema;
}

const validationSchema = Yup.object({ ...requiredFields });

export const DynamicForm = () => {
  return (
    <div>
      <h1>Dynamic Form</h1>
      
      <Formik
          initialValues={ initialValues }
          onSubmit={ ( values ) => {
            console.log( values );
          }}
          validationSchema={ validationSchema }
      >
        { (formik) => (
              <Form noValidate>
                 { formJson.map( ({ type, name, placeholder, label, options }) => {

                  if ( type === 'input' || type === 'password' || type === 'email' ) {
                    return <MyTextInput 
                                key={name}
                                type={(type as any)} 
                                name={name} 
                                label={label} 
                                placeholder={placeholder} />
                  } else if ( type === 'select' ) {
                    return (
                      <MySelect 
                          key={name}
                          label={label}
                          name={name}
                      >
                          <option value="">Select an option</option>
                          {
                            options?.map( ({ id, label }) => (
                              <option key={id} value={id}>{label}</option>
                            ))
                          }
                      </MySelect>
                    )
                  }
                 }) }
                 <button type='submit'>Submit</button>
              </Form>

        )}
      </Formik>
    </div>
  )
}

