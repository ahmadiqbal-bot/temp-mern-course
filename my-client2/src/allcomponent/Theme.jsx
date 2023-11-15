import React from 'react'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashboardContext } from '../pages/DashboardLayout';
const Theme = () => {
    const{isdarktheme,toogleid}= useDashboardContext();
  return (
    <Wrapper onClick={toogleid}>
        {isdarktheme?<BsFillSunFill className='toogle-icon'/>:<BsFillMoonFill/>}
    </Wrapper>
  )
}

export default Theme