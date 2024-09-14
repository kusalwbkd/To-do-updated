import {  userAction, userState } from "../../types"



const reducer=(state:userState,action:userAction):userState=>{

    switch(action.type){
        case 'register':
           
            return { ...state, user: action.payload };
        case 'login':
            return{...state,user:action.payload};
        
        case 'logout':
            return{...state,user:null};
    }
    return state
}

export default reducer