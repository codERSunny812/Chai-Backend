import { Router } from "express";
import registerUser, { logInUser, logOutUser } from '../controller/user.controller'

import {upload} from '../middleware/multer.middleware'
import { verifyJWT } from "../middleware/auth.middleware";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)


router.route('/login').post(logInUser);


router.route('/logout').post(verifyJWT,logOutUser)


