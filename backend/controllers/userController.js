const connect = require('../config/db');
const User = require('../models/User');
const { hashedPassword, comparePassword, createToken } = require('../services/authService');
const { validationResult } = require('express-validator');


const register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, email, password } = req.body;
        try {

            const client = await connect();

            const userCollection = client.db('mapworks').collection('user');

            const emailExists = await userCollection.findOne({ email });

            if (!emailExists) {

                const cryptedPassword = await hashedPassword(password);

                const user = new User(name, email, cryptedPassword, false);

                await userCollection.insertOne(user);

                const token = await createToken(user);

                return res.status(201).json({ msg: 'User registered successfully.', token: token });
            } else {
                return res.status(400).json({ errors: [{ msg: `${email} is already taken.`, path: 'email' }] });
            }
        } catch (error) {
            console.error(error.message);
            return res.status(500).json('Server internal error.');
        }
    } else {
        // Validations failed
        res.status(400).json({ errors: errors.array() });
    }
};

const login = async (req, res) => {
    const errors = validationResult(req);
        
    if (errors.isEmpty()) {
        const { email, password } = req.body;

        try {

            const client = await connect();

            const userCollection = client.db('mapworks').collection('user');

            const user = await userCollection.findOne({ email: email });

            if (user) {

                if (await comparePassword(password, user.password)) {
                    const token = await createToken(user);
                    console.log(token);
                    if(user.admin) {
                        return res.status(201).json({token, admin: true});
                    } else {
                        return res.status(201).json({ token, admin: false });
                    }
                } else {
                    return res.status(400).json({ errors: [{ msg: 'Password not matched. Login failure!', path: 'password' }] });
                }
            } else {
                return res.status(400).json({ errors: [{ msg: `${email} is not found!`, path: 'email' }] });
            }

        } catch (error) {
            console.error(error.message);
            return res.status(500).json('Server internal error!');
        }
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
};

module.exports = { register, login };