const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const apikey = require('../middleware/apikey');
let User = require('../models/user.model');

// @route   GET users?apikey=key
// @desc    Get all users
// @access  Private
router.route('/').get(apikey, (req, res) => {
    User.find()
        .select('-password')
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

// @route   POST users/add
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
                        .then((user) => {
                            jwt.sign({
                                id: user.id 
                            }, process.env.JWT_SECRET, {
                                expiresIn: 3600
                            }, (err, token) => {
                                if (err) throw err;
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        username: user.username,
                                        email: user.email
                                    }
                                });
                            }); 
                        })
                        .catch(err => res.status(400).json('Error: ' + err));
                });
            });
        });
});

module.exports = router;