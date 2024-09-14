 import { Formik, Field, Form } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Task } from '../types';
import { useTasks } from '../context/tasks/context';
import Modal from './Modal';

const ShowToDo = ({ title, description, id, completed }: { title: string, description: string, id: string, completed: boolean }) => {
  const toDoFormValidationSchema = Yup.object({
    completed: Yup.bool().oneOf([true])
  });

  const { toggleTask, deleteTask } = useTasks();

  const handleDelete = () => {
    deleteTask(id);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleEditClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };


  return (
    <div className='align-element mt-20'>
      <Formik
        initialValues={{ completed: completed }}
        validationSchema={toDoFormValidationSchema}
        onSubmit={() => {}}
      >
        {({ isSubmitting, values }) => (
          <Form className='card w-96 gap-2 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4'>
            <div className='flex flex-col lg:flex-row gap-5 border-b-2'>
              <div className='flex items-center gap-5'>
                <span className='w-14 h-14 mb-2 p-6 rounded-md bg-blue-300 flex items-center justify-center font-bold overflow-hidden'>
                  {title.charAt(0).toUpperCase()}
                </span>
                <div className='mb-2'>
                  <p className='text-sm font-bold'>{title}</p>
                  <p className='text-sm italic'>
                    {description}
                  </p>
                </div>
              </div>
            </div>
            <div className='flex items-center gap-2 justify-between border-b-2 '>
              <div className='mb-4'>
                <label htmlFor="completed" className="form-check-label">
                  Completed
                </label>
                <Field type="checkbox" name="completed" className="form-check-input" onClick={() => toggleTask(id)} /> 
              
              </div>

              {values.completed ? (
                <span className='p-2 rounded-md flex items-center justify-center bg-green-200 text-green-700 mb-4'>
                  Completed
                </span>
              ) : (
                <span className='p-2 rounded-md flex items-center justify-center bg-red-200 text-red-700 mb-4'>
                  Incomplete
                </span>
              )}
            </div>
            <div className='flex items-center justify-between'>
              <button type='button' className='btn btn-info' onClick={handleEditClick}>Edit</button>
              <button type='button' className='btn btn-error' onClick={handleDelete}>Delete</button>
            </div>
          </Form>
        )}
      </Formik>
      {isModalOpen && (
        <Modal taskId={id} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ShowToDo; 


