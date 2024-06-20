import React, { useState } from 'react'
import { BsArrowLeftShort,
         BsSearch, 
         BsChevronDown,
         BsFillImageFill,
         BsReverseLayoutTextSidebarReverse,
         BsPerson,
         } from "react-icons/bs";
import { AiFillEnvironment,
        AiOutlineFileText,
        AiOutlineBarChart,
        AiOutlineMail,
        AiOutlineSetting,
        AiOutlineLogout,
 } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar.jsx/Sidebar';


const App = () => {

  const [open, setOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)

  const Menus = [
    { title : 'Dashboard'},
    { title : 'Pages', icon : <AiOutlineFileText/>},
    { title : 'Media', spacing: true , icon : <BsFillImageFill/>},
    {
      title : 'Projects',
      icon : <BsReverseLayoutTextSidebarReverse/>,
      submenu : true,
      submenuItems : [
        { title : 'Submenu 1'},
        { title : 'Submenu 2'},
        { title : 'Submenu 3'},
        { title : 'Submenu 4'},
      ],
    },
    { title : 'Analytics', icon : <AiOutlineBarChart/>},
    { title : 'Inbox' , icon : <AiOutlineMail/>},
    { title : 'Profile', spacing: true , icon : <BsPerson/>},
    { title : 'Settings', icon : <AiOutlineSetting/>},
    { title : 'Logout', icon : <AiOutlineLogout/>},

  ];

  return (
      <>
      <Navbar/>
      <div className='flex'>
        <Sidebar />
        <div className='p-7'>
          <h1 className='text-2xl font-semibold'>Home Page</h1>
          </div>
      </div>
      </>
  ) 
}

export default App