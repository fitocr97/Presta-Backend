import 'dotenv/config' //leer variables entorno
import express from 'express';
import userRouter from './routes/user.js'
import clientRouter from './routes/client.js'
import accountRouter from './routes/account.js'
  
const app = express();  //server

app.use(express.json()) //poder enviar desde el cuerpo del mensaje
app.use(express.urlencoded({ extended: true }))  //habilitar enviar solicitudes desde formularios html

app.use('/prestaapi/v1/users', userRouter)
app.use('/prestaapi/v1/clients', clientRouter)
app.use('/prestaapi/v1/accounts', accountRouter)


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('server on'));  //levantar server