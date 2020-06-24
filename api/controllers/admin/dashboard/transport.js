const Bus = require("../../../../models/Bus")
const Trip = require("../../../../models/Trip")

const checkId = require("../../../../validators/mongooseId")

// Transports index 
const transportIndex = async (req, res, next) => {

    let itemPerPage = parseInt(req.query.limit) || 50
    let currentPage = parseInt(req.query.currentPage) || 1

    try {
        const transports = await Bus.find()
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            itemPerPage,
            currentPage,
            transports_data: transports
        })
    } catch (error) {
        next(error)
    }
}


// Transport show
const transportShow = async (req, res, next) => {

    const transport_id = req.params.id
    let transport_type = req.params.type || "Bus"
    let transport = null;

    try {
        // Check valid mongodb id
        await checkId(transport_id)

        switch (transport_type) {
            case "Bus":
                transport = await Bus.findById(transport_id)
                break;
            //Other switch case for different types of transport
            default:
                let e = new Error()
                e.status = 404
                throw e
        }

        res.status(200).json({
            transport_data: transport
        })
    } catch (e) {
        next(e)
    }
}


// Transport edit
const transportEdit = async (req, res, next) => {
    const transport_id = req.params.id
    let transport_type = req.params.type || "Bus"
    let transport = null;

    try {
        // Check valid mongodb id
        await checkId(transport_id)

        switch (transport_type) {
            case "Bus":
                transport = await Bus.findById(transport_id)
                break;
            //Other switch case for different type of transport
            default:
                let e = new Error()
                e.status = 404
                throw e
        }

        res.status(200).json({
            transport_data: transport
        })
    } catch (e) {
        next(e)
    }
}


// Transport update
const transportUpdate = async (req, res, next) => {
    const transport_id = req.params.id
    const transport_type = req.params.type
    const updatedData = req.body
    let transport = null;

    try {
        // Check valid mongodb id
        await checkId(transport_id)

        switch (transport_type) {
            case "Bus":
                transport = await Bus.findById(transport_id)
                break;
            //Other switch case for different type of transport
            default:
                let e = new Error()
                e.status = 404
                throw e
        }

        let updatedTransport = await Bus.findOneAndUpdate(
            { _id: transport_id },
            { $set: updatedData },
            { new: true }
        )

        res.status(200).json({
            transport_data: transport_id + "transport updated" + ' ' + transport_type,
            updatedTransport
        })
    } catch (error) {
        next(error)
    }
}


// Transport delete
const transportDelete = async (req, res, next) => {
    const transport_id = req.params.id
    const transport_type = req.params.type
    let deletedTransport = null;

    try {
        await checkId(transport_id)

        switch (transport_type) {
            case "Bus":
                deletedTransport = await Bus.findByIdAndDelete(transport_id)
                break;
            //Other switch case for different types of transport
            default:
                let e = new Error()
                e.status = 404
                throw e
        }

        res.status(200).json({
            transport_data: transport_id + " transport is deleted",
            deletedTransport
        })

    } catch (error) {
        next(error)
    }
}



// Filter by date
const filterByDate = async (req, res, next) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1

    try {
        // Check valid date 
        if (isNaN(Date.parse(req.body.date))) {
            let e = new Error()
            e.status = 400
            throw e
        }

        let searchDate = new Date(req.body.date)
        let year = searchDate.getFullYear()
        let month = searchDate.getMonth() - 1;// As month index starts from 0
        let date = searchDate.getDate()

        let filteredTransport = await Trip
            .find({ departureTime: { $gte: new Date(year, month, date), $lt: new Date(year, month, date + 1) } })
            .populate("bus")
            .skip((itemPerPage * currentPage) - itemPerPage)
            .limit(itemPerPage)

        res.status(200).json({
            transport_data: date + "Filter by date" + limit + ' ' + currentPage,
            filteredTransport
        })
    } catch (error) {
        next(error)
    }
}


// Filter Transport 
const filterTransport = (req, res) => {
    const itemPerPage = parseInt(req.query.limit) || 50
    const currentPage = parseInt(req.query.currentPage) || 1
    const transport_type = req.query.type
    const transportNumber = req.query
    let transports_data = null;
    try {
        switch (transport_type) {
            case "Bus":
                transports_data = await Bus.find({ busNumber: transportNumber })
                    .skip((itemPerPage * currentPage) - itemPerPage)
                    .limit(itemPerPage)
                break;
            //Other switch case for different types of transport
            default:
                let e = new Error()
                e.status = 404
                throw e
        }

        res.status(200).json({
            transports_data,
            itemPerPage,
            currentPage
        })

    } catch (error) {
        next(error)
    }
}


module.exports = {
    transportIndex,
    transportShow,
    transportEdit,
    transportUpdate,
    transportDelete,
    filterByDate,
    filterTransport
}