import cron from 'node-cron';
import { db } from './database/connection.js'; // asegúrate de importar tu conexión a la base de datos

// Consulta para actualizar de 'Pago' a 'Espera' los jueves a las 10 PM
cron.schedule('0 10 * * 4', async () => { // jueves a las 10 PM
    try {
        const updatePagoToEspera = `UPDATE clients
                                    SET status = 'Espera'
                                    WHERE status = 'Pago' AND type = 'semanal';`;
        await db.query(updatePagoToEspera);
        console.log("Clientes quincenales actualizados de 'Pago' a 'Espera' (Jueves 10 PM)");
    } catch (error) {
        console.error("Error al ejecutar la consulta del jueves: ", error);
    }
}, {
    timezone: "America/Costa_Rica" // ajusta según tu zona horaria
});

// Consulta para actualizar de 'Espera' a 'Falta' los martes a las 6 AM
cron.schedule('0 6 * * 2', async () => { // lunes a las 6 AM
    try {
        const updateEsperaToFalta = `UPDATE clients
                                     SET status = 'Falta'
                                     WHERE status = 'Espera' AND type = 'semanal';`;
        await db.query(updateEsperaToFalta);
        console.log("Clientes quincenales actualizados de 'Espera' a 'Falta' (Lunes 6 AM)");
    } catch (error) {
        console.error("Error al ejecutar la consulta del lunes: ", error);
    }
}, {
    timezone: "America/Costa_Rica" // ajusta según tu zona horaria
});

// Actualizar de 'Pago' a 'Espera' el 12 de cada mes a las 10:00 a.m.
cron.schedule('0 10 12 * *', async () => { // se ejecutará el día 12 de cada mes a las 10:00 a.m.
    try {
        const updatePagoToEspera12 = `UPDATE clients
                                      SET status = 'Espera'
                                      WHERE status = 'Pago' AND type = 'quincenal';`;
        await db.query(updatePagoToEspera12);
        console.log("Clientes quincenales actualizados de 'Pago' a 'Espera' (12 de cada mes, 10:00 a.m.)");
    } catch (error) {
        console.error("Error al ejecutar la consulta: ", error);
    }
}, {
    timezone: "America/Costa_Rica"
});

// Actualizar de 'Pago' a 'Espera' el 27 de cada mes a las 10:00 a.m.
cron.schedule('0 10 27 * *', async () => { // se ejecutará el día 27 de cada mes a las 10:00 a.m.
    try {
        const updatePagoToEspera27 = `UPDATE clients
                                      SET status = 'Espera'
                                      WHERE status = 'Pago' AND type = 'quincenal';`;
        await db.query(updatePagoToEspera27);
        console.log("Clientes quincenales actualizados de 'Pago' a 'Espera' (27 de cada mes, 10:00 a.m.)");
    } catch (error) {
        console.error("Error al ejecutar la consulta: ", error);
    }
}, {
    timezone: "America/Costa_Rica"
});

// Actualizar de 'Espera' a 'Falta' el 3 de cada mes a las 6:00 a.m.
cron.schedule('0 6 3 * *', async () => { // se ejecutará el día 3 de cada mes a las 6:00 a.m.
    try {
        const updateEsperaToFalta3 = `UPDATE clients
                                      SET status = 'Falta'
                                      WHERE status = 'Espera' AND type = 'quincenal';`;
        await db.query(updateEsperaToFalta3);
        console.log("Clientes quincenales actualizados de 'Espera' a 'Falta' (3 de cada mes, 6:00 a.m.)");
    } catch (error) {
        console.error("Error al ejecutar la consulta: ", error);
    }
}, {
    timezone: "America/Costa_Rica"
});

// Actualizar de 'Espera' a 'Falta' el 18 de cada mes a las 6:00 a.m.
cron.schedule('0 6 18 * *', async () => { // se ejecutará el día 18 de cada mes a las 6:00 a.m.
    try {
        const updateEsperaToFalta18 = `UPDATE clients
                                       SET status = 'Falta'
                                       WHERE status = 'Espera' AND type = 'quincenal';`;
        await db.query(updateEsperaToFalta18);
        console.log("Clientes quincenales actualizados de 'Espera' a 'Falta' (18 de cada mes, 6:00 a.m.)");
    } catch (error) {
        console.error("Error al ejecutar la consulta: ", error);
    }
}, {
    timezone: "America/Costa_Rica"
});