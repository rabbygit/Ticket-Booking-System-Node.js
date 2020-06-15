

// Customer Index
const customerIndex = (req, res) => {
    const limit = req.params.limit;
    const customers = "customers index " + limit;

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
    const limit = req.params.limit
    const gender = req.params.gender

    res.status(200).json({
        customer_data: limit + " customer fetch by " + gender
    })
}


// Customer filter by phone
const customerFilterByPhone = (req, res) => {
    const phone = req.body.phone
    const limit = req.body.limit

    res.status(200).json({
        customer_data: phone + " customer fetch by " + limit
    })
}




module.exports = {
    customerIndex,
    customerShow,
    customerDelete,
    customerSelectByLimitGender,
    customerFilterByPhone
}