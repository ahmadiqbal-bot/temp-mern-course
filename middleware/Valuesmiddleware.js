import {body,validationResult,param} from 'express-validator'
import { Badrequest,NotFounderror } from '../Error/Error.js'
import { JOB_SORT_BY, JOB_STATUS, JOB_TYPE } from '../Utlis/Constant.js';
import mongoose from 'mongoose';
import Job from '../model/Jobtype.js'
import User from '../model/Usermodel.js';


const validaterror= (validatevalues)=>{
    return[
validatevalues,
(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const errorMessage= errors.array().map((err)=>err.msg)
        if(!errorMessage[0].startsWith('no job')){
            throw new NotFounderror(errorMessage);
           }           
           if(errorMessage[0].startsWith("no route")){
            throw new Error("no route found with 1")
           }                      
       throw new Badrequest(errorMessage)
      
    } 
    
        next()
    
    }
    ]
}
export const validaterequest= validaterror([
    body('company').notEmpty().withMessage("company is required"),
    body('position').notEmpty().withMessage("position is required"),
    body('jobLocation').notEmpty().withMessage("jobLocation is required"),
    body('jobStatus').isIn(Object.values(Object.values(JOB_STATUS))).withMessage('invalid status value'),

    body('jobtype').isIn(Object.values(Object.values(JOB_TYPE))).withMessage('invalid job-type value'),
    // body('jobLocation').isIn(Object.values(Object.values())).withMessage('invalid job sort value'),
])
export const validateid= validaterror([
    param('id').custom( async (value,{req})=>{
        const isvalid= mongoose.Types.ObjectId.isValid(value)
    if(!isvalid) throw new Badrequest('invalid this id')

    const job = await Job.findById(value)
    if(!job) throw new NotFounderror(`no job with id : ${value}`);
  const isadmin= req.user.role=== 'admin'
  const isowner= req.user.userId=== job.createdBy.toString()
  if(!isadmin &&  !isowner) throw new Error("not authoriezed to access this route")
    })

])

export const validregister= validaterror([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email').custom(async (email)=>{
    const user = await User.findOne({email})
    if(user){
        throw new Badrequest('email already exist')
    }
    }),
    body('password').notEmpty().withMessage('password is required').isLength({min:5}).withMessage('password must be least 10'),
    body('location').notEmpty().withMessage('location is required')
])

export const validatelogin= validaterror([
    
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email'),
    body('password').notEmpty().withMessage('password is required').isLength({min:5}).withMessage('password must be least 10'),
])


export const validateupdate= ([
    body('name').notEmpty().withMessage('name is required'),
    body('email').notEmpty().withMessage('email is required').isEmail().withMessage('invalid email').custom(async (email)=>{
    const user = await User.findOne({email})
    if(user && user._id.toString() !== req.user.userId){
        throw new Badrequest('email already exist')
    }
    }),
    body('password').notEmpty().withMessage('password is required').isLength({min:5}).withMessage('password must be least 10'),
    body('location').notEmpty().withMessage('location is required')

])