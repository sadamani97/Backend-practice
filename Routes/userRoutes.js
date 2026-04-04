import express from "express";
import { getUsers, createUser, getUserById } from "../Controller/UserController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
router.get('/',auth, getUsers)
router.post('/', createUser)
router.get('/:id',getUserById)



export default router;