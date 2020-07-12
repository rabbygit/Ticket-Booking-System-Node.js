const Customer = require("../../../../models/Customer")
const checkId = require("../../../../validators/mongooseId")

// Customer Index
const customerIndex = async (req, res, next) => {

    try {
        const customers = await Customer.find().exec()

        res.status(200).json({
            customers
        })
    } catch (error) {
        next(error)
    }
}


// Customer show
const customerShow = async (req, res, next) => {
    const customer_id = req.params.id

    try {
        await checkId(customer_id)

        const customer = await Customer.findById(customer_id)

        if (!customer) {
            let error = new Error("Customer Not Found")
            error.status = 404
            throw error
        }

        res.status(200).json({
            customer
        })
    } catch (error) {
        next(error)
    }
}


// Customer delete
const customerDelete = async (req, res, next) => {
    const customer_id = req.params.id

    try {
        await checkId(customer_id)

        const customer = await Customer.findById(customer_id)

        if (!customer) {
            let error = new Error()
            error.status = 404
            throw error
        }

        await Customer.findByIdAndDelete(customer_id)

        res.status(200).json({
            success: true,
            customer
        })
    } catch (error) {
        next(error)
    }
}


// Customer filter by limit & gender & customer type
const customerFilterByGender = async (req, res, next) => {
    const gender = req.params.gender
    try {
        let customers = await Customer.find({ gender })

        res.status(200).json({
            customers
        })
    } catch (error) {
        next(error)
    }
}


// Customer search by phone number
const customerFilter = async (req, res, next) => {
    const phoneNumber = req.params.number;

    try {
        const customer = await Customer.findOne({ phoneNumber })

        if (!customer) {
            let error = new Error("Customer Not Found")
            error.status = 404
            throw error
        }

        res.status(200).json({ customer })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    customerIndex,
    customerShow,
    customerDelete,
    customerFilterByGender,
    customerFilter
}