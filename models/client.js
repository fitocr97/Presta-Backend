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


const findBalance = async (cud) => {
    console.log("estoy en modelClient: " + cud);

    const query = {
        text: `SELECT balance FROM clients WHERE cud = $1`,
        values: [cud],
    };

    const { rows } = await db.query(query);

    // hay al menos una fila y devuelve el balance
    if (rows.length > 0) {
        return rows[0].balance; // Devuelve solo el valor de balance
    } else {
        return null; // O algún valor que indique que no se encontró balance
    }
};


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

const findOneByUid = async (cud) => {
    const query = {
        text: `
        SELECT * FROM clients
        WHERE cud = $1
        `,
        values: [cud]
    };

    try {
        const { rows } = await db.query(query);

        // Si rows tiene al menos un resultado, devolver el primero
        if (rows.length > 0) {
            return rows[0];  // Devuelve solo el primer cliente encontrado
        } else {
            return null;  // O un mensaje adecuado si no se encuentra el cliente
        }
    } catch (err) {
        console.error('Error al buscar cliente por ID:', err);
        throw err;
    }
};

const updateClient = async (cud, name, phone, address, loan, interest, total, balance, type, status) => {
    const query = {
        text: `
        UPDATE 
            clients 
        SET 
            name = $2, 
            phone = $3, 
            address = $4, 
            loan = $5, 
            interest = $6, 
            total = $7, 
            balance = $8, 
            type = $9, 
            status = $10
        WHERE cud = $1;
        `,
        values: [cud, name, phone, address, loan, interest, total, balance, type, status]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const updateBalance = async (cid, balance) => {
    const query = {
        text: `
        UPDATE clients
        SET 
            balance = $2
        WHERE cud = $1;
        `,
        values: [cid, balance]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const GetNameClient = async (name) => {
    console.log(name)
    const query = {
        text: `
        SELECT clients.name
        FROM clients
        JOIN accounts ON accounts.aid = clients.cud
        WHERE accounts.aid = $1 Limit 1;
        `,
        values: [name]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

const deleteOneById = async (cud) => {
    const query = {
        text: `
        DELETE FROM clients
        WHERE cud = $1
        `,
        values: [cud]
    }
    const { rowCount } = await db.query(query)
    return rowCount > 0
}


//actualizar estado semanal 
const updateStatusWeekly = async () => {
    console.log("Llego a actualizar weekly");
    const query = {
        text: `
        UPDATE CLIENTS
        SET STATUS = CASE 
            WHEN STATUS = 'Pago' THEN 'Espera'
            WHEN STATUS = 'Espera' THEN 'Falta'
            ELSE STATUS
        END
        WHERE TYPE = 'semanal';`
    };

    try {
        const { rowCount } = await db.query(query)
        return "Se actualizo el estado semanal"; // O
    } catch (err) {
        console.error('Error actualizando el estado de los clientes semanales:', err);
        throw err;
    }
};

//actualizar estado quinsenal 
const updateStatusBiWeekly = async () => {
    console.log("Llego a actualizar Biweekly");
    const query = {
        text: `
        UPDATE CLIENTS
        SET STATUS = CASE 
            WHEN STATUS = 'Pago' THEN 'Espera'
            WHEN STATUS = 'Espera' THEN 'Falta'
            ELSE STATUS
        END
        WHERE TYPE = 'quincenal';`
    };

    try {
        const { rowCount } = await db.query(query)
        return "Se actualizo el estado quincenal"; // 
    } catch (err) {
        console.error('Error actualizando el estado de los clientes semanales:', err);
        throw err;
    }
};

//actualizar estado a pagado 
const updateStatus = async (cid) => {
    const query = {
        text: `
        UPDATE clients
        SET 
            status = 'Pago'
        WHERE cud = $1;
        `,
        values: [cid]
    }
    const { rows } = await db.query(query)
    return rows[0]
}

//exports exportamos el objeto
export const ClientModel = {
    create,
    findOneByName,
    findAllBiweekly,
    findAllWeekly,
    findOneByUid,
    updateClient,
    deleteOneById,
    GetNameClient,
    updateBalance,
    findBalance,
    updateStatusWeekly,
    updateStatusBiWeekly,
    updateStatus
}

