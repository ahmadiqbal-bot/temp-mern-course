import { Form, useNavigation, useOutletContext } from "react-router-dom"
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, Submit } from "../allcomponent";
import { toast } from "react-toastify";
import custom from "../Until/Customutil";

export const action= async ({request})=>{
  const formData= await request.formData();
  // const file= formData.get('avatar');
  // if(file && file.size > 500000){
  //   toast.error("image is to large")
  //   return null
  //  }
  try {
    await custom.patch('/users/update',formData)
    toast.success('profile updated successfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
  }
  return null


}

const Profile = () => {
  const{user}= useOutletContext();
  const{name,Lastname,email,location}= user;

  return (
    <Wrapper>
      <Form method="post" className="form" encType="multipart/form-data">
       <h4 className="form-title">Profile</h4>
       <div className="form-center">
        <div className="form-row">
          <label htmlFor="avatar" className="form-label">
            select a photo (max0.5)MB
          </label>
          <input type="file" className="form-input" id="avatar" name="avatar" accept="image/*" />
        </div>
        <FormRow type='text' name='name' defaultValue={name}/>
        <FormRow type='text' name='lastname' labelText='lastname' defaultValue={Lastname}/>
        <FormRow type='email' name='email' defaultValue={email}/>
        <FormRow type='text' name='location' defaultValue={location}/>
       <Submit userbtn/>
       </div>
      </Form>
    </Wrapper>
  )
}

export default Profile