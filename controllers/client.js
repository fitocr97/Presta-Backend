import { ClientModel } from '../models/client.js'

const create = async(req, res) => {
    try{
        const {name, phone, address, loan, interest, total, balance, type} = req.body
        console.log(name, phone, address, loan, interest, total, balance, type)
    
        if (!name || !phone || !address || !loan || !interest || !total || !balance || !type) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: name, phone, address, loan, interests, total, balance, type" }) //badrequest
        }


        //verificar si el cliente ya existe
        const client = await ClientModel.findOneByName(name)
        if (client) {
            return res.status(409).json({ ok: false, msg: "Name already exists" })
        }
    
        let status = "Espera"

        const newClient = await ClientModel.create({ name, phone, address, loan, interest, total, balance, type, status})

        return res.status(201).json({ok: true, mgs: newClient})
    
    } catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}


const findWeekly= async (req, res) => {
    try {
        const clientsWeekly = await ClientModel.findAllWeekly() //usa el model
        return res.json({ ok: true, msg: clientsWeekly })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

const findBiWeekly= async (req, res) => {
    try {
        const clientsBiWeekly = await ClientModel.findAllBiweekly() //usa el model

        return res.json({ ok: true, msg: clientsBiWeekly })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}

export const ClientController = {
    create,
    findBiWeekly,
    findWeekly
}