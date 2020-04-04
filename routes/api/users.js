const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/Users');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
//@route    POST api/users
//@desc     Register route for new user
//@access   Public
router.post('/', [ // параметы валидации express-validator
  check('name', 'Name is required').not().isEmpty(),
  check('email', "Please, write valid email").isEmail(),
  check('password', "Password must have minimum 6 symbols").isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password } = req.body;
  try {
    // check if user exist
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists " }] })
    }
    //get user gavatar
    const avatar = gravatar.url(email, {
      s: '200', //status
      r: 'pg', //read
      d: 'mm' //default
    });
    user = new User({
      name,
      email,
      avatar,
      password
    }) 
    //encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    //return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get('jwtsecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }

});


module.exports = router;