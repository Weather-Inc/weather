// Third party modules
import express, { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

// Private modules
import config from './config/config'

// Routes
import V0IndexRouter from './v0/routes/index.router'
import { get404 } from './v0/routes/error.router'

// Private variables
const app = express()
const port = process.env.PORT || 3200
const c = process.env.production ? config.prod : config.dev
dotenv.config()

// Parse bodies of requests with bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS Should be restricted
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, HEAD')

  next()
})

// API v0 routes
app.use('/api/v0/', V0IndexRouter)

// Resource not found
app.use(get404)

app.listen(port, () => {
  console.log('ENVIRONMENT', process.env.production)
  console.log(`Server running at http://localhost:${port}`)
  console.log(`Press CTRL+C to stop server`)
})

// Mongoose connection
// mongoose.connect(c.mongodb_uri, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   // Start server
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`)
//     console.log(`Press CTRL+C to stop server`)
//   })
// }).catch(error => console.log(error))
