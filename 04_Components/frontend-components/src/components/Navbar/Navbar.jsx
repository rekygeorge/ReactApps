import React, { useEffect, useRef, useState } from 'react'
import { FaRobot, FaLayerGroup, FaRegUserCircle  } from "react-icons/fa";
import {  CiMail , CiDark } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { MdLogin , MdDarkMode , MdOutlineLightMode } from "react-icons/md";
import { IoHelpCircleOutline } from "react-icons/io5";
import { FaChevronRight } from "react-icons/fa";
import { BiToggleLeft } from "react-icons/bi";
import { CgToggleOn } from "react-icons/cg";
import { RiToggleFill } from "react-icons/ri";
import { TiTick } from "react-icons/ti";


const Navbar = () => {
    const [heading, setHeading] = useState('Paraphrasing Tool');
    const [darkMode, setDarkMode] = useState(false);
    const [languageVisibility, setLanguageVisibility] = useState(false);
    const [navbarDropdown, setNavbarDropdown] = useState(false);


    const navbarRef = useRef(); 
    const languageListRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            
            if (navbarRef.current && !navbarRef.current.contains(event.target)) {
                setNavbarDropdown(false); // Step 4
                setLanguageVisibility(false);
            }
        }

        // Step 3: Add the event listener
        console.log("Adding event listener")
        document.addEventListener("mousedown", handleClickOutside, false);

        // Step 5: Clean up
        return () => {
            console.log("Cleaning up")
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []); // Ensure the effect runs only once


    function changeHeading(){
        console.log('clicked')  
    };

    // console.log('languageVisibility :' ,languageVisibility)

  return (
    <div  ref={navbarRef} >
    
        <div className='navbar-list flex border justify-between relative'>
            <div className='flex h-10 items-center'>  
                <FaLayerGroup className="text-5xl p-2"/>    
                <FaRobot className="text-5xl p-2"/>
                <h3 className="text-3xl p-2">Quill<strong>Bot</strong></h3>
            </div>

            <div className='flex h-10 items-center '>
                <h3 className="text-3xl p-2"><strong>{heading}</strong></h3>    
            </div>

            <div className='flex h-10 items-center '>
                <button className='bg-green-800 p-1 rounded-lg text-white pl-4 pr-4'><strong>Upgrade to Premium</strong></button>
                <FaRegUserCircle className="text-5xl p-2 cursor-pointer"  
                    onClick={() => {setNavbarDropdown(!navbarDropdown); setLanguageVisibility(false)}} />
            </div>
        </div>
    
        <div  className={`absolute border shadow-sm w-52 top-10.5 right-2 rounded-2xl ${!navbarDropdown && 'hidden'}`}>
            <ul>
                <li className='flex items-center p-3 cursor-pointer rounded-t-2xl hover:bg-slate-200'>
                    <MdLogin  className='mr-2 text-2xl font-bold'/>
                    Log in / Sign up
                </li>
                <li className='flex justify-between items-center p-3 border-t-2 border-b-2 cursor-pointer hover:bg-slate-200'
                                onMouseEnter={() => {setLanguageVisibility(true)}}
                                onClick={() => {setLanguageVisibility(!languageVisibility)}}
                                // onMouseLeave={() => {setLanguageVisibility(false)}}
                                >
                    <div className='flex'>
                        <TbWorld  className='mr-2 text-2xl font-bold'/>
                        English
                    </div>
                    <div>
                    <FaChevronRight  className='mr-2 text-2xl font-bold justify-end' />
                    </div>
                </li>
                <li className='flex justify-between items-center p-3 border-b-2 cursor-pointer hover:bg-slate-200' onClick={ () => setDarkMode(!darkMode)}>
                    <div className='flex'> 
                        {darkMode ?  <MdDarkMode  className='mr-2 text-2xl font-bold'/> : < MdOutlineLightMode  className='mr-2 text-2xl font-bold'/> }
                        {darkMode ?  'Dark' : 'Light'} Mode
                    </div>
                    <div>
                        {darkMode ?   <CgToggleOn className='mr-2 text-2xl font-bold'/> : <RiToggleFill className='mr-2 text-2xl font-bold'/> }
                    </div>
                </li>   
                <li className='flex items-center p-3 border-b-2 cursor-pointer hover:bg-slate-200'>
                    <IoHelpCircleOutline  className='mr-2 text-2xl font-bold'/>
                    Help Center
                </li>
                <li className='flex items-center p-3 rounded-b-2xl cursor-pointer hover:bg-slate-200'>
                    <CiMail  className='mr-2 text-2xl font-bold'/>
                    Contact us
                </li>
            </ul>
        </div>

        <div ref = {languageListRef} className={`language-list absolute border shadow-sm w-52 top-10 right-10 mt-12 mr-44 rounded-2xl transition-opacity ease-in-out duration-500  
                        ${languageVisibility ? 'opacity-100 visible' : 'opacity-0 invisible'} `}>
            <ul>
                <li className='flex justify-between border-b-2 items-center p-3 cursor-pointer rounded-t-2xl hover:bg-slate-200' onMouseMove  ={()=> {changeHeading()}}>
                    <div>English</div>
                    <TiTick key='english' className='ml-2 text-3xl font-bold text-green-400 ' />
                    </li>
                <li className='flex justify-between border-b-2 items-center p-3 cursor-pointer hover:bg-slate-200'>
                    <div>Spanish</div>
                    <TiTick key='english' className='ml-2 text-3xl font-bold text-green-400 ' />
                </li>
                <li className='flex justify-between border-b-2 items-center p-3 cursor-pointer hover:bg-slate-200'>
                    <div>French</div>
                    <TiTick key='english' className='ml-2 text-3xl font-bold text-green-400 ' />
                </li>
                <li className='flex justify-between items-center p-3 cursor-pointer rounded-b-2xl hover:bg-slate-200'>
                    <div>Tamil</div>
                    <TiTick key='english' className='ml-2 text-3xl font-bold text-green-400 ' />
                </li>
            </ul>
        </div>
    </div>
  )
}

export default Navbar