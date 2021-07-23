const { User } = require('../database/models');
const bcrypt = require('bcryptjs');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const { mailConfig } = require('../config/config');
const response = require('../common/response').response;
const { sendEmailVerification } = require('../common/sendmail');
const { passwordValidator } = require('../common/validation');



module.exports = {

    /* USER REGISTER */
    async userRegister(req, res) {
        try {
            // Find Email or user exist in db or not
            const emailExist = await User.findOne({ where: { email: req.body.email } });
            if (emailExist) {
                return res.status(400).send(response('Email is already exist'));
            }

            // Check required fields
            const { username, email, password } = req.body;

            if (!username) {
                return res.status(400).send(response('Username is required'))
            }
            if (!email) {
                return res.status(400).send(response('Email is required'))
            }
            if (!password) {
                return res.status(400).send(response('Password are required'))
            }

            // Email validator
            if (!emailValidator.validate(email)) {
                return res.status(400).send(response('Email is invalid'));
            }

            // Password validator
            if (!passwordValidator(password)) {
                return res.status(400).send(response('Password should contains at least 8 or more than characters with one numeric digit, one uppercase and one lowercase letter'));
            }

            // Generate hash password
            const salt = await bcrypt.genSalt(12);
            const hashPassword = await bcrypt.hash(password, salt);

            // Create user
            const saveUser = await User.create({
                username: username,
                email: email,
                password: hashPassword,
                isVerified: false,
            });

            sendEmailVerification(req, saveUser);

            return res.status(201).send(response('Register successfully, please verify your email.', {
                userId: saveUser.id,
                username: saveUser.username,
                email: saveUser.email,
                isVerified: saveUser.isVerified
            }));

        } catch (err) {
            console.log(err.message);
            return res.status(500).send(response('Register failed'));
        }
    },


    /* VERIFY EMAIL */
    async verifyEmail(req, res) {
        try {
            const token = req.params.token
            if (!token) {
                return res.render('register', { success: false, message: 'Email verification failed' });
            }

            // verify token
            const userPayload = jwt.verify(token, mailConfig.appEmailTokenSecret, (err, payload) => {
                if (err) {
                    return res.render('register', { success: false, message: 'Email verification failed' });
                }
                return payload;
            });

            const user = await User.findByPk(userPayload.id);
            if (!user) {
                return res.render('register', { success: false, message: 'Email verification failed' });
            }

            if (user.isVerified) {
                return res.render('register', { success: false, message: 'Email is already verified' });
            }

            await User.update({
                isVerified: true
            }, {
                where: {
                    id: userPayload.id
                }
            });

            return res.render('register', { success: true, message: 'Email verification successfully, Please Login Now', payload: userPayload });
        } catch (err) {
            console.log(err.message);
            return res.render('register', { success: false, message: 'Email verification failed' });
        }
    },



}