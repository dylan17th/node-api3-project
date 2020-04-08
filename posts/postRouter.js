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

router.delete('/:id',validatePostId, (req, res) => {
  // do your magic!

});

router.put('/:id', validatePostId,(req, res) => {
  // do your magic!
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

module.exports = router;
