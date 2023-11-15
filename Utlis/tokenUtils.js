import  jwt  from "jsonwebtoken";


export const createJWt= (payload)=>{
    const token= jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    }
    )
    return token;

}
export const verifytoken =(token)=>{
    const decord= jwt.verify(token,process.env.JWT_SECRET,{
     
    })
    return decord;

}