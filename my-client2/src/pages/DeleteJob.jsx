import { toast } from "react-toastify"
import custom from "../Until/Customutil"
import { redirect } from "react-router-dom"



export const action= async({params})=>{
  try {
    await custom.delete(`/jobs/${params.id}`)
    toast.success('job delete successfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
 return redirect('/dashboard/alljobs')
 

}

