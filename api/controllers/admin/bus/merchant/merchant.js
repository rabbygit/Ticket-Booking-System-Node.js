

// Merchant Index
const merchantIndex = (req, res, next) => {
    let all_merchant
    let merchant_request
    let all_agent
    let agent_request

    res.status(200).json({
        all_merchant: "All merchant count",
        merchant_request: "All merchant request count",
        all_agent: "All agent count",
        agent_request: "All agent request count",
    })
}


// Add Merchant
const addMerchant = (req, res, next) => {
    let data = req.body.data
    let message

    res.status(200).json({
        message: `${data} merchant added`
    })
}


// Merchant List
const merchantList = (req, res, next) => {
    let limit = req.query.limit
    let currentPage = req.query.currentPage
    let merchant_status = req.params.status
    let merchantList

    res.status(200).json({
        merchantList: `total Merchants ${limit} ${currentPage} ${merchant_status}`
    })
}


// Merchant Filter
const filterMerchant = (req, res, next) => {
    let limit = req.query.limit
    let currentPage = req.query.currentPage

    let merchant_status = req.query.status
    let merchantId = req.query.merchant_id
    let merchantContact = req.query.contact
    let merchantAddress = req.query.merchant_address
    let merchantList

    res.status(200).json({
        merchantList: `filter Merchants ${limit} ${currentPage}`
    })
}


// Merchant Profile view
const viewProfile = (req, res, next) => {
    const merchant_id = req.params.id
    let merchant_info

    res.status(200).json({
        merchant_info: `${merchant_id} information`
    })
}


// Merchant Dashboard view
const merchantDashboard = (req, res, next) => {
    const merchant_id = req.params.id
    let merchant_dashboard

    res.status(200).json({
        merchant_dashboard: `${merchant_id} dashboard`
    })
}


// Merchant Status Update
const merchantStatusUpdate = (req, res, next) => {
    let merchantId = req.params.id
    let status = req.body.status
    let message

    res.status(200).json({
        message: true
    })
}


// Delete Merchant
const deleteMerchant = (req, res, next) => {
    let merchantId = req.params.id
    let message

    res.status(200).json({
        message: true
    })
}


module.exports = {
    merchantIndex,
    addMerchant,
    merchantList,
    filterMerchant,
    viewProfile,
    merchantDashboard,
    merchantStatusUpdate,
    deleteMerchant
}