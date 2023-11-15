import User from '../model/Usermodel.js'
import Job from '../model/Jobtype.js'
import { StatusCodes} from 'http-status-codes'
import cloudinary from 'cloudinary';
import {promises as fs} from 'fs'

export const getCurrentUser = async (req, res) => {
    const user= await User.findOne({_id:req.user.userId})
    const userwithout= user.toJSON();
    res.status(StatusCodes.OK).json({ user:userwithout });
  };
  
  export const getApplicationStats = async (req, res) => {
    const user= await User.countDocuments()
    const job= await Job.countDocuments()
    res.status(StatusCodes.OK).json({user,job});
  };
  
  export const updateUser = async (req, res) => {
    const newUser= {...req.body};
    delete newUser.password;
    if(req.file){
      const response= await cloudinary.v2.uploader.upload(req.file.path)
      await fs.unlink(req.file.path)
      newUser.avatar= response.secure_url;
      newUser.avatarPublicId= response.public_id;
    }
   
    const updateuser= await User.findByIdAndUpdate(req.user.userId,newUser)
   if(req.file && updateuser){
    await cloudinary.v2.uploader.destroy(updateuser.avatarPublicId)
   }
    res.status(StatusCodes.OK).json({ msg: 'update user' });
  };