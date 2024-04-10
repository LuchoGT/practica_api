const express = require('express');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    console.log('users');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
