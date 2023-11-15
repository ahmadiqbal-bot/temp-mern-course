import { Router } from "express";
const router= Router();
import { getApplicationStats, getCurrentUser, updateUser } from "../Controller/Usercontroller.js";
import { validateupdate } from "../middleware/Valuesmiddleware.js";
import { authorizepermission, checkfortest } from "../middleware/Authmiddleware.js";

import Upload from "../middleware/Multer.js";



router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats',[authorizepermission('admin'), getApplicationStats]);
router.patch('/update',Upload.single('avatar'),validateupdate,checkfortest, updateUser);


export default router;