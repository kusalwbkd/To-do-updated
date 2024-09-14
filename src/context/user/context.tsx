import { createContext, useContext, useReducer, useEffect } from "react";
import {  InitialUserStateType, loginFormValues, User, userContextType } from "../../types";
import reducer from "../../reducers/user/reducer";
import { toast } from "react-toastify";

const UserContext = createContext<userContextType | undefined>(undefined);


const loadUserFromLocalStorage = (): User | null => {
  const storedUser = localStorage.getItem("Authuser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: InitialUserStateType = {
  user: loadUserFromLocalStorage()
};

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

 
  const login=({email,password}:loginFormValues):boolean=>{
   
     
      
    let user = JSON.parse(localStorage.getItem('user') || '[]');
   
    
    if (!Array.isArray(user)) {
      user = [user];
      
  }
 const validUser=user.find((u:User)=>u.email===email  && u.password===password )
 
   if(validUser){
      dispatch({type:'login',payload:user})
      localStorage.setItem("Authuser", JSON.stringify(user));
      return true
    
   }else{
    console.log('invalid credentials');
    return false
    
   }
    
  }

  const register = (user: User):boolean => {
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "register", payload: user });
    return true
  };

  const logout = () => {
    localStorage.removeItem("Authuser");
   
    dispatch({ type: "logout" });
    toast.success('You logged out')
  };

  return (
    <UserContext.Provider value={{ ...state, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
