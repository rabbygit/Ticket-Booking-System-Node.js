const { Schema, model } = require("mongoose")

const validateEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
};

const merchantSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: 50,
    },
    companyName: {
        type: String,
        required: [true, "Company name is required"],
        trim: true,
        maxlength: 100,
        index: true
    },
    companyLogo: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Email address is not valid.']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Phone number is required'],
        trim: true,
        unique: true,
        index: true,
        validate: {
            validator: function (v) {
                // Bangladeshi phone number
                return /^(?:\+?88)?01[15-9]\d{8}$/.test(v);
            },
            message: `Phone number is not valid.`
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    merchantType: [String],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "inactive"
    },
    role: {
        type: String,
        default: "merchant",
        validate: {
            validator: function (v) {
                // Check the role
                return /(?:^|\W)merchant(?:$|\W)/.test(v);
            },
            message: () => `Role is not valid`
        },
    }
}, {
    timestamps: true
})

const Merchant = model('Merchant', merchantSchema)

module.exports = Merchant;