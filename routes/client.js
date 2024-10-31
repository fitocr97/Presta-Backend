import {Router } from "express";
import { ClientController } from "../controllers/client.js";
import { verifyToken } from "../middlewares/jwt_midleware.js";

const router = Router()

router.post('/create', verifyToken, ClientController.create)
router.get('/weekly', verifyToken, ClientController.findWeekly)
router.get('/biweekly', verifyToken, ClientController.findBiWeekly)


export default router; //por defecto porque vamos a a tener varias instancias de este