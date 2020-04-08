const express = require('express');
const router = express.Router();
const dbPosts = require('./postDb')

router.get('/', (req, res) => {
  dbPosts.get()
  .then( post =>{
    res.status(200).json(post)
  })
  .catch(err => {
    res.status(500).json({messgae : `could'nt get posts for database`})
  })
});

router.get('/:id',validatePostId, (req, res) => {
  const post = req.post; 
  res.status(200).json(post)
});

router.delete('/:id',validatePostId, validatePost,(req, res) => {
  const id = req.params.id;
  dbPosts.remove(id)
  .then(del => {
    if(del !== 0 ){
      res.status(200).json(req.post)
    }else{
      res.status(404).json({message: 'the post could not be deleted'})
    }
  })
  .catch(err => {
    res.status(500).json({message:'the post was not deleted by the database'})
  })
});

router.put('/:id', validatePostId,(req, res) => {
  const id = req.params.id;
  const body = req.body;
  dbPosts.update(id, body)
  .then(updatedPost => {
    if(updatedPost == 1){
        dbPosts.getById(id)
        .then(object => {
          res.status(200).json(object)
        }).catch(err => res.status(500).json({message: 'post was updated but for some reason could not be retrieved from the database'}))
    }else{
      res.status(404).json({message: 'post was not updated'})
    }
  })
  .catch(err => res.status(500).json({message : 'post was not updated in the database'}))
});

function validatePostId(req, res, next) {
  const id = req.params.id;
  dbPosts.getById(id)
  .then( neededId => {
    if(neededId){
      req.post = neededId;
      next()
    }else{
      res.status(404).json({errorMessage: "that user id does not exist"})
    }
  })
  .catch(err => res.status(500).json({errorMessage: 'could not get user for database'}))
  
}

function validatePost(req,res,next){
  const body = req.body;
  if(body.text){
    next()
  }else{
    res.status(400).json({message: 'you dont have a text in the body'})
  }
}

module.exports = router;
