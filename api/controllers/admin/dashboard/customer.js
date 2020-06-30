const Customer = require("../../../../models/Customer")
const checkId = require("../../../../validators/mongooseId")

// Customer Index
const customerIndex = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    try {
        const customers = await Customer.find()
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            customers_data: customers,
            itemPerPage,
            currentPage
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
            customer_id,
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

        const deletedCustomer = await Customer.findByIdAndDelete(customer_id)

        res.status(200).json({
            customer_id,
            deletedCustomer
        })
    } catch (error) {
        next(error)
    }
}


// Customer filter by limit & gender & customer type
const customerSelectByLimitGender = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
<<<<<<< HEAD
    const { gender } = req.query
=======
    const gender = req.query.gender || "male"
>>>>>>> 2d4cfc2fefda5ef3da5eb106762d59c90dc80742

    try {
        let customers = await Customer.find({ gender })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            customer_data: itemPerPage + " customer fetch by " + gender + ' page ' + currentPage,
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

        res.status(200).json({
            customer
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    customerIndex,
    customerShow,
    customerDelete,
    customerSelectByLimitGender,
    customerFilter
}