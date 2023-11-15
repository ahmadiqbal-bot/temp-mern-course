import React from 'react'
import Wrapper from '../assets/wrappers/SmallSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import logo from '../assets/images/logo.svg'
import { FaTimes } from 'react-icons/fa'
import links from '../Until/Links'
import { NavLink } from 'react-router-dom'
import  Navlinks  from './Navlinks'
const Smallsidebar = () => {
 const {showsidebar,tooglesidebar}= useDashboardContext()
 
  
  return (
    <Wrapper>
<div className={showsidebar?"sidebar-container show-sidebar":'sidebar-container'}>
    <div className="content">
        <button type='button' className='close-btn' onClick={tooglesidebar}><FaTimes/></button>
        <header>
        <img src={logo} alt="jobify" className='logo'/>
        </header>
        <Navlinks/>
    </div>
</div>

    </Wrapper>
  )
}

export default Smallsidebar