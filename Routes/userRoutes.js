import express from "express";
import { getUsers, createUser, updateUser, getUserById, deleteUser, registerUser } from "../Controller/UserController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();
router.post('/register', registerUser);
router.post('/', createUser);

router.get('/',auth, getUsers);
router.get('/:id',auth, getUserById)
router.put('/:id',auth,updateUser)
router.delete('/:id', auth, deleteUser)


export default router;