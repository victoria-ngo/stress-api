import express from 'express'
import bodyParser from 'body-parser'
import apiRoutes from './routes/api.js'

const app = express()   

app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/api', apiRoutes)

const PORT = 5506
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})

