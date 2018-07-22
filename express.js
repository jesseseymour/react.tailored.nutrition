const express = require('express')
const app = express()
let port = process.env.PORT || 3000
app.use(express.static('./dist'))
console.log(port)
app.listen(port)