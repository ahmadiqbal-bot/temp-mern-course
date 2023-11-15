import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
 import {Register,HomeLayout,Login,Landing,DashboardLayout,Error, Profile, Admin,Stats,AddJob,AllJobs,EditJob} from './pages'
import { action as registeraction } from './pages/Register'
import { action as loginaction } from './pages/Login'
import{loader as dashloader } from './pages/DashboardLayout'
import{action as addJobaction } from './pages/AddJob'
import{loader as alljobsloader } from './pages/AllJobs'
import{loader as editloader } from './pages/EditJob'
import{action as editaction } from './pages/EditJob'
import{action as deleteaction } from './pages/DeleteJob'
import{loader as adminloader } from './pages/Admin'
import{action as profileaction } from './pages/Profile'
import{loader as statsloader } from './pages/Stats'


 const checkdefault=()=>{
  const isdarktheme= localStorage.getItem('darkTheme') === 'true'
  document.body.classList.toggle('dark-theme',isdarktheme)
  return isdarktheme;
 }
 const isdarktheme2= checkdefault();



 const router = createBrowserRouter([
  {
    path:"/",
    element:<HomeLayout />,
    errorElement:<Error/>,
    children:[
      {
         index:true,
        element:<Landing/>
      },
      {
        path:"register",
        element:<Register/>,
        action: registeraction
      },
      {
        path:"login",
        element:<Login/>,
        action: loginaction
      },
      {
        path:"dashboard",
        element:<DashboardLayout isdarktheme2={isdarktheme2} />,
       loader:dashloader,
        children:[
          {
            index:true,
            element: <AddJob/>,
            
            action:addJobaction
          },
          {
            path:'profile',
            element:<Profile/>,
            action:profileaction
          },
          {
            path:'admin',
            element:<Admin/>,
            loader:adminloader
          },
          {
            path:'stats',
            element:<Stats/>,
            loader:statsloader
          },
          {
            path:'alljobs',
            element:<AllJobs/>,
            loader:alljobsloader
          },
          {
            path:'editjob/:id',
            element:<EditJob/>,
            loader:editloader,
            action:editaction,
            
          },
          {
            path:'deletejob/:id',
            action:deleteaction,
          }
        ],
        
      },

    ]
  }
  
  
])

 const App = () => {
  return <RouterProvider router={router} ></RouterProvider>
    
  
}
export default App