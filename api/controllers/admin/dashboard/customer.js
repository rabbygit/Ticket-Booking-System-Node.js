

// Customer Index
const customerIndex = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const customers = "customers index " + limit + ' ' + currentPage;

    res.status(200).json({
        customers_data: customers
    })
}


// Customer show
const customerShow = (req, res) => {
    const customer_id = req.params.id

    res.status(200).json({
        customer_data: customer_id
    })
}


// Customer delete
const customerDelete = (req, res) => {
    const customer_id = req.params.id

    res.status(200).json({
        customer_data: customer_id + "customer deleted"
    })
}


// Customer select by limit & gender
const customerSelectByLimitGender = (req, res) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const gender = req.params.gender

    res.status(200).json({
        customer_data: limit + " customer fetch by " + gender + ' page ' + currentPage
    })
}


// Customer filter by phone
const customerFilter = (req, res) => {
    const data = req.body.data
    const limit = req.body.limit
    const currentPage = req.body.currentPage

    res.status(200).json({
        customer_data: data + " customer fetch by " + limit + ' ' + currentPage
    })
}




module.exports = {
    customerIndex,
    customerShow,
    customerDelete,
    customerSelectByLimitGender,
    customerFilter
}