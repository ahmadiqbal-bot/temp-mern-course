import { Router } from "express";
const router= Router();
import {login,logout,register} from '../Controller/Authcontroller.js'
import { validregister,validatelogin } from "../middleware/Valuesmiddleware.js";


router.post('/register',validregister,register)
router.post('/login',validatelogin,login)        
router.get('/logout',logout)  

export default router;