import React from 'react'
import { User } from '../types'
import { redirect, useNavigate } from 'react-router-dom';

const Header = ({username,logout}:{username:string,logout:any}) => {
  
    console.log("from header:",username);
    const navigate=useNavigate()
    const handleLogout=()=>{
     logout()
      navigate('/')
    }

  return (
    <header className='bg-neutral py-2 text-neutral-content'>
        <div className='align-element flex justify-center sm:justify-end'>
        <div className='flex gap-x-2 sm:gap-x-8 items-center'>
            <p className='text-xs sm:text-sm'>Hello, {username}</p>
            <button
              className='btn btn-xs btn-outline btn-primary'
              onClick={handleLogout}
            >
              logout
            </button>
          </div>
        </div>
    </header>
  )
}

export default Header