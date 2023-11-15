import { FaSuitcaseRolling, FaCalendarCheck } from 'react-icons/fa';
import { useLoaderData, redirect } from 'react-router-dom';
import Wrapper from '../assets/wrappers/StatsContainer';
import { toast } from 'react-toastify';
import custom from '../Until/Customutil';
import { StateItem } from '../allcomponent';

export const loader=  async()=>{
  try {
    const response= await custom.get('/users/admin/app-stats');
    return response.data;
  } catch (error) {
    toast.error("user is not authorized for this page")
    return redirect('/dashboard')

  }
}


const Admin = () => {
  const{user,job}= useLoaderData();
  return (
   <Wrapper>
    <StateItem title='current user' count={user} color='pink' bcg='orange' icon={<FaSuitcaseRolling/>}/>
    <StateItem title='total jobs' count={job} color='blue' bcg='orange' icon={<FaCalendarCheck/>}/>
   </Wrapper>
  )
}

export default Admin