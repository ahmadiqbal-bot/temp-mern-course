
import React from 'react'
import styled from 'styled-components'
import logo from '../assets/images/logo.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import main from '../assets/images/main.svg'
import { Link } from 'react-router-dom'
const Landing = () => {
  return (
    <Wrapper>
  <nav>
   <img src={logo} alt="jobify" className='logo'/>
  </nav>
    <div className="container page">
      <div className="info">
        <h2>Job <span className='span'>traking</span> web</h2>
        <p>
        It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
        </p>
        <Link to='/register' className='btn register-link'>register</Link>
        <Link to='/login' className='btn'>login or demo</Link>
      </div>
      <img src={main} alt='jobify' className='img main-img'/>
    </div>
    </Wrapper>
  )
}

export default Landing