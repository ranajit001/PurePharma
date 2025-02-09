const express = require('express');
const UserController  = require('../controllers/userController');

const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();


// Public Routes (No Auth Needed)
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.post('/ResetAccessToken', UserController.newAcsToken);
router.post('/forget_password', UserController.sendResetEmail);
router.get('/reset_password/:token', UserController.newPassget);
router.post('/reset_password/:token', UserController.newPassPost);

router.get('/dashboard', protect, (req, res) => {
    res.json({ message: `Welcome, ${req.user.name}` });
});

// const globalErrorHandler = require('../middlewares/globalErrorHandler');

// Global error handler
// router.use(globalErrorHandler);

module.exports = router;