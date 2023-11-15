import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';
import { JOB_STATUS, JOB_TYPE } from '../../../Utlis/Constant'
import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FormRow, FormRowselect, Submit } from '../allcomponent';
import custom from '../Until/Customutil';
 
export const action= async({request})=>{
const formData= await request.formData();
const data = Object.fromEntries(formData)

try {
  await custom.post('/jobs',data)
  toast.success("job added successfully")
  return redirect('alljobs')
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return error
}
}
const AddJob = () => {
  const{user}= useOutletContext()

  return (
   <Wrapper>
    <Form method='post' className='form'>
      <h4 className='form-title'>Add jobs</h4>
       <div className="form-center">
       <FormRow type='text' name='position' />
          <FormRow type='text' name='company' />
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={user.location}
          />
          
      <FormRowselect name='jobStatus' defaultValue={JOB_STATUS.PENING} list={Object.values(JOB_STATUS)} labelText='jobStatus'/>
      <FormRowselect
  name='jobtype'
  labelText='jobtype'
  defaultValue={JOB_TYPE.FULL_TIME}
  list={Object.values(JOB_TYPE)}
  />
       <Submit userbtn/>
       </div>

    </Form>
   </Wrapper>
  )
}

export default AddJob