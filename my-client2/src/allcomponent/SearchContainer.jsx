import { FormRow, FormRowselect, Submit } from '.';
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../../../Utlis/Constant';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { Form, useSubmit, Link } from 'react-router-dom';
import { usealljobcontext } from '../pages/AllJobs';




const SearchContainer = () => {
  const {searchValues}= usealljobcontext()
  const{search,jobStatus,jobtype,sort}= searchValues
  const submit= useSubmit();


  const debounce=(onChange)=>{
    let timeout;
    return (e)=>{
      const form = e.currentTarget.form;
      clearTimeout(timeout)
      timeout= setTimeout(()=>{
        onChange(form)
      },2000)
   
   
    }
  }
  return (
    <Wrapper>
      <Form className='form' >
        <h5 className="form-title">Search job</h5>
        <div className="form-center">
          
            <FormRow type='search' name='search' defaultValue={search} onChange={debounce((form)=>{
              submit(form)
            })}/>
            <FormRowselect labelText='jobStatus'
             name='jobStatus'
              list={['all',...Object.values(JOB_STATUS)]} 
              defaultValue={jobStatus}
              onChange={(e)=>{submit(e.currentTarget.form)
              }}
              
              />
            <FormRowselect labelText='jobtype'
             name='jobtype' 
             list={['all',...Object.values(JOB_TYPE)]} 
             defaultValue={jobtype}
             onChange={(e)=>{submit(e.currentTarget.form)}}
             />
             <FormRowselect name='sort' defaultValue={sort} list={[...Object.values(JOB_SORT_BY)]}
             onChange={(e)=>{submit(e.currentTarget.form)}}
             />
             <Link to='/dashboard/alljobs' className='btn form-btn delete-btn'>
              reset search values
             </Link>
            
          
        </div>

      </Form>
    </Wrapper>
  )
}

export default SearchContainer