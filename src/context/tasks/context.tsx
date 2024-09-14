import { createContext, useContext, useReducer, useEffect } from "react";
import { InitialTasksStateType, Task, taskContextType } from "../../types";
import reducer from "../../reducers/tasks/reducer";
import { toast } from "react-toastify";

const TaskContext = createContext<taskContextType | undefined>(undefined);

const loadTasksFromLocalStorage = (): Task[] => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const initialState: InitialTasksStateType = {
  tasks: loadTasksFromLocalStorage(),
 
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addTask = (task: Task) => {
    dispatch({ type: 'add', payload: task });
 

    
    toast.success('Task added successfully');
  };

  const editTask = (task: Task) => {
    dispatch({ type: 'edit', payload: task });
   
    
    toast.success('Task edited successfully');
  };

  const deleteTask = (taskId: string) => {
    dispatch({ type: 'delete', payload: { taskId } });
    toast.success('Task deleted successfully');
  };

  const toggleTask=(taskId:string)=>{
    
    
    dispatch({ type: 'toggle', payload: {taskId} });
    
    toast.success('Task status changed successfully');
  }

  useEffect(()=>{
    localStorage.setItem('tasks', JSON.stringify(state.tasks))

  },[state.tasks])
  return (
    <TaskContext.Provider value={{ ...state, addTask, editTask, deleteTask,toggleTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
