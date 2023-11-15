import React from 'react'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa';
import Wrapper from '../assets/wrappers/LogoutContainer';
import { useState } from 'react';
import { useDashboardContext } from '../pages/DashboardLayout';
const Logout = () => {
    const[showlogout,setshowlogout]= useState(false)
    const{user,logout}= useDashboardContext();
  return (
    <Wrapper>
   <button type='button' className='btn logout-btn' onClick={()=>setshowlogout(!showlogout)}>
   {
    user.avatar? (<img src={user.avatar} alt='avatar' className='img' />):(
<FaUserCircle/>
    )
   }
    
    {user?.name}
    <FaCaretDown/>                       
   </button>
   <div className={showlogout?"dropdown show-dropdown":'dropdown'}>
    <button type='button' className='dropdown-btn' onClick={logout}>logout</button>
   </div>
    </Wrapper>
  )
}

export default Logout