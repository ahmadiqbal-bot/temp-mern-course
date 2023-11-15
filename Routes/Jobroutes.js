import { Router } from "express";
const router= Router();
import
{getalljobs,
    createpost,
    updatejob,
    deletejob,
    getsinglejob,
    showstat

} from '../Controller/Routecontrol.js'
import { validateid, validaterequest } from "../middleware/Valuesmiddleware.js";
import  {Authmiddle, checkfortest}  from "../middleware/Authmiddleware.js";
// router.get('/',getalljobs);
// router.post('/api/v1/jobs/',createpost);
// router.patch('/api/v1/jobs/:id',updatejob);
// router.get('/api/v1/jobs/:id',getsinglejob);
// router.delete('/api/v1/jobs/:id',deletejob);

router.route('/stats').get(showstat)

router.route('/').get(getalljobs).post(validaterequest,checkfortest,createpost)
router.route('/:id').get(validateid,getsinglejob).patch(checkfortest,validaterequest,validateid,updatejob).delete(validateid,checkfortest,deletejob)
export default router