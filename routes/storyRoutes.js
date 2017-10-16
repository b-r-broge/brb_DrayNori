const express = require('express');
const router = express.Router();


//====RENDER START PAGE===//

router.get('/start', function(req, res) {
  res.render('astart', {
    username: req.user.username
  });
});

//==========================//


module.exports = router;
