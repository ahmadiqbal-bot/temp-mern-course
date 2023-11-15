import { StatusCodes } from 'http-status-codes';

const Errorhandlemiddleware=  (error,req,res,next)=>{
    console.log(error);
    const statudCode= error.statudCode ||StatusCodes.INTERNAL_SERVER_ERROR
    const msg= error.message||'something went wrong try again'
    res.status(statudCode).json({msg})
}
export default Errorhandlemiddleware;