import { ErrorMessage, Field, FormikProps } from 'formik';
import React from 'react'
import { FormInputProps } from '../types';






const FormInput = ({label,name,type,defaultValue,value}:FormInputProps) => {
  return (
    <div className='form-control '>
    <label className='label'>
      <span className='label-text capitalize'>{label}</span>
    </label>
    <Field
      type={type}
      name={name}
      defaultValue={defaultValue}
      className='input input-bordered '
     // value={value}
    />
    <ErrorMessage name={name} component='div' className='text-red-500' />
  </div>
  )
}

export default FormInput