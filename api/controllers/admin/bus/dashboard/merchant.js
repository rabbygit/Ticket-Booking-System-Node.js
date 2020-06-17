

// Merchant Index
const merchantIndex = (req, res) => {
    const limit = req.params.limit
    let merchants = "Merchant list " + limit

    res.status(200).json({
        merchant_data: merchants
    })
}


// Filter Merchant ID
const filterMerchantById = (req, res) => {
    const merchant_id = req.body.merchant_id
    let merchant = "Merchant " + merchant_id

    res.status(200).json({
        merchant: merchant
    })
}


// Merchant status
const changeMerchantStatus = (req, res) => {
    const merchant_id = req.body.merchant_id
    const status = req.body.status

    let message

    res.status(200).json({
        message: true
    })
}


// Merchant Profile
const showMerchantProfile = (req, res) => {
    const merchant_id = req.params.id

    let merchant = "Merchant profile " + merchant_id
    res.status(200).json({
        merchant
    })
}


// Merchant Dashboard
const merchantDashboard = (req, res) => {
    const merchant_id = req.params.id

    let merchant = "Merchant dashboard " + merchant_id
    res.status(200).json({
        merchant
    })
}


// Delete merchant
const deleteMerchant = (req, res) => {
    const merchant_id = req.params.id
    let message

    res.status(200).json({
        message
    })
}


module.exports = {
    merchantIndex,
    filterMerchantById,
    changeMerchantStatus,
    showMerchantProfile,
    merchantDashboard,
    deleteMerchant
}