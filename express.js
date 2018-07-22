const express = require('express')
const app = express()
let port = process.env.PORT || 3000
app.use(express.static('./dist'))
app.get('*', function (request, response, next) {
  response.sendFile(__dirname + '/dist/index.html');
});
console.log(port)
app.listen(port)