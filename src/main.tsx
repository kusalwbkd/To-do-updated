import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/user/context.tsx'
import { TaskProvider } from './context/tasks/context.tsx';

createRoot(document.getElementById('root')!).render(
  <UserProvider>
    <TaskProvider>
    <App />
    <ToastContainer position='top-center' />
    </TaskProvider>

  </UserProvider>
   
)
