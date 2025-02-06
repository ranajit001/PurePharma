const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ name, email, password });
        res.status(201).json({ 
            id: user.id, 
            name: user.name, 
            email: user.email
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.comparePassword(password))) {
            res.json({ 
                id: user.id, 
                name: user.name, 
                email: user.email, 
                token: generateToken(user.id, user.role) 
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerUser, loginUser };
