import { db } from '../database/connection.js'

const create = async ({ aid, payment, balance, date }) => { //async por la solicitud al server
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO account (aid, payment, balance, date) 
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
        SELECT * FROM account
        WHERE aid = $1
        `,
        values: [aid]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const deleteOneByUid = async (aid) => {
    const query = {
        text: `
        DELETE FROM account
        WHERE aid = $1
        `,
        values: [aid]
    }
    const { rowCount } = await db.query(query)
    return rowCount > 0
}


//exports exportamos el objeto
export const AcountModel = {
    create,
    findOneByUid,
    deleteOneByUid
}