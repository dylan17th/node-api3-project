const express = require('express');

const server = express();

server.use(express.json());
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const time = new Date();
  console.log(`${method}, ${url} , ${time}`)
  next()
}

module.exports = server;
