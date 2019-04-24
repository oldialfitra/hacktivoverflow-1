require('dotenv').config()
const express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 5000,
    routerIndex = require('./routes/index'),
    schedule = require('./helpers/cron')

// mongoose.connect(`mongodb://localhost:27017/${process.env.DBNAME}`, { useNewUrlParser: true })
mongoose.connect(`mongodb+srv://oldi:delete@miniwp-9mbzj.gcp.mongodb.net/hacktivoverflow-new?retryWrites=true`, { useNewUrlParser: true })
schedule()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routerIndex)

app.listen(port, function () {
    console.log('Listening on port:', port)
})
