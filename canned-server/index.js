var canned = require('canned')
,   http = require('http')
,   opts = { logger: process.stdout, cors: true,
    cors_headers: ["Content-Type", "Access-Control-Allow-Origin"] }

can = canned('./server', opts)

http.createServer(can).listen(5000)


