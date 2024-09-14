import React, { useEffect } from 'react';
import { useAuth } from '../context/user/context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AddToDo, Header, Navbar, ShowToDo } from '../Components';
import { useTasks } from '../context/tasks/context';

const Todo = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { tasks } = useTasks();
  const username = Array.isArray(user) ? user[0].name : user?.name;

  const userTasks = tasks.filter(task => task.username === username);

  useEffect(() => {
    if (user === null) {
      toast.error('Please login to continue');
      navigate('/'); 
    }
  }, [user, navigate]);

  if (user === null) {
    return null; 
  }

  useEffect(() => {
    if (userTasks.length < 1) {
      toast.warning('You do not have any To-Dos...please add some');
    }
  }, [tasks]);



  return (
    <>
      <Header username={username} logout={logout} />
      <Navbar />
      <AddToDo />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
        {userTasks.map((item) => (
          <ShowToDo 
            key={item.id}
            title={item.title}      
            id={item.id}
            description={item.description} 
            completed={item.completed}
          />
        ))}
      </div>
    </>
  );
};

export default Todo;



