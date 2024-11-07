import { AccountModel } from '../models/account.js'
import { ClientModel } from '../models/client.js'

const create = async(req, res) => {
    try{
        const {aid, payment, date} = req.body
        console.log("Datos body: " + aid, payment, date)
    
        if (!aid || !payment || !date) {
            return res.status(400).json({ ok: false, msg: "Missing required fields: aid, payment, date" }) //badrequest
        }


        const balance = await ClientModel.findBalance(aid)
        console.log(balance)
        console.log("pasooo luego de balance")

        if(payment >= balance ){
            console.log("entro balance payment mayor o igual que balance")
            const deleteAccount = await AccountModel.deleteOneByUid(aid)
            
            console.log("cuenta: "+ deleteAccount)


            const deleteClient = await ClientModel.deleteOneById(aid)

            console.log(deleteClient)

            return res.status(201).json({ok: true, mgs: "Cuenta eliminada ya que cancelo el prestamo"})
            

        }else{

            let newbalance = balance - payment
            console.log("Balance: " + newbalance )
            const newAccount = await AccountModel.create({ aid, payment, balance: newbalance, date})

            const updateBalance = await ClientModel.updateBalance(aid, newbalance)
            console.log(updateBalance)
            const updateStatus = await ClientModel.updateStatus(aid)
            
            return res.status(201).json({ok: true, mgs: updateBalance})
        }
        
    
    } catch (error){
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Error server'
        })
    }
}






export const AccountController = {
    create
}