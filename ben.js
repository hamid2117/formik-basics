import React from 'react'
import {
  Formik,
  Field,
  Form,
  useField,
  FieldAttributes,
  FieldArray,
} from 'formik'
import {
  TextField,
  Button,
  Checkbox,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import * as yup from 'yup'

const MyRadio = ({ label, ...props }) => {
  const [field] = useField
  return <FormControlLabel {...field} control={<Radio />} label={label} />
}

const MyTextField = ({ placeholder, ...props }) => {
  const [field, meta] = useField
  const errorText = meta.error && meta.touched ? meta.error : ''
  return (
    <TextField
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  )
}

const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  pets: yup.array().of(
    yup.object({
      name: yup.string().required(),
    })
  ),
})

const App = () => {
  return (
    <div>
      <Formik
        validateOnChange={true}
        initialValues={{
          firstName: '',
          lastName: '',
          isTall: false,
          cookies: [],
          yogurt: '',
          pets: [{ type: 'cat', name: 'jarvis', id: '' + Math.random() }],
        }}
        validationSchema={validationSchema}
        // validate={values => {
        //   const errors: Record<string, string> = {};

        //   if (values.firstName.includes("bob")) {
        //     errors.firstName = "no bob";
        //   }

        //   return errors;
        // }}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          // make async call
          console.log('submit: ', data)
          setSubmitting(false)
        }}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            <MyTextField placeholder='first name' name='firstName' />
            <div>
              <Field
                placeholder='last name'
                name='lastName'
                type='input'
                as={TextField}
              />
            </div>
            <Field name='isTall' type='checkbox' as={Checkbox} />
            <div>cookies:</div>
            <Field
              name='cookies'
              type='checkbox'
              value='chocolate chip'
              as={Checkbox}
            />
            <Field
              name='cookies'
              type='checkbox'
              value='snickerdoodle'
              as={Checkbox}
            />
            <Field name='cookies' type='checkbox' value='sugar' as={Checkbox} />
            <div>yogurt</div>
            <MyRadio name='yogurt' type='radio' value='peach' label='peach' />
            <MyRadio
              name='yogurt'
              type='radio'
              value='blueberry'
              label='blueberry'
            />
            <MyRadio name='yogurt' type='radio' value='apple' label='apple' />
            <FieldArray name='pets'>
              {(arrayHelpers) => (
                <div>
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        type: 'frog',
                        name: '',
                        id: '' + Math.random(),
                      })
                    }
                  >
                    add pet
                  </Button>
                  {values.pets.map((pet, index) => {
                    return (
                      <div key={pet.id}>
                        <MyTextField
                          placeholder='pet name'
                          name={`pets.${index}.name`}
                        />
                        <Field
                          name={`pets.${index}.type`}
                          type='select'
                          as={Select}
                        >
                          <MenuItem value='cat'>cat</MenuItem>
                          <MenuItem value='dog'>dog</MenuItem>
                          <MenuItem value='frog'>frog</MenuItem>
                        </Field>
                        <Button onClick={() => arrayHelpers.remove(index)}>
                          x
                        </Button>
                      </div>
                    )
                  })}
                </div>
              )}
            </FieldArray>
            <div>
              <Button disabled={isSubmitting} type='submit'>
                submit
              </Button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default App
