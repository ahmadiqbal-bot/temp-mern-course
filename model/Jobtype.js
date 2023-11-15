import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../Utlis/Constant.js";
const Schemaa = new mongoose.Schema({
    company:String,
    position:String,
    jobStatus:{
        type:String,
        enum: Object.values(JOB_STATUS),
        default: JOB_STATUS.PENING
    },
    jobtype:{
        type:String,
        enum: Object.values(JOB_TYPE),
        default:JOB_TYPE.PART_TIME
    },
    jobLocation:{
        type:String,
        default:'my city'
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }
   
   
},
{timestamps:true}
)

export default mongoose.model('Jobcontroller',Schemaa)