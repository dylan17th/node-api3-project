const express = require('express');
const server = express();
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

server.use(express.json());
server.use(logger);
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(function(req,res){
res.status(404).json({message: 'Sorry that end point doesnt exist'})
})

function logger(req, res, next) {
  const method = req.method;
  const url = req.originalUrl;
  const time = new Date();
  console.log(`${method}, ${url} , ${time}`)
  next()
}

module.exports = server;
