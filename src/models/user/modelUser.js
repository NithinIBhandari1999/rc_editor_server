const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxLength: 150,
            trim: true,
            default: '',
        },
        email: {
            type: String,
            required: [true],
            unique: true,
            lowercase: true,
            trim: true,
            default: '',
        },

        statusEmailVerified: {
            type: Boolean,
            default: true,
        },
    },
    {
        collection: 'User',
        timestamps: true,
    }
);

const User = model('User', userSchema);

module.exports = User;