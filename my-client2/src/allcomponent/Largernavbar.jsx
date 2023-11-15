import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import { useDashboardContext } from '../pages/DashboardLayout'
import  Navlinks  from './Navlinks'
import logo from '../assets/images/logo.svg'
const Largernavbar = () => {
    const{showsidebar} = useDashboardContext();
  return (
  <Wrapper>
<div className={showsidebar?'sidebar-container show-sidebar':'sidebar-container'}>
<div className="content">
<header>
        <img src={logo} alt="jobify" className='logo'/>
        </header>
        <Navlinks isBigsidebar/>
 
 
</div>
</div>
  </Wrapper>
  )
}

export default Largernavbar