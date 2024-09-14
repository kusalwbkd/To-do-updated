


/* import React from 'react';
import * as Yup from 'yup';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { Formik, Form } from 'formik';
import { Task } from '../types';
import { useAuth } from '../context/user/context';
import { useTasks } from '../context/tasks/context';

const AddToDo = () => {
  const { user } = useAuth();
  const { addTask } = useTasks();
  const username = user ? user.name : '';

  const toDoFormValidationSchema = Yup.object({
    title: Yup.string().min(3, 'Title must be at least 3 characters').required('Title field is required'),
    description: Yup.string().min(6, 'Description must be at least 6 characters').required('Description field is required'),
  });

  const handleSubmit = (values: Omit<Task, 'id'>, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }) => {
    try {
      const newTask: Task = {
        ...values,
        id: crypto.randomUUID(),
     
      };
      addTask(newTask);
     
    } catch (error) {
      console.log('something went wrong', error);
    } finally {
      setSubmitting(false);
      resetForm();
    }
  };

  return (
    <div className='align-element mt-20'>
      <Formik
        initialValues={{ title: '', description: '', username: username,id:'',completed:false }}
        validationSchema={toDoFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='card w-full p-8 bg-base-100 shadow-lg flex flex-col lg:flex-row gap-y-4 lg:justify-between lg:items-center'>
            <FormInput name='title' type='text' label='Task Title' />
            <FormInput name='description' type='text' label='Task Description' />
            <FormInput name='username' type='hidden' value={username} />
            <div className='mt-4'>
              <SubmitBtn text='Add Task' isSubmitting={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddToDo;
 */


import React from 'react';
import * as Yup from 'yup';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { Formik, Form } from 'formik';
import { Task } from '../types';
import { useAuth } from '../context/user/context';
import { useTasks } from '../context/tasks/context';

const AddToDo = () => {
  const { user } = useAuth();
  const { addTask } = useTasks();
  const username = Array.isArray(user) ? user[0].name : user?.name;
console.log("from add to",username);

  const toDoFormValidationSchema = Yup.object({
    title: Yup.string().min(3, 'Title must be at least 3 characters').required('Title field is required'),
    description: Yup.string().min(6, 'Description must be at least 6 characters').required('Description field is required'),
  });

  const handleSubmit = (values: Omit<Task, 'id'>, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }) => {
    try {
      const newTask: Task = {
        ...values,
        id: crypto.randomUUID(),
        completed: false,
        username:username
      };
      addTask(newTask);
      resetForm(); 
    } catch (error) {
      console.log('something went wrong', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='align-element mt-20'>
      <Formik
        initialValues={{ title: '', description: '', username:'' ,id:'',completed:false }}
        validationSchema={toDoFormValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className='card w-full p-8 bg-base-100 shadow-lg flex flex-col lg:flex-row gap-y-4 lg:justify-between lg:items-center'>
            <FormInput name='title' type='text' label='Task Title' />
            <FormInput name='description' type='text' label='Task Description' />
         

            <div className='mt-4'>
              <SubmitBtn text='Add Task' isSubmitting={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddToDo;
