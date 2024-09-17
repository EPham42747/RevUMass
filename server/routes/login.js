const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    ans: "Welcome to the login page!",
  });
});

module.exports = router;
