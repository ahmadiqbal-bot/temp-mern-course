import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Job from './model/Jobtype.js'
import User from './model/Usermodel.js'



try {
    await mongoose.connect(process.env.MONGO_URL)
    const user= await User.findOne({email:'ahmi2@gmail.com'})
    const userjobs= JSON.parse(
        await readFile(new URL('./Utlis/mockdata.json',import.meta.url))
    )
    const jobs= userjobs.map((job)=>{
        return {...job,createdBy:user._id}
    })
    await Job.deleteMany({createdBy:user._id})
    await Job.create(jobs)
    console.log('success');
    process.exit(0)
    
} catch (error) {
    console.log(error);
    process.exit(1)
}