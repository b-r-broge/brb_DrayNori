const express = require('express');
const router = express.Router();


//====RENDER START PAGE===//

router.use(function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/signup');
  }
})

router.get('/start', function(req, res) {
  res.render('astart', {
    username: req.user.username
  });
});

//==========================//


module.exports = router;
