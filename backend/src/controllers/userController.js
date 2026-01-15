const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            token: req.body.token, // Usually token doesn't change on profile update unless we want to refresh it
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

// @desc    Soft delete user account
// @route   DELETE /api/users/profile
// @access  Private
const deleteUserAccount = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.isDeleted = true;
        await user.save();
        res.json({ message: 'User account deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    deleteUserAccount,
};
