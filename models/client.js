import { db } from '../database/connection.js'

const create = async ({ name, phone, address, loan, interest, total, balance, type, status }) => { //async por la solicitud al server
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO clients (name, phone, address, loan, interest, total, balance, type, status) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *
        `,
        values: [name, phone, address, loan, interest, total, balance, type, status] //destructory 
    }
        //returning devolver datos
    const { rows } = await db.query(query)  //db recibe el query, devuelve un objeto las rows que las devolvemos al controller
    return rows[0]  //devolver el primer resultado
}

//buscar por email
const findOneByName = async (name) => {
    const query = {
        text: `
        SELECT * FROM clients
        WHERE name = $1
        `,
        values: [name]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const findAllBiweekly = async () => {
    const query = {
        text: `
        select * from clients where type = 'quincenal'
        `
    }
    const { rows } = await db.query(query)
    return rows //todas las filas
}

const findAllWeekly = async () => {
    const query = {
        text: `
        select * from clients where type = 'semanal'
        `
    }
    const { rows } = await db.query(query)
    return rows //todas las filas
}

//buscar por id
const findOneByUid = async (cid) => {
    const query = {
        text: `
        SELECT * FROM clients
        WHERE cid = $1
        `,
        values: [cid]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const updateClient = async (cid, name, phone, address, loan, interests, total, balance, type, status) => {
    const query = {
        text: `
        UPDATE 
        SET 
            name = $2, 
            phone = $3, 
            address = $4, 
            loan = $5, 
            interests = $6, 
            total = $7,
            balance = $8, 
            type = $9, 
            status = $10
        WHERE id = $1;
        RETURNING *
        `,
        values: [cid, name, phone, address, loan, interests, total, balance, type, status]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const deleteOneByName = async (name) => {
    const query = {
        text: `
        DELETE FROM account
        WHERE name = $1
        `,
        values: [name]
    }
    const { rowCount } = await db.query(query)
    return rowCount > 0
}

//exports exportamos el objeto
export const ClientModel = {
    create,
    findOneByName,
    findAllBiweekly,
    findAllWeekly,
    findOneByUid,
    updateClient,
    deleteOneByName
}