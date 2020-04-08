const express = require('express');
const router = express.Router();
const dbUsers = require('./userDb');

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  dbUsers.get()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({errorMessage: 'could not access database'})
  })
});

router.get('/:id', validateUserId,(req, res) => {
  const user = req.user;
  res.status(200).json(user)
});

router.get('/:id/posts',validateUserId, (req, res) => {
  // do your magic!
});

router.delete('/:id',validateUserId, (req, res) => {
  // do your magic!
});

router.put('/:id', validateUserId,(req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  const id = req.params.id;
  dbUsers.getById(id)
  .then(object => {
    if(object){
      req.user = object;
      next()
    }else{
      res.status(404).json({errorMessage: 'that user doesn not exist'})
    }
  })
  .catch(err => res.status(500).json({errorMessage: 'could not access the database'}))
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
