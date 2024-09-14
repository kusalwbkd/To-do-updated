import React from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { FormInput, Logo, SubmitBtn } from '../Components';
import { Link, useNavigate } from 'react-router-dom';
import { registerFormValues } from '../types';
import { useAuth } from '../context/user/context';
import { toast } from 'react-toastify';



 
const Register = () => {

  const{register}=useAuth()
  const navigate=useNavigate()

  
  const loginFormValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email field is required'),
    name: Yup.string().min(3, 'Name must be at least 3 characters').required('Name field is required'),

    password: Yup.string().min(3, 'Password must be at least 6 characters').required('Password field is required'),
  });

  
  const handleSubmit = (values:registerFormValues,{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
     const isSuccess=  register(values);
     if (isSuccess) {
      toast.success('You Registered in sucessfully!!...please login to continue')
        navigate('/');
    }
    else{
      toast.error('Something went wrong....')
    }
  } catch (error) {
      console.error("Registration error:", error);
  } finally {
      setSubmitting(false);
  }
    
  };

 

  return (
    <section className='grid h-screen place-items-center'>
      <Formik
        initialValues={{ email: '', password: '' ,name:''}}
        validationSchema={loginFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
            <div className='flex items-center justify-center'>
              <Logo />
              <h4 className='text-center text-3xl font-bold'>Register</h4>
            </div>
            <FormInput name='email' type='text' label='email'/>
            <FormInput name='name' type='text' label='name'/>

            <FormInput name='password' type='password' label='password'/>
            <div className='mt-4'>
              <SubmitBtn text='Register' isSubmitting={isSubmitting}  />
            </div>
            <p className='text-center'>
             Already registered?
              <Link to='/' className='ml-2 link link-hover link-primary capitalize'>
                Login
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Register;
