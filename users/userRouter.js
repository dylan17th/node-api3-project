const express = require('express');
const router = express.Router();
const dbUsers = require('./userDb');
const dbPosts = require('../posts/postDb')

router.post('/', validateUser,(req, res) => {
  dbUsers.insert(req.body)
  .then( user => {
    res.status(201).json(user)
  })
  .catch(err => {
    res.status(500).json({errorMessage: 'could not add the new user from database'})
  })
});

router.post('/:id/posts', validateUserId, validatePost,(req, res) => {
  dbPosts.insert(req.body)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => res.sendStatus(500).json({message: 'error when trying to insert the new post'}))
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
  const id = req.params.id;
  dbUsers.getUserPosts(id)
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({message: 'could not get post for database'})
  })
});

router.delete('/:id',validateUserId, (req, res) => {
  const id = req.params.id;
  dbUsers.remove(id)
  .then(deletedUser => {
    if(deletedUser !== 0){
      res.status(200).json(req.user)
    }else{
      res.status(404).json({message: 'the user id was not deleted'})
    }
  })
  .catch(err => {
    res.status(500).json({message: 'the user was not delete because we could access the database'})
  })
});

router.put('/:id', validateUserId, validateUser,(req, res) => {
  const id = req.params.id;
  const body = req.body;
  dbUsers.update(id,body)
  .then(updatedUser => {
    if(updatedUser !== 0){
      dbUsers.getById(id)
      .then( user => {
        res.status(200).json(user)
      })
      .catch(err => {
        res.status(500).json({message: 'can not get user after being updated'})
      })
    }
  })
  .catch(err => {
    res.status(500).json({message: 'can not update user'})
  })
});

function validateUserId(req, res, next) {
  const id = req.params.id;
  dbUsers.getById(id)
  .then(object => {
    if(object){
      req.user = object;
      next()
    }else{
      res.status(404).json({errorMessage: 'invalid user id'})
    }
  })
  .catch(err => res.status(500).json({errorMessage: 'could not access the database'}))
}

function validateUser(req, res, next) {
  const body = req.body;
  if(body.name){
    next();
  }else{
    return res.status(400).json({ message: "missing user data"})
  }
}

function validatePost(req, res, next) {
  const body = req.body;
  if(body.text && body.user_id){
    next()
  }else{
    return res.status(400).json({message: "missing required text field"})
  }
}

module.exports = router;
