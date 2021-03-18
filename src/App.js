import React from 'react'
import { Formik, Field, Form, useField, FieldArray } from 'formik'
import * as yup from 'yup'
import {
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
} from '@material-ui/core'
import './App.css'

const TextFielde = ({ placeholder, ...prop }) => {
  const [field, meta] = useField(prop)
  const error = meta.error && meta.touched ? meta.error : ''
  return <TextField {...field} placeholder={placeholder} helperText={error} />
}
const Radioh = ({ label, ...prop }) => {
  const [field] = useField(prop)
  return <FormControlLabel {...field} control={<Radio />} label={label} />
}
//Yup validation
const validationSchema = yup.object({
  firstName: yup.string().required().max(10),
  pets: yup.array().of(yup.object({ name: yup.string().required() })),
})
function App() {
  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          secondName: '',
          checkbox: false,
          cookies: [],
          radio: '',
          pets: [{ type: 'frog', name: 'kitty' }], //to get name(in form) ### pets.0.name
        }}
        validationSchema={validationSchema}
        onSubmit={(data, { setSubmitting }) => {
          setSubmitting(true)
          console.log(data)
          setSubmitting(false)
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <TextFielde type='text' placeholder='first name' name='firstName' />
            <div>
              <TextFielde
                type='text'
                placeholder='second name'
                name='secondName'
              />
            </div>
            <Field type='checkbox' name='checkbox' as={Checkbox} />
            <div>
              <Radioh name='radio' type='radio' value='male' label='male' />
              <Radioh name='radio' type='radio' value='female' label='female' />
              <Radioh name='radio' type='radio' value='other' label='other' />
            </div>
            <Button type='submit' disable={isSubmitting}>
              Submite
            </Button>
            <FieldArray name='pets'>
              {(arrayy) => (
                <div>
                  <Button
                    onClick={() => {
                      arrayy.push({ name: '', type: 'frog' })
                    }}
                  >
                    add
                  </Button>
                  {values.pets.map((pet, index) => {
                    return (
                      <div key={index}>
                        <TextFielde
                          type='text'
                          name={`pets.${index}.name`}
                          as={TextField}
                        />
                        <Field
                          type='select'
                          name={`pets.${index}.type`}
                          as={Select}
                        >
                          <MenuItem value='frog'>frog</MenuItem>
                          <MenuItem value='cat'>cat</MenuItem>
                          <MenuItem value='dog'>dog</MenuItem>
                        </Field>
                        <Button onClick={() => arrayy.remove(index)}>X</Button>
                      </div>
                    )
                  })}
                </div>
              )}
            </FieldArray>
            <pre>{JSON.stringify(values, null, 3)}</pre>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default App
