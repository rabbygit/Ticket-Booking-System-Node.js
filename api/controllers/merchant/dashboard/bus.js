const Bus = require("../../../../models/Bus")
const checkId = require("../../../../validators/mongooseId")

// Add Bus
const addBus = async (req, res, next) => {
    const merchant_id = req.params.merchant_id
    const data = req.body
    let message

    try {
        const newData = new Bus({
            merchant: merchant_id,

            busNumber: req.body.busNumber,
            busName: req.body.busName,
            busLogo: req.body.busLogo,
            officeAddress: req.body.officeAddress,
            contactNumber: req.body.contactNumber,
            busType: req.body.busType,
            seatPrice: req.body.seatPrice,
            busName: req.body.busName,
        })

        const newBus = await newData.save()
        res.status(200).json({
            newBus,
            message: true
        })
    } catch (error) {
        next(error)
    }

    res.status(200).json({
        message: `${merchant_id} bus added`
    })
}


// Bus list
const busList = async (req, res, next) => {
    const merchant_id = req.params.merchant_id
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    try {
        await checkId(merchant_id)
        const busses = await Bus.find({ merchant: merchant_id })
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            busses
        })

    } catch (error) {
        next(error)
    }
}


// Filter by date
const filterByDate = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
    let year, month, date;
    const merchant_id = req.params.merchant_id

    try {
        // Check Date
        if (typeof (req.query.date) != "undefined") {
            if (isNaN(Date.parse(req.query.date))) {
                let e = new Error()
                e.status = 400
                throw e
            }

            let searchDate = new Date(req.query.date)
            year = searchDate.getFullYear()
            month = searchDate.getMonth() - 1; // As month index starts from zero
            date = searchDate.getDate()
        }

        await checkId(merchant_id)

        const busses = await Bus.find({})


    } catch (error) {
        next(error)
    }



    res.status(200).json({
        busses: `${date} filter by date`
    })
}


// Filter bus
const filterBus = async (req, res, next) => {
    const limit = req.query.limit
    const currentPage = req.query.currentPage
    const bus_id = req.query.bus_id
    const location = req.query.location
    const seat_price = req.query.seat_price
    const merchant_id = req.params.merchant_id
    const date = req.body.date
    let busses

    try {
        if(bus_id){
            const bus = await Bus.findOne({ busNumber: bus_id })
            res.status(200).json({
                bus
            })
        }

        if(location){
            const bus = await Bus.findOne({ busNumber: location })
            res.status(200).json({
                bus
            })
        }


    } catch (error) {
        next(error)
    }

    res.status(200).json({
        busses: "Filter"
    })
}


// View Bus
const showBus = async (req, res, next) => {
    const bus_id = req.params.bus_id
    const merchant_id = req.params.merchant_id

    try {
        await checkId(bus_id)
        await checkId(merchant_id)
        const bus_info = await Bus.find({ $and: [{ _id: bus_id }, { merchant: merchant_id }] })
        res.status(200).json({
            bus_info
        })

    } catch (error) {
        next(error)
    }
}


// Update Bus
const updateBus = async (req, res, next) => {
    const merchant_id = req.params.merchant_id
    const bus_id = req.params.bus_id
    const data = req.body
    let message

    try {
        await checkId(bus_id)
        await checkId(merchant_id)

        let bus = await Bus.findById(transport_id)
        if (!bus) {
            let e = new Error("Bus not found")
            e.status = 404
            throw e
        }

        let updatedBus = await Bus.findOneAndUpdate(
            { $and: [{ _id: bus_id }, { merchant: merchant_id }] },
            { _id: transport_id },
            { $set: data },
            { new: true }
        )

        res.status(200).json({
            message: true,
            updatedBus
        })

    } catch (error) {
        next(error)
    }


}


// Delete Bus
const deleteBus = async (req, res, next) => {
    const bus_id = req.params.bus_id
    const merchant_id = req.params.merchant_id
    let message

    try {
        await checkId(bus_id)
        await checkId(merchant_id)

        let bus = await Bus.find({ $and: [{ _id: bus_id }, { merchant: merchant_id }] })
        if (!bus) {
            let e = new Error("Bus not found")
            e.status = 404
            throw e
        }

        let deletedBus = await Bus.findByIdAndDelete(transport_id);

        res.status(200).json({
            message: true,
            deletedBus
        })

    } catch (error) {
        next(error)
    }

    res.status(200).json({
        message: `${merchant_id} ${bus_id} delete`
    })
}



module.exports = {
    addBus,
    busList,
    filterByDate,
    filterBus,
    showBus,
    updateBus,
    deleteBus
}