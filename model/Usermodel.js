import mongoose from "mongoose";

const Userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    Lastname:{
        type:String,
        default:'lastname'
    },
    location:{
        type:String,
        default:'khudian'
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    },
        avatar:String,
        avatarPublicId:String
    
})
Userschema.methods.toJSON= function(){
    let obj = this.toObject();
    delete obj.password;
    return obj
}

export default mongoose.model('User',Userschema);