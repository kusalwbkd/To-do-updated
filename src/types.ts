export interface FormInputProps{
    name: string;
    type: string;
    label?: string;
    defaultValue?: string;
    value?:string
}

export type registerFormValues={
    email:string,
    password:string,
    name:string
  }

  export type loginFormValues={
    email:string,
    password:string
  }

  
export type User={
    name:string,
    email:string,
    password:string
}
export type Task = {
  id:string,
    title: string;
    description: string;
    username:string;
    completed:boolean
   
};

export type userContextType = {
  user: User | null;
  
  login: (user: loginFormValues) => boolean;
  logout: () => void;
  register: (user: User) => boolean;

};

export type taskContextType={
  tasks:Task[]
  editTask:(task:Task)=>void,
  toggleTask:(taskId:string)=>void
  deleteTask:(taskId:string)=>void
  addTask:(task:Task)=>void
}

export type InitialUserStateType = {
    user:User[]|null
 
  };

  export type InitialTasksStateType = {
    tasks:Task[],
    
 
  };

 export type userState={
    user:User|null
    }
    
 export type userAction =
      
      | { type: 'login'; payload: registerFormValues }
      | { type: 'register'; payload: registerFormValues }
      | { type: 'logout' }

      export type taskState={
        tasks:Task[]
        }
        
     export type taskAction =
          
          | { type: 'edit';  payload:Task }
          | { type: 'delete';  payload: {taskId:string} }
          | { type: 'add' ;payload:Task}
          | { type: 'toggle' ;payload:{taskId:string} }

export type EditModalProps= {
  taskId: string;
  onClose: () => void;
  }

