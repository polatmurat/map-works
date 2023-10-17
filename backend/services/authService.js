const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    return hashed;
};

const createToken = async (user) => {
    return await jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '2d' });
};

const comparePassword = async (password, dbPassword) => {
    return await bcrypt.compare(password, dbPassword);
};

module.exports = { hashedPassword, createToken, comparePassword };
