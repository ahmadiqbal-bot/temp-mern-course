import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import Wrapper from '../assets/wrappers/Dashboard'
import { Navbar, Smallsidebar,Largernavbar } from '../allcomponent'
import {useState,createContext,useContext} from 'react'
import custom from '../Until/Customutil';
import { toast } from 'react-toastify';



 export const loader= async ()=>{
  try {
    const {data}= await custom.get('/users/current-user')
    return data
  } catch (error) {
   return redirect('/')    
  }

}
const Dashboard = createContext();
const DashboardLayout = ({isdarktheme2}) => {
  const {user}= useLoaderData();
  
  const navigate = useNavigate();
 

const[showsidebar,setshowsidebar]= useState(false)
const[isdarktheme,setisdarktheme]= useState(isdarktheme2)

const toogleid=()=>{
  const newdark= !isdarktheme;
  setisdarktheme(newdark);
  document.body.classList.toggle('dark-theme',newdark)
  localStorage.setItem('darkTheme',newdark)
}
const tooglesidebar=()=>{
  setshowsidebar(!showsidebar)
}
const logout= async ()=>{
 navigate('/')
 await custom.get('/auth/logout');
 toast.success('logout successfully');

 }


  return (
   <Dashboard.Provider value={{
    user,isdarktheme,tooglesidebar,logout,showsidebar,toogleid
   }}>
    <Wrapper>
      <main className='dashboard'>
        <Largernavbar/>
        <Smallsidebar/>
         <div>
          <Navbar/>
          <div className='dashboard-page'>
           <Outlet context={{user}}/>
          
          </div>
         </div>
      </main>
     
    </Wrapper>
    </Dashboard.Provider>
  )
}
export const useDashboardContext= ()=> useContext(Dashboard)
export default DashboardLayout