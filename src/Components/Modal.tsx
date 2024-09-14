import React, { useEffect } from 'react';
import FormInput from './FormInput';
import { Form, Formik } from 'formik';
import SubmitBtn from './SubmitBtn';
import { useAuth } from '../context/user/context';
import { useTasks } from '../context/tasks/context';
import * as Yup from 'yup';
import { EditModalProps, Task } from '../types';

const Modal = ({ taskId, onClose }: EditModalProps) => {
  const { user } = useAuth();
  const username = user ? user.name : '';

  const { editTask, tasks } = useTasks();

  const task = tasks.find(task => task.id === taskId);

  useEffect(() => {
    if (!task) {
      onClose(); 
    }
  }, [task, onClose]);

  const toDoFormValidationSchema = Yup.object({
    title: Yup.string().min(3, 'Title must be at least 3 characters').required('Title field is required'),
    description: Yup.string().min(6, 'Description must be at least 6 characters').required('Description field is required'),
  });

  const handleSubmit = (values: Task, { setSubmitting, resetForm }: { setSubmitting: (isSubmitting: boolean) => void, resetForm: () => void }) => {
    try {
      editTask(values);
      resetForm();
      onClose();
    } catch (error) {
      console.log('something went wrong', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-lg'>
        <p className='text-center text-3xl font-semibold'>Edit Task</p>
        <Formik
          initialValues={{ 
            title: task?.title || '', 
            description: task?.description || '', 
            username: username, 
            id: taskId, 
            completed: task?.completed || false 
          }}
          validationSchema={toDoFormValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className='flex flex-col gap-y-4'>
              <FormInput name='title' type='text' label='Task Title' defaultValue={task?.title}/>
              <FormInput name='description' type='text' label='Task Description'  defaultValue={task?.description} />
              <FormInput name='username' type='hidden' value={username} />
              <div className='mt-4'>
                <SubmitBtn text='Edit Task' isSubmitting={isSubmitting} />
                <button className='btn btn-error btn-block mt-5' onClick={onClose}>Cancel</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Modal;
