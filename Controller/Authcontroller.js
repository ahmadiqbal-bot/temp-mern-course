import { StatusCodes } from "http-status-codes"
import User from '../model/Usermodel.js'
import bcrypt from 'bcryptjs'
import { UnauthenticatedError } from "../Error/Error.js";
import { comparepassword } from "../Utlis/PasswordUtil.js";
import { createJWt } from "../Utlis/tokenUtils.js";



export const register= async (req,res)=>{
    const isFirstAccount = (await User.countDocuments()) === 0;
    req.body.role = isFirstAccount ? 'admin' : 'user';

const salt= await bcrypt.genSalt(10)
const Hashedpassword= await bcrypt.hash(req.body.password,salt)
req.body.password= Hashedpassword;

const user= await User.create(req.body)
res.status(StatusCodes.CREATED).json({msg:"user created"})
}

export const login= async (req,res)=>{     
    const user= await User.findOne({email:req.body.email})
    
   const isvalid= user && (await comparepassword(req.body.password,user.password))
   
      if (!isvalid) throw new UnauthenticatedError('invalid credentials')
      
     const token= createJWt({userId:user._id,role:user.role})

     const oneday= 1000*60*60*24;
    res.cookie('token',token,{
        httpOnly:true,
        expires: new Date(Date.now() +oneday),
        secure:process.env.NODE_ENV=== 'production'
    });

    res.status(StatusCodes.OK).json({msg:'user looged in'})
    };


    export const logout= async (req,res)=>{
        res.cookie('token','logout',{
            httpOnly:true,
            expires: new Date(Date.now())
        })
        res.status(StatusCodes.OK).json({msg:"user logout seccessfully"})
    }