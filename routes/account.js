import {Router } from "express";
import { AccountController } from "../controllers/account.js";
import { verifyToken } from "../middlewares/jwt_midleware.js";

const router = Router()

router.post('/create', verifyToken, AccountController.create)
router.get('/id', verifyToken, AccountController.findById)
router.get('/balances', verifyToken, AccountController.findBalance)


export default router; //por defecto porque vamos a a tener varias instancias de este