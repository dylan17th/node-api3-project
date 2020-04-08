const server = require('./server');
const port = 8001;

server.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})