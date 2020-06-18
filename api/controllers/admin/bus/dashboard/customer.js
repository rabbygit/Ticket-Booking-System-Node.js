
// Customer List
const customerIndex = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    let bus_customers = "Bus customers " + limit + " " + currentPage

    res.status(200).json({
        bus_customers_data: bus_customers
    })
}


// Limit Customer Select
const limitCustomerSelect = (req, res) => {
    const limit = req.params.limit
    let bus_customers = "Limit Bus customers " + limit

    res.status(200).json({
        bus_customers_data: bus_customers
    })
}

// Filter using gender
const filterCustomeByGender = (req, res) => {
    const gender = req.params.gender
    const limit = req.query.limit
    const currentPage = req.query.currentPage

    let bus_customers = "Bus customers by gender " + gender + ' ' + limit + ' ' + currentPage

    res.status(200).json({
        bus_customers_data: bus_customers
    })
}


// Filter customer with phone
const filterCustomer = (req, res) => {
    const data = req.body.data
    const limit = req.query.limit
    const currentPage = req.query.currentPage

    let bus_customers = "Bus customers filter by " + data + ' ' + limit + ' ' + currentPage

    res.status(200).json({
        bus_customers_data: bus_customers
    })
}


// Show customer info
const customerShow = (req, res) => {
    const customer_id = req.params.id

    let customer = "This customer " + customer_id
    res.status(200).json({
        bus_customer_info: customer
    })
}


module.exports = {
    customerIndex,
    limitCustomerSelect,
    filterCustomeByGender,
    filterCustomer,
    customerShow
}