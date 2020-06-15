const { Schema, model } = require("mongoose")

const validateEmail = function (email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
};

const customerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: [validateEmail, 'Please provide a valid email address']
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (v) {
                // Bangladeshi phone number
                return /^(?:\+?88)?01[15-9]\d{8}$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    role: {
        type: String,
        default: "merchant",
        validate: {
            validator: function (v) {
                // Check the role
                return /(?:^|\W)customer(?:$|\W)/.test(v);
            },
            message: () => `Role is not valid`
        },
    }
}, {
    timestamps: true
})

const Customer = model('Customer', customerSchema)

module.exports = Customer;