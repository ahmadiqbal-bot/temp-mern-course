import bcrypt from 'bcryptjs'

export const comparepassword= async (password,Hashedpassword)=>{
 const ismatch = await bcrypt.compare(password,Hashedpassword);
 return ismatch;   
}