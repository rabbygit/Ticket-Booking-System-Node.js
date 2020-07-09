const bcrypt = require("bcryptjs")

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
const addMerchant = async (req, res, next) => {
    let { name, companyName, phoneNumber, email, password, address } = req.body.data

    if (typeof email == "undefined" || typeof password == "undefined") {
        return res.status(500).json({
            success: false,
            message: ["Email and Password required"]
        })
    }

    try {
        let merchant = await Merchant.findOne({ $or: [{ email }, { phoneNumber }] })

        if (merchant) {
            return res.status(409).json({
                success: false,
                message: ["Merchant exists"]
            })
        }

        let hashPassword = await bcrypt.hash(password, 11)

        let newMerchant = new Merchant({
            name,
            companyName,
            address,
            email,
            phoneNumber,
            password: hashPassword,
            merchantType: "bus",
            status: "inactive",
            role: "merchant"
        })

        await newMerchant.save()

        res.status(201).json({
            success: true,
            message: ["Merchant added successfully"],
            newMerchant
        })
    } catch (error) {
        if (error.name == 'ValidationError') {
            let message = []
            for (field in error.errors) {
                message.push(error.errors[field].message)
            }

            return res.status(500).json({
                success: false,
                message
            })
        }

        next(error)
    }
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


// Merchant Filter and search
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
            merchant = await Merchant.findOneAndUpdate(
                { _id: merchant_id },
                { $set: { status: "inactive" } },
                { new: true }
            ).exec()
        } else {
            merchant = await Merchant.findOneAndUpdate(
                { _id: merchant_id },
                { $set: { status: "active" } },
                { new: true }
            ).exec()
        }

        res.status(200).json({
            success: true,
            merchant
        })
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
        res.status(200).json({
            success: true
        })
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