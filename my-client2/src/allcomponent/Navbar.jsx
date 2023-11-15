import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import {FaAlignLeft} from 'react-icons/fa'
import logo from '../assets/images/logo.svg'
import { useDashboardContext } from '../pages/DashboardLayout'
import Logout from './Logout'
import Theme from './Theme'
const Navbar = () => {
    const{tooglesidebar}= useDashboardContext();
  return (
    <Wrapper>
        <div className="nav-center">
            <button className='toggle-btn' onClick={tooglesidebar}><FaAlignLeft/></button>
            <div>
            <img src={logo} alt="jobify" className='logo'/>
            <h4 className='logo-text'>Dashboard</h4>
          
            </div>
            <div className="btn-container">
              <Theme/>
              <Logout/></div>
        </div>

    </Wrapper>
  )
}

export default Navbar