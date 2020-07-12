const Customer = require("../../../../../models/Customer")
const checkId = require("../../../../../validators/mongooseId")

// Customer Index
const customerIndex = async (req, res, next) => {

    try {
        const customers = await Customer.find({ customerType: "bus" })

        res.status(200).json({
            customers
        })
    } catch (error) {
        next(error)
    }
}

// Filter customer by gender
const filterCustomer = async (req, res, next) => {
    const gender = req.params.gender

    try {
        let customers = await Customer.find({ customerType: "bus", gender })

        res.status(200).json({
            customers
        })
    } catch (error) {
        next(error)
    }
}

// Show customer by phone number
const customerFilterByNumber = async (req, res, next) => {
    const phoneNumber = req.params.number;

    try {
        const customer = await Customer.findOne({ customerType: "bus", phoneNumber })

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

// Show customer by specific id
const customerShow = async (req, res, next) => {
    const customer_id = req.params.id

    try {
        await checkId(customer_id)

        const customer = await Customer.find({ _id: customer_id, customerType: "bus" })

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

        await Customer.findOneAndDelete({ _id: customer_id, customerType: "bus" })

        res.status(200).json({
            success: true,
            customer
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    customerIndex,
    customerFilterByNumber,
    filterCustomer,
    customerShow,
    customerDelete
}