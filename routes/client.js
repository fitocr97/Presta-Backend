import {Router } from "express";
import { ClientController } from "../controllers/client.js";
import { verifyToken } from "../middlewares/jwt_midleware.js";

const router = Router()

router.post('/create', verifyToken, ClientController.create)
router.get('/weekly', verifyToken, ClientController.findWeekly)
router.get('/biweekly', verifyToken, ClientController.findBiWeekly)
router.get('/updateStatusWeekly', verifyToken, ClientController.updateStatusWeekly)
router.get('/updateStatusBiWeekly', verifyToken, ClientController.updateStatusBiWeekly)
router.get('/id', verifyToken, ClientController.findOneByUid)
router.post('/update', verifyToken, ClientController.updateClient)
router.post('/delete', verifyToken, ClientController.deleteClientAccount)


export default router; //por defecto porque vamos a a tener varias instancias de este