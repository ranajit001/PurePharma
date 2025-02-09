const UserModel = require('../models/User');

const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const generateAccessToken = (user) => jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET);
//const generateRefreshToken = (user) => jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '5h' });

//signup
const register = async (req, res, next) => {
    const { name, email, password, role } = req.body;
    try {
        const userExists = await UserModel.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });
        //hasing passwoed with argon2
        const hash = await argon2.hash(password);

        const user = await UserModel.create({ name, email, password: hash });   //saving to mongo db
        res.status(201).json({
            // id: user.id, 
            name: user.name,
            email: user.email
        });   //response sended
    } catch (error) {
        error.message = `Error in register: ${error.message}`;
        next(error);
    }
};

//login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const hashedPassword = user.password; // Retrieve hashed password from DB

        const verify = await argon2.verify(hashedPassword, password);
        if (!verify) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        //const accessToken = generateAccessToken(user);
        const Token = generateRefreshToken(user);

        res.json({
            name: user.name,
            email: user.email,
            //accessToken,
            Token
        });

    } catch (error) {
        error.message = `Error in login: ${error.message}`;
        next(error);
    }
};

//generate new acess token if valid refresh token
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

//forgot passs token url getting route
// UserRouter.post("/forget_password", UserEmailforPasswordResetToken)
const sendResetEmail = async (req, res, next) => {
    try {
        const { email } = req.body;

        // Check if the email exists
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).send("User with this email does not exist");
        }

        // Generate reset token (valid for 20 minutes)
        const resetToken = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "10m" });

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

        // Send email with the reset link
        await transporter.sendMail({
            from: `"👋Support Team  <${process.env.NODE_MAILER_ADMIN_EMAI}>`,
            to: email, // Send to the user requesting the reset
            subject: "Password Reset Request",
            text: `Click the link to reset your password: ${resetLink}, valid for 10 munite`,
            // html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p><p>This link will expire in 10 minutes.</p>`,
        });

        res.status(200).send("Password reset link sent to your email.");
    } catch (error) {
        error.message = `Error in sendResetEmail: ${error.message}`;
        next(error);
    }
};

// // this will be shown to clien after clicking on the email sended limk 
// // BROWSER is always GET req

// UserRouter.get("/reset_password/:token", UserPasswoedResetWebPage);
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

//    UserRouter.post("/reset_password/:token", USernewPasswordSave)
const newPassPost = async (req, res, next) => {
    const { password } = req.body;
    try {
        let token = req.params.token;
        var decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const hashPass = await argon2.hash(password); //hash pass
            await UserModel.findByIdAndUpdate(decoded.userId, { password: hashPass })

            res.send('Password Reset Successfull...!!!  Please login.');

        } else {
            res.send({ msg: "Please Try Agaian Later" })
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
