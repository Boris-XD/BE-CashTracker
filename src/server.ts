import express from 'express' 
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import budgetRouter from './routes/budgetRouter'

async function connectDb(){
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('Base de datos conectada'))
    } catch (error) {
        console.log(colors.red.bold('Error al conectar a la base de datos'))
    }
}

connectDb()

const app = express()

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/v1/budgets', budgetRouter)

export default app