import { Router } from "express";
import registerUser from '../controller/user.controller'

import {upload} from '../middleware/multer.middleware'


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
