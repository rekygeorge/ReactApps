import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


const PasswordInput = ({value, onChange , placeholder}) => {
  
  const [isShadowPassword, setIsShadowPassword] = useState(false)
  
  const toggleShadowPassword = () => {
    setIsShadowPassword(!isShadowPassword);
  };

    return (
    <div className='flex items-center bg-transparent border-[1.5px] px-5 rounded mb-3'>
        <input 
        value={value}
        onChange={onChange}
        type={isShadowPassword ? 'text' : 'password'}  
        placeholder={placeholder || "Password"}  
        className="w-full text-sm bg-transparent py-3 mr-3 rounded outline-none"
        />

        {isShadowPassword ? <FaRegEye
           size={22}
           className="text-primary cursor-pointer"
           onClick={() => toggleShadowPassword()}
        /> : <FaRegEyeSlash
            size={22}
            className="text-slate-400 cursor-pointer"
            onClick={() => toggleShadowPassword()}
            />}
    </div>
  )
}

export default PasswordInput