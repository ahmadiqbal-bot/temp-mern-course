import Job from '../model/Jobtype.js'
import { StatusCodes } from 'http-status-codes';
import { nanoid } from 'nanoid';
import mongoose from 'mongoose';
import day from 'dayjs'
import { NotFounderror } from '../Error/Error.js';
let jobs = [
  { id: nanoid(), company: 'apple', position: 'front-endd' },
  { id: nanoid(), company: 'google', position: 'back-endd' },
];

                                     
export const  getalljobs= async (req, res) => {
 const{search,jobStatus,jobtype,sort}= req.query;
 const queryObject={
  createdBy:req.user.userId,
 }
 if(search){
  queryObject.$or=[
    {position:{$regex:search,$options:'i'}},
    {company:{$regex:search,$options:'i'}},
  ]
 }
 if(jobStatus && jobStatus !=='all'){
  queryObject.jobStatus=jobStatus;
}
if(jobtype && jobtype !=='all'){
  queryObject.jobtype=jobtype;
}

 const sortoption= {
  newestfield:'-createdAt',
  oldestfield:'createdAt',
  'a-z':'position',
  'z-a':'-position'
 }
 const sortkey= sortoption[sort] || sortoption.newest


 const page= Number(req.query.page) || 1;
 const limit= Number(req.query.limit)||10;
 const skip = (page - 1)* limit
    const jobs = await Job.find(queryObject).sort(sortkey).skip(skip).limit(limit)
    const totaljobs= await Job.countDocuments(queryObject)
const numofpages= Math.ceil(totaljobs / limit);





    res.status(StatusCodes.OK).json({totaljobs,numofpages,currentPage:page,jobs})

    }

export const createpost= async (req, res) => {
  req.body.createdBy = req.user.userId;
 const job=  await  Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
    }
    
    
    export const getsinglejob= async (req,res)=>{
        const job = await Job.findById(req.params.id)
       
          // res.status(500).json(`no job find with id ${id} `)
        
        res.status(StatusCodes.OK).json({job});
    }


    export const updatejob = async (req,res)=>{
     const updatejob= await Job.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
     res.status(StatusCodes.OK).json({jobs:updatejob})
      }

      export const deletejob= async (req,res)=>{
  const removedJob = await Job.findByIdAndDelete(req.params.id);

  res.status(StatusCodes.OK).json({ job: removedJob });
      }


   export const showstat= async(req,res)=>{
   
   let stats= await Job.aggregate([
{$match:  { createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
{ $group:  { _id:'$jobStatus', count:{$sum:1}}}

 ])
stats = stats.reduce((acc,curr)=>{
  const{_id:title,count}= curr
  acc[title]= count
  return acc
},{})  
  
    const defaultjob={
      pending:stats.pending ||0,
      declined: stats.declined||0,
      interview:stats.interview||0,
    };

    let monthapplication= await Job.aggregate([
      {$match:  { createdBy: new mongoose.Types.ObjectId(req.user.userId)}},
      {
        $group: {
          _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
          count: { $sum: 1 },
        },
      },       
      {$sort:{'_id.year':-1 ,'_id.month':-1}},
      {
        $limit:6
      }                         
    ])
monthapplication= monthapplication.map((item)=>{
  const{_id:{year,month},count}= item
 const date= day().month(month -1).year(year).format('MMM YY')
  return {date,count}
}).reverse();




  //   let monthapplication= [{
  //     date:"may 23",
  //     count:12
  //   },
  //   {
  //     date:"aug 25",
  //     count:3
  //   },
  //   {
  //     date:"july 25",
  //     count:9
  //   }
  
  // ]
   res.status(StatusCodes.OK).json({defaultjob,monthapplication})
   }