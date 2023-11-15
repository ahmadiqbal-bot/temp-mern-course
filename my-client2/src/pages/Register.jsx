import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import logo from '../assets/images/logo.svg'
import Wrapper from '../assets/wrappers/RegisterAndLoginPage'
import custom from '../Until/Customutil.js';
import {toast} from 'react-toastify'


export const action= async ({request})=>{
const formData= await request.formData();
const data= Object.fromEntries(formData)

try {
 await custom.post('/auth/register',data)
 toast.success("registration successfully")
  return redirect('/login');
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return error;
  
}

}
const Register = () => {
  const navigation= useNavigation();
  const issubmitted= navigation.state==='issubmitted'
  
  return (
    <Wrapper>
    <Form method='post' className='form'>
    <img src={logo} alt="jobify" className='logo'/>
    <h4>Register</h4>
    <div className='form-row'>
      <label htmlFor='name' className='form-label'>    name
      </label>
      <input type='text'  name='name'  className='form-input' required/>
      <label  className='form-label'>    lastName
      </label>
      <input type='text' name='lastname'  className='form-input' required/>
      <label  className='form-label'>    Email
      </label>
      <input type='email' name='email'   className='form-input' required/>
      <label  className='form-label'> PassWord
      </label>
     <input type='password' name='password' className='form-input' />
       <label  className='form-label'> location
      </label>
     <input type='text' name='location' className='form-input' />
    </div>
    
    <button type='submit' className='btn btn-block' disabled={issubmitted}>{issubmitted?'issubmitting':"submit"}</button>
    <p>
      Already a member?
        <Link to='/login'>Login</Link>
      `
    </p>
    </Form>
   
    </Wrapper>
  )
}

export default Register