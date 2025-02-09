const UserModel = require('../models/User');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');

const generateAccessToken = (user) => jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);

//signup
const register = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await UserModel.findOne({ email: email.toLowerCase() });
        if (userExists) {
            console.log(`User already exists for email: ${email}`);
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hashing password with argon2
        const hash = await argon2.hash(password);
        console.log(`Hashed Password: ${hash}`);

        const user = await UserModel.create({ name, email: email.toLowerCase(), password: hash });
        console.log(`User created with email: ${email}`);

        res.status(201).json({
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error(`Error in register: ${error.message}`);
        error.message = `Error in register: ${error.message}`;
        next(error);
    }
};

//login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for email: ${email}`);

        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            console.log(`User not found for email: ${email}`);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const hashedPassword = user.password;
        console.log(`Hashed Password from DB: ${hashedPassword}`);

        const verify = await argon2.verify(hashedPassword, password);
        console.log(`Password Verification Result: ${verify}`);

        if (!verify) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const Token = generateAccessToken(user);
        console.log(`Token generated for user: ${email}`);

        res.json({
            name: user.name,
            email: user.email,
            Token
        });
    } catch (error) {
        console.error(`Error in login: ${error.message}`);
        error.message = `Error in login: ${error.message}`;
        next(error);
    }
};

//generate new access token if valid refresh token
const newAcsToken = async (req, res, next) => {
    try {
        // Extract token
        const refreshToken = req.headers.authorization?.split(' ')[1];
        if (!refreshToken) return res.sendStatus(401); // No token provided

        // Verify refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // Generate new access token
        const accessToken = generateAccessToken({ id: decoded.userId, role: decoded.role });
        res.status(200).json({ accessToken });

    } catch (error) {
        error.message = `Error in newAcsToken: ${error.message}`;
        next(error);
    }
};



const sendResetEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check if email exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User with this email does not exist" });
        }

        // Generate reset token (valid for 10 minutes)
        const resetToken = jwt.sign(
            { userId: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "10m" }
        );

        // Fix: Proper template literal syntax for reset link
        const resetLink = `https://online-pharmacy-jwkq.onrender.com/api/users/reset_password/${resetToken}`;

        // Configure mail transport
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.NODE_MAILER_ADMIN_EMAIL,
                pass: process.env.NODE_MAILER_ADMIN_PASS,
            },
        });

        // Send email with reset link
        await transporter.sendMail({
            from: `👋 Support Team" <${process.env.NODE_MAILER_ADMIN_EMAIL}>`,
            to: email,
            subject: "🔑 Password Reset Request",
            html: `
                <div style="font-family: Arial, sans-serif; color: #333;">
                    <h2 style="color: #007bff;">🔐 Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>You recently requested to reset your password. Click the button below to proceed:</p>
                    <a href="${resetLink}" 
                       style="display: inline-block; padding: 10px 20px; margin: 10px 0; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">
                        Reset Password
                    </a>
                    <p>Or copy and paste this link into your browser:</p>
                    <p style="word-break: break-word; background: #f4f4f4; padding: 10px; border-radius: 5px;">${resetLink}</p>
                    <p><b>Note:</b> This link is valid for <span style="color: red;">10 minutes</span>. If you did not request this, ignore this email.</p>
                    <br>
                    <p>Best regards,<br><strong>Support Team</strong></p>
                </div>
            `,
        });

        // Return JSON response
        res.status(200).json({ message: "Password reset link sent to your email." });

    } catch (error) {
        console.error("Error in sendResetEmail:", error.message);
        next({ message: `Error in sendResetEmail: ${error.message}` });
    }
};



//showing the new password input form
const newPassget = (req, res, next) => {
    try {
        let token = req.params.token;
        const filePath = path.join(__dirname, "../public/ResetPassword.html");
        res.sendFile(filePath);
    } catch (error) {
        error.message = `Error in newPassget: ${error.message}`;
        next(error);
    }
};

//save new password
const newPassPost = async (req, res, next) => {
    const { password } = req.body;
    try {
        let token = req.params.token;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const hashPass = await argon2.hash(password); //hash pass
            await UserModel.findByIdAndUpdate(decoded.userId, { password: hashPass });

            res.send('Password Reset Successful! Please login.');
        } else {
            res.send({ msg: "Please Try Again Later" });
        }
    } catch (e) {
        e.message = `Error in newPassPost: ${e.message}`;
        next(e);
    }
};

module.exports = {
    register,
    login,
    newAcsToken,
    sendResetEmail,
    newPassget,
    newPassPost
};