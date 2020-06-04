const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let User = require('../models/user.model');

// @route   POST auth
// @desc    Authenticate user
// @access  Public
router.route('/').post((req, res) => {
    const { username, email, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all fields.'});
    }

    User.findOne({ username: username })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User does not exist.' });

            // Check plain text password against hash
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials.' });

                    jwt.sign({
                        id: user.id 
                    }, process.env.JWT_SECRET, {
                        expiresIn: 3600
                    }, (err, token) => {
                        if (err) throw err;
                        res.json({
                            username,
                            token
                        });
                    }); 
                });
        });
});

module.exports = router;