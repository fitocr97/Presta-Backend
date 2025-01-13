import { db } from '../database/connection.js'

const create = async ({ aid, payment, balance, date }) => { //async por la solicitud al server
    console.log(aid, payment, balance, date)
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO accounts (aid, payment, balance, date) 
        VALUES($1, $2, $3, $4)
        RETURNING aid, payment, balance, date
        `,
        values: [aid, payment, balance, date] //destructory 
    }
        //returning devolver datos
    const { rows } = await db.query(query)  //db recibe el query, devuelve un objeto las rows que las devolvemos al controller
    return rows[0]  //devolver el primer resultado
}


//buscar por id
const findOneByUid = async (aid) => {
    const query = {
        text: `
        SELECT * FROM accounts
        WHERE aid = $1
        `,
        values: [aid]
    }
    const { rows } = await db.query(query)
    return rows
}

const deleteOneByUid = async (aid) => {
    const query = {
        text: `
        DELETE FROM accounts
        WHERE aid = $1
        `,
        values: [aid]
    }
    const { rowCount } = await db.query(query)
    return rowCount > 0
}

const findBalance = async () => {
    const query = {
        text: `
        SELECT SUM(balance) AS total_balance FROM accounts
        `,
    }
    const { rows } = await db.query(query)
    return rows
}


//exports exportamos el objeto
export const AccountModel = {
    create,
    findOneByUid,
    deleteOneByUid,
    findBalance
}