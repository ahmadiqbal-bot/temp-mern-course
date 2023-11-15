import React from 'react'
import Job from './Job'
import Wrapper from '../assets/wrappers/JobsContainer'
import { usealljobcontext } from '../pages/AllJobs'
import Pagebtn from './Pagebtn'


const JobContainer = () => {
    const {data}= usealljobcontext()
    const {jobs,totaljobs,numofpages} = data;
    if(jobs.length === 0){
        return(
        <Wrapper>
            <h3>No job found</h3>
        </Wrapper>
    )}
  return (
    <Wrapper>
        <h5>{totaljobs} job {jobs.length > 1 && 's'} found</h5>
        <div className="jobs">
            {
                jobs.map((job)=>{
                    return <Job key={job._id} {...job} />
                })
            }
        </div>
        {numofpages > 1 && <Pagebtn/>}
    </Wrapper>
  )
}

export default JobContainer