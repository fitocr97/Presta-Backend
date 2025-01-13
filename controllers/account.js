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

        if(payment >= balance ){
            console.log("entro balance payment mayor o igual que balance")
            const deleteAccount = await AccountModel.deleteOneByUid(aid)
            
            console.log("cuenta: "+ deleteAccount)


            const deleteClient = await ClientModel.deleteOneById(aid)

            console.log(deleteClient)

            return res.status(204).json({ok: true, mgs: "Cuenta eliminada ya que cancelo el prestamo"})
            

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


const findById = async (req, res) => {
    try {
        const { aid } = req.query;  // Obtener cud de la URL (query parameters)
        console.log("cotnrollador acccount find by id")
        console.log(aid);
        
        // Llamada al modelo que busca el cliente por cud
        const account = await AccountModel.findOneByUid(aid);

        return res.json({ ok: true, msg: account });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
};

const findBalance = async (req, res) => {
    try {
        // Llamada al modelo para obtener la suma de balances
        const account = await AccountModel.findBalance();

        if (account && account.total_balance !== null) {
            return res.json({ ok: true, totalBalance: account.total_balance });
        } else {
            return res.status(404).json({ ok: false, msg: 'No se encontró ningún balance' });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        return res.status(500).json({
            ok: false,
            msg: 'Error en el servidor',
        });
    }
};



export const AccountController = {
    create,
    findById,
    findBalance
}