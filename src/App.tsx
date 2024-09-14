import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Error, Login, Register, Todo } from "./pages"

const router=createBrowserRouter([
  {
    path:'/',
    element:<Login/>,
    errorElement:<Error/>
  },
  {
    path:'/register',
    element:<Register/>,
    errorElement:<Error/>
  },
  {
    path:'/to-do',
    element:<Todo/>,
    errorElement:<Error/>
  }
])



export default function App() {
  return (
    <RouterProvider router={router}/>
  )
}