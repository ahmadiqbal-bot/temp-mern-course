
import { Badrequest, UnauthenticatedError } from "../Error/Error.js";
import { verifytoken } from "../Utlis/tokenUtils.js";

export const Authmiddle= async (req,res,next)=>{
const {token}=  req.cookies;
if(!token) throw new Error("this is jwt error")  


try {
    const {role,userId}= verifytoken(token);
    const testuser= userId==='654bd4b3cb0e3218694174c7'
    req.user= {role,userId,testuser}

    next();   
} catch (error) {
    throw new Error("this is error")    
}
   
}


export const authorizepermission=  (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        throw new Error('Unauthorized to access this route');
      }
      next();
   
    };
  };

  export const checkfortest= async(req,res,next)=>{
    if(req.user.testuser){
      throw new Error("demo! user Bad request error")
      
   }
   next()
  }