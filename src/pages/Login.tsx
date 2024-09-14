import React from 'react';
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import { FormInput, Logo, SubmitBtn } from '../Components';
import { Link, useNavigate } from 'react-router-dom';
import { loginFormValues } from '../types';
import { useAuth } from '../context/user/context';
import { toast } from 'react-toastify';



 
const Login = () => {
  const{login}=useAuth()
  const navigate=useNavigate()
  const loginFormValidationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email field is required'),
    password: Yup.string().min(3, 'Password must be at least 3 characters').required('Password field is required'),
  });

  
  const handleSubmit = (values:loginFormValues,{ setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const isSuccess = login(values);
      if (isSuccess) {
        toast.success('You logged in sucessfully!!')
          navigate('/to-do');
      }
      else{
        toast.error('Invalid credentials')
      }
  } catch (error) {
    console.log('something went wrong');
    
  } finally {
      setSubmitting(false);
  }
    
  };

 

  return (
    <section className='grid h-screen place-items-center'>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
            <div className='flex items-center justify-center'>
              <Logo />
              <h4 className='text-center text-3xl font-bold'>Login</h4>
            </div>
            <FormInput name='email' type='text' label='email'/>
            <FormInput name='password' type='password' label='password'/>
            <div className='mt-4'>
              <SubmitBtn text='Login' isSubmitting={isSubmitting}  />
            </div>
            <p className='text-center'>
              Not a member yet?
              <Link to='/register' className='ml-2 link link-hover link-primary capitalize'>
                Register
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Login;
