import express, { NextFunction, Request, Response } from 'express'
import bodyParser from 'body-parser'
import articlesRoutes from './routes/articles'
import usersRoutes from './routes/users'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
void app.use('/articles', articlesRoutes);
void app.use('/users', usersRoutes);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
