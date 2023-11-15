import React from 'react'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import logo from '../assets/images/logo.svg'
import { Form, redirect, useNavigation, Link, useActionData, useNavigate } from 'react-router-dom';
import custom from '../Until/Customutil.js';
import {toast} from 'react-toastify'




export const action= async ({request})=>{
  const formDdata= await request.formData();
  const data= Object.fromEntries(formDdata)
  const errors= {msg:''};
  // if(errors.password.length <3){
  //   errors.msg="password is short"
  //   return errors;
  // }

  try {
     await custom.post('/auth/login',data)
     toast.success("login successfully")
    return redirect('/dashboard')
  } catch (error) {
     toast.msg(error?.response?.data?.msg)
  //  errors.msg = error.response.data.msg;
    return errors
  }
} 


const Login = () => {
  const navigation= useNavigation();
  const issubmitted= navigation.state=== 'submitting'
  const errors= useActionData()
const navigate= useNavigate()
  const logindemo= async()=>{
    const data = {
      email: 'ahmi2@gmail.com',
      password: '12345678',
    };
try {
  await custom.post('/auth/login',data)
     toast.success("Take a test drive")
     return navigate('/dashboard')
} catch (error) {
  toast.msg(error?.response?.data?.msg)
  return error
}
  }
  return (
    <Wrapper>
      <Form method='post' className='form'>
      <img src={logo} alt="jobify" className='logo'/>
      <h4>Login</h4>
      {errors && <p style={{ color: 'red' }}>{errors.msg}</p>}
      <div className='form-row'>
      <label  className='form-label'>    email
      </label>
      <input type='email' name= 'email' className='form-input' required/>
      <label  className='form-label'>   Password
      </label>
      <input type='password'  name= 'password' className='form-input' required/>
    </div>
    <button type='submit' className='btn btn-block' disabled={issubmitted}>{issubmitted?"issubmitting":"submit"}</button>
    <button type='button' className='btn btn-block' onClick={logindemo}>
          explore the app
        </button>
    <p>
      Not a member?
        <Link to='/register' className='member-btn'> Register </Link>
       
      
    </p>
  
      </Form>
    </Wrapper>
  )
}

export default Login