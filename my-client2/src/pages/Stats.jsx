import { useLoaderData } from "react-router-dom"
import custom from "../Until/Customutil"
import { Chartcontainer, StatsContainer } from "../allcomponent"
export const loader= async()=>{
try {
  const response = await custom.get('/jobs/stats')
  return response.data
} catch (error) {
  return error
}
}

const Stats = () => {
  const{defaultjob,monthapplication}= useLoaderData()
  return (
    <>
    <StatsContainer defaultjob={defaultjob}/>
    {
     monthapplication?.length > 1 &&(
     <Chartcontainer data={monthapplication} />)
    }
    </>
  )
}

export default Stats


