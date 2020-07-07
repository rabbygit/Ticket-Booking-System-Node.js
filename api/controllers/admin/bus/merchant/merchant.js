const Merchant = require("../../../../../models/Merchant")

const checkId = require("../../../../../validators/mongooseId")
// Merchant Index
const merchantIndex = async (req, res, next) => {
    let data = {}
    try {
        data.all_merchant = await Merchant.countDocuments({ merchantType: "bus" })
        data.merchant_request = await Merchant.countDocuments({ merchantType: "bus", status: "inactive" })
        data.all_agent = "Wait for next update"
        data.agent_request = "Wait for next update"

        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
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
const merchantList = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
    const { status } = req.params
    let query = {
        merchantType: "bus"
    }
    try {
        if (status == "inactive") {
            query = {
                ...query,
                status
            }
        }

        let merchants = await Merchant.find(query)
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json(merchants)
    } catch (error) {
        next(error)
    }
}


// Merchant Filter
const filterMerchant = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
    const data = req.query.search || ""
    const { status } = req.params
    let query = {
        merchantType: "bus",
        status
    }
    try {
        if (data != "") {
            query = {
                ...query,
                $text: { $search: data }
            }
        }
        let merchants = await Merchant.find(query)
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json(merchants)
    } catch (error) {
        next(error)
    }
}


// Merchant Profile view
const viewProfile = async (req, res, next) => {
    const merchant_id = req.params.id
    try {
        await checkId(merchant_id)
        let merchant = await Merchant.findById(merchant_id)
        if (!merchant) {
            let error = new Error("Merchant Not Found")
            error.status = 404
            throw error
        }
        res.status(200).json(merchant)
    } catch (error) {
        next(error)
    }
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
const merchantStatusUpdate = async (req, res, next) => {
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

        res.status(200).json(merchant)
    } catch (error) {
        next(error)
    }
}


// Delete Merchant
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
        res.status(200).json(merchant)
    } catch (error) {
        next(error)
    }
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