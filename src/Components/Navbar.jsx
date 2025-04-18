import React from 'react'
import { Menu , UserPen , KeyRound } from 'lucide-react';
import { useState } from 'react';
import Picture from '../assets/react.svg'
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        console.log('Menu clicked');
        setMenuOpen(!menuOpen);
    };

  return (
    <div className='bg-gray-500 sticky text-white flex justify-between items-center p-4'>
        <div className='flex items-center gap-2'>
           <Link to="/" > <img src={Picture} alt="" /></Link>
            <h1 className='text-xl font-bold lg:text-2xl hidden md:block lg:block'>Secure Notes App</h1>
        </div>
        
        {/* <div className="hidden lg:flex items-center gap-4">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full px-3 py-1 rounded-full text-black placeholder:text-gray-700 bg-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-300 shadow-md focus:ring-opacity-50"
                                />
                            </div> */}
            <>
            <div className="flex items-center gap-4">
                         
            <div className=" hidden items-center bg-black text-white rounded-3xl px-4 py-2  lg:flex overflow-hidden hover:bg-gray-400 hover:cursor-pointer gap-2">   
                <KeyRound className='text-xl'/>           
                    <button className=''>Login</button>
                </div> 
            <Menu onClick={toggleMenu} className='bg-gray-200  text-black lg:hidden hover:cursor-pointer'/>
                <div>
                   <Link to="/Create"> <UserPen className='hover:text-black'/>  
                   </Link>
                   
                </div>
                    <ul className={`lg:flex space-x-4 ${menuOpen ? "block" : "hidden"} absolute lg:static bg-black lg:bg-transparent top-16 left-0 w-full lg:w-auto p-4 lg:p-0`}>
                    <Link to="/" className='hover:bg-gray-400 p-2 rounded-lg'>Home </Link>                 
                    <li className='hover:bg-gray-400 p-2 rounded-lg'>About</li>
                    <li className='hover:bg-gray-400 p-2 rounded-lg'>Contact</li>    
                    <li className='hover:bg-gray-400 p-2 rounded-lg'>Login</li>    
                    </ul>
                    
                </div>
                </>
    </div>
  )
}

export default Navbar
