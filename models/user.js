import { db } from '../database/connection.js'

const create = async ({ email, password, username }) => { //async por la solicitud al server
    const query = {    //parametrizar los datos evitar inyecciones sql
        text: `
        INSERT INTO users (email, password, username)
        VALUES ($1, $2, $3)
        RETURNING email, username, uid
        `,
        values: [email, password, username] //destructory 
    }
        //returning devolver datos
    const { rows } = await db.query(query)  //db recibe el query, devuelve un objeto las rows que las devolvemos al controller
    return rows[0]  //devolver el primer resultado
}

//buscar por email
const findOneByEmail = async (email) => {
    console.log("mode")
    console.log(email)
    const query = {
        text: `
        SELECT * FROM users WHERE email = $1
        `,
        values: [email]
    }
    console.log(query)
    const { rows } = await db.query(query)
    console.log(rows)
    return rows[0]
}

const findAll = async () => {
    const query = {
        text: `
        select 
            name, email
        from 
            users
        `
    }
    const { rows } = await db.query(query)
    return rows //todas las filas
}

//buscar por id
const findOneByUid = async (uid) => {
    const query = {
        text: `
        SELECT * FROM users
        WHERE uid = $1
        `,
        values: [uid]
    }
    const { rows } = await db.query(query)
    return rows[0]
}



//exports exportamos el objeto
export const UserModel = {
    create,
    findOneByEmail,
    findAll,
    findOneByUid
}