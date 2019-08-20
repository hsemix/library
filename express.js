const express = require('express')
const app = express()
const port = 3000

app.get('/', function (request, response) {
    response.end("Hello World!");
});

app.get('/users', function (request, response) {
    response.end("Getting users");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))