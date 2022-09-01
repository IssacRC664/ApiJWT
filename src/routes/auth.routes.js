import {Router} from 'express';
const router = Router();

import * as authCtrl from '../controllers/auth.controller';
import {verifySignup} from '../middlewares';


//para registrarse
router.post(
    '/signup',
[verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted]
 ,authCtrl.signUp
 );

 //para logiarse
router.post('/signin', authCtrl.signin);


export default router;