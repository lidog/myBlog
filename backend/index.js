/**
 * Created by lizhenhua on 2019/4/6.
 */
const  http = require('http');

const PORT = 8000;

const serverHandle = require("./bin/app.js")

const server = http.createServer(serverHandle);

server.listen(PORT);

module.exports = server