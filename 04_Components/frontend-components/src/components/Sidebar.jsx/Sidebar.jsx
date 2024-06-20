import React from 'react'

const Sidebar = () => {
  return (
    <div className={`bg-dark-purple h-screen p-5 pt-8 ${open ? 'w-72' : 'w-20'} relative transition-width ease-in-out duration-300 `}>
          <BsArrowLeftShort className={`bg-white text-dark-purple text-3xl 
            rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />

          <div className='inline-flex'>
            <AiFillEnvironment className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-1000 ${open && 'rotate-[360deg]'}`} />
            <h1 className={`text-white origin-left font-medium text-2xl transition-width ease-in-out duration-300 ${!open && 'scale-0'}`}>Tailwind</h1>
          </div>

          <div className={`flex items-center rounded-md bg-light-white mt-6 ${!open ?'px-2.5' : 'px-4'} py-2`}>
            <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && 'mr-2'}`} />
            <input type='search' placeholder='Search' className={`text-base bg-transparent w-full text-white focus:outline-none ml-2 ${!open && 'hidden'}`} />
          </div>

          <ul className='pt-2'>
            {Menus.map((menu, index) => (
              <>
                <li key={index} className={`text-gray-300 text-sm flex items-center gap-x-4 p-2
                                            hover:bg-light-white rounded-md ${menu.spacing ? 'mt-9' : 'mt-2'} `}>
                  <span className='text-2xl block float-left'>
                    {menu.icon ? menu.icon :  < RiDashboardFill />}
                  </span>
                  <span className={`text-base font-medium flex-1 duration-200 ${!open && 'hidden'}`}>{menu.title}
                  </span>
                  {menu.submenu && open && (<BsChevronDown className={`${submenuOpen && 'rotate-180'}`} onClick={() => 
                    setSubmenuOpen(!submenuOpen)}/>
                )}
                </li>

                {menu.submenu && submenuOpen && open &&  (
                  <ul>
                    {menu.submenuItems.map((submenuItem, index) => (
                      <li key={index} className='text-gray-300 text-sm flex items-center gap-x-4
                                                  cursor-pointer p-2 px-5 hover:bg-light-white rounded-md'>
                        {submenuItem.title}
                      </li>
                    ))}
                  </ul>
                )}
                
                </>
              ))}
          </ul>

        </div>
  )
}

export default Sidebar