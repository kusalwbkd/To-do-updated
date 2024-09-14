import React from 'react'
import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const Navbar = () => {
  return (
    <nav className='bg-base-200'>
    <div className='navbar align-element '>
      <div className='navbar-start'>
        {/* Title */}
        <NavLink
          to={'/to-do'}
          className=' lg:flex  items-center  w-14 '
        >
         <Logo/>
        </NavLink>
        {/* DROPDOWN */}
      
      </div>
 
      <div className='navbar-center text-center items-center'>
       <h1 className=' text-3xl font-semibold'>Your To Do app</h1>
     
      </div>
    </div>
  </nav>
  )
}

export default Navbar