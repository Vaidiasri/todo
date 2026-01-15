const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Middleware to exclude soft deleted users from find queries
UserSchema.pre(/^find/, function(next) {
    // Check if we are explicitly asking for deleted users (e.g. admin might want to see them)
    // For now, let's just default to excluding them unless specified otherwise in the query
    if (this._conditions.isDeleted === undefined) {
        this.where({ isDeleted: false });
    }
    next();
});

// Encrypt password before save
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to verify password
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
