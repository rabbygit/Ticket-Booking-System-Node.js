const Merchant = require("../../../../../models/Merchant")
const checkId = require("../../../../../validators/mongooseId")
// Merchant Index
const merchantIndex = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    try {
        let merchants = await Merchant.find({ merchantType: "bus" })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            merchants
        })
    } catch (error) {
        next(error)
    }
}


// Filter Merchant company name
const filterMerchant = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
    const data = req.query.search
    try {
        let merchant = await Merchant.find({ $text: { $search: data } })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            merchant
        })
    } catch (error) {
        next(error)
    }
}


// Merchant status
const changeMerchantStatus = async (req, res, next) => {
    const merchant_id = req.params.id

    try {
        await checkId(merchant_id)
        let merchant = await Merchant.findById(merchant_id).exec()

        if (!merchant) {
            let error = new Error("Merchant Not Found")
            error.status = 404
            throw error
        }

        if (merchant.status == "active") {
            await Merchant.findOneAndUpdate(
                { _id: merchant_id },
                { $set: { status: "inactive" } },
                { $new: true }
            )
        } else {
            await Merchant.findOneAndUpdate(
                { _id: merchant_id },
                { $set: { status: "active" } },
                { $new: true }
            )
        }

        merchant = await Merchant.findById(merchant_id)

        res.status(200).json({
            merchant
        })
    } catch (error) {
        next(error)
    }
}


// Merchant Profile
const showMerchantProfile = async (req, res, next) => {
    const merchant_id = req.params.id
    try {
        await checkId(merchant_id)
        let merchant = await Merchant.findById(merchant_id)
        if (!merchant) {
            let error = new Error("Merchant Not Found")
            error.status = 404
            throw error
        }
        res.status(200).json({
            merchant
        })
    } catch (error) {
        next(error)
    }
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
const deleteMerchant = async (req, res, next) => {
    const merchant_id = req.params.id
    try {
        await checkId(merchant_id)
        let merchant = await Merchant.findById(merchant_id)
        if (!merchant) {
            let error = new Error("Merchant Not Found")
            error.status = 404
            throw error
        }
        await Merchant.findByIdAndDelete(merchant_id)
        res.status(200).json({
            merchant
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    merchantIndex,
    filterMerchant,
    changeMerchantStatus,
    showMerchantProfile,
    merchantDashboard,
    deleteMerchant
}