
// Customer List
const customerIndex = (req, res) => {
    const limit = req.params.limit
    let bus_customers = "Bus customers " + limit

    res.status(200).json({
        bus_customers_data: bus_customers
    })
}


// Filter using gender
const filterCustomeByGender = (req, res) => {
    const gender = req.params.gender
    const limit = req.params.limit

    let bus_customers = "Bus customers by gender" + gender + ' ' + limit

    res.status(200).json({
        bus_customers_data: bus_customers
    })
}


// Filter customer with phone
const filterCustomerByPhone = (req, res) => {
    const phone = req.body.phone
    const limit = req.body.limit

    let bus_customers = "Bus customers by phone" + phone + ' ' + limit

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
    filterCustomeByGender,
    filterCustomerByPhone,
    customerShow
}