const server = require('./server');
const port = process.env.PORT || 8001;

server.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})