const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const Profile = require('../../models/Profile');
const User = require('../../models/Users');
const Post = require('../../models/Posts');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');
//@route    GET api/profile/me
//@desc     Own profile route
//@access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile
      .findOne({ user: req.user.id })
      .populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
    return res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//@route    POST api/profile/
//@desc     create or update data in profile
//@access   Private
router.post('/', [
  auth,
  check('status', 'Укажите свой статус').not().isEmpty(),
  check('skills', "Заполните графу навыков").not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    company, website, location, bio, status, githubusername, skills,
    youtube, facebook, twitter, instagram, linkedin } = req.body;
  // Build profile obj
  const profileFields = {};
  profileFields.user = req.user.id;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills) {
    if (typeof (skills) !== 'object') {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    } else {
      profileFields.skills = skills.map(skill => skill.trim());
    }
  }
  //Build social obj
  profileFields.social = {};
  if (youtube) profileFields.social.youtube = youtube;
  if (facebook) profileFields.social.facebook = facebook;
  if (twitter) profileFields.social.twitter = twitter;
  if (instagram) profileFields.social.instagram = instagram;
  if (linkedin) profileFields.social.linkedin = linkedin;
  try {
    let profile = await Profile.findOne({ user: req.user.id });
    if (profile) {
      //update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }
    //create profile
    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error')
  }
});
//@route    GET api/profile/
//@desc     get all profile
//@access   public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route    GET api/profile/user/:user_id
//@desc     get  profile by user id
//@access   public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' })
    }
    res.json(profile);
  } catch (error) {
    console.error(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' })
    }
    res.status(500).send('Server error');
  }
});
//@route    DELETE api/profile/
//@desc     Delete profile, user, posts
//@access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove posts
    await Post.deleteMany({user: req.user.id});
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: 'User removed' });
  } catch (error) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//@route    PUT api/profile/experience
//@desc     Add profile experience
//@access   Private
router.put('/experience', [
  auth,
  check('title', 'Title is required').not().isEmpty(),
  check('company', 'Company is required').not().isEmpty(),
  check('from', 'From date is required').not().isEmpty()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { title, company, location, from, to, current, description } = req.body;
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
//@route    DELETE api/profile/experience/:exp_id
//@desc     Delete  experience from profile
//@access   Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.experience.map(
      item => item.id).indexOf(req.params.exp_id);
    profile.experience.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

//@route    PUT api/profile/education
//@desc     Add profile education
//@access   Private
router.put('/education', [
  auth,
  check('school', 'Указание учебного заведения обязательно').not().isEmpty(),
  check('degree', 'Укажите сферу изучения').not().isEmpty(),
  check('fieldofstudy', 'Укажите специальность').not().isEmpty(),
  check('from', 'С какого времени начали обучения?').not().isEmpty()
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
//@route    DELETE api/profile/education/:edu_id
//@desc     Delete  education from profile
//@access   Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });
    // Get remove index
    const removeIndex = profile.education.map(
      item => item.id).indexOf(req.params.edu_id);
    profile.education.splice(removeIndex, 1);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});
//@route    GET api/profile/github/:username
//@desc     Get user repository from git
//@access   Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
      sort=createrd:asc&client_id=${config.get('githubClientId')}&
      client_secret=${config.get('githubSecret')}`,
      method: "GET",
      headers: { 'user-agent': 'node.js' }
    }
    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode != 200) {
        return res.status(404).json({ msg: "Профиль Github не обнаружен" });
      }
      res.json(JSON.parse(body));
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
})

module.exports = router;