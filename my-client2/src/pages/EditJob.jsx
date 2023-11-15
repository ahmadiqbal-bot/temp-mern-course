import React from 'react'

import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useLoaderData, useParams } from 'react-router-dom';

import { Form, useNavigation, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { JOB_TYPE,JOB_STATUS } from '../../../Utlis/Constant';
import custom from '../Until/Customutil';
import { FormRow, FormRowselect, Submit } from '../allcomponent';

export const loader= async({params})=>{
 try {
  const {data}= await custom.get(`/jobs/${params.id}`)
  return data
 } catch (error) {
  toast.error(error?.response?.data?.msg)
  return redirect('/dashboard/alljobs')
 }

}

export const action= async({request,params})=>{
const formdata= await request.formData();
const data= Object.fromEntries(formdata)
  try {
     await custom.patch(`/jobs/${params.id}`,data)
    toast.success('Edit job successfully')
    return redirect('/dashboard/alljobs')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }

}

const EditJob = () => {
  const{job}= useLoaderData()

  return (
   <Wrapper>
    <Form method='post' className='form'>
      <h4 className='form-title'> Edit job</h4>
      <div className="form-center">
        <FormRow type='text' name='position' defaultValue={job.position} />
        <FormRow type='text' name='company' defaultValue={job.company} />
        


        <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            defaultValue={job.jobLocation}
          />
          
      <FormRowselect name='jobStatus' defaultValue={job.jobStatus} list={Object.values(JOB_STATUS)} labelText='jobStatus'/>
      <FormRowselect
  name='jobtype'
  labelText='jobtype'
  defaultValue={job.jobType}
  list={Object.values(JOB_TYPE)}
  />

  <Submit userbtn/>
      </div>

    </Form>
   </Wrapper>
  )
}

export default EditJob