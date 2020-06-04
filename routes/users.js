const router = require('express').Router();
const bcrypt = require('bcryptjs');
let User = require('../models/user.model');

// @route   GET users
// @desc    Get all users
// @access  Public
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST users
// @desc    Register new user
// @access  Public
router.route('/add').post((req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.'});
    }

    User.findOne({ email: email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'User already exists.' });

            const newUser = new User({
                username,
                email,
                password
            });

            // Create salt & hash password
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;

                    newUser.save()
                        .then(() => res.json('User added!'))
                        .catch(err => res.status(400).json('Error: ' + err));
                });
            });
        });
});

module.exports = router;