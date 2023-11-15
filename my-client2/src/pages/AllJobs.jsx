
import { toast } from 'react-toastify';
import { JobContainer,SearchContainer } from '../allcomponent';
import { useLoaderData } from 'react-router-dom';
import { useContext, createContext } from 'react';
import custom from '../Until/Customutil';

export const loader= async ({request})=>{
console.log(request.url);
const params= Object.fromEntries([
  ...new URL(request.url).searchParams.entries()
])

try {
  const{data}= await custom.get('/jobs',{
    params,
  })
  return {data,searchValues:{...params}}
} catch (error) {
  toast.error(error?.response?.data?.msg)
  return error
}


}
const context = createContext();  
const AllJobs = () => {
  const{data,searchValues}= useLoaderData();
  return(
   <context.Provider value={{data,searchValues}}>
   <SearchContainer/>
  <JobContainer/>
 
  </context.Provider>
)}
export const usealljobcontext=()=> useContext(context);
export default AllJobs