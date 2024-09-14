import {  taskAction, taskState, userAction, userState } from "../../types"



const reducer=(state:taskState,action:taskAction):taskState=>{

    switch(action.type){
        case 'add':
         
           
        return { ...state, tasks: [...state.tasks, action.payload] };

        case 'toggle':
            const updatedTasks = state.tasks.map(task => 
                task.id === action.payload.taskId
                    ? { ...task, completed: !task.completed } 
                    : task
            );
        
            return { ...state, tasks: updatedTasks };
        
        case 'delete':
            const newTasks=state.tasks.filter((task)=>task.id !== action.payload.taskId)
            return{...state,tasks:newTasks};
        
        case 'edit':
            const editedTasks = state.tasks.map(task => 
                task.id === action.payload.id
                    ? { ...task, title: action.payload.title,description:action.payload.description } 
                    : task
            );
        
            return { ...state, tasks: editedTasks };
    }
    return state
}

export default reducer