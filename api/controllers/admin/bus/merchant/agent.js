

// Add agent
const addAgent = (req, res, next) => {
    let data = req.body.data
    let message

    res.status(200).json({
        message: `${data} agent added`
    })
}


// agent List
const agentList = (req, res, next) => {
    let limit = req.query.limit
    let currentPage = req.query.currentPage
    let agent_status = req.params.status
    let agentList

    res.status(200).json({
        agentList: `total agents ${limit} ${currentPage} ${agent_status}`
    })
}


// agent Filter
const filterAgent = (req, res, next) => {
    let limit = req.query.limit
    let currentPage = req.query.currentPage

    let agent_status = req.query.status
    let agentId = req.query.agent_id
    let agentContact = req.query.contact
    let agentAddress = req.query.agent_address
    let agentList

    res.status(200).json({
        agentList: `filter agents ${limit} ${currentPage}`
    })
}


// agent Profile view
const viewProfile = (req, res, next) => {
    const agent_id = req.params.id
    let agent_info

    res.status(200).json({
        agent_info: `${agent_id} information`
    })
}


// agent Dashboard view
const agentDashboard = (req, res, next) => {
    const agent_id = req.params.id
    let agent_dashboard

    res.status(200).json({
        agent_dashboard: `${agent_id} dashboard`
    })
}


// agent Status Update
const agentStatusUpdate = (req, res, next) => {
    let agentId = req.params.id
    let status = req.body.status
    let message

    res.status(200).json({
        message: true
    })
}


// Delete agent
const deleteAgent = (req, res, next) => {
    let agentId = req.params.id
    let message

    res.status(200).json({
        message: true
    })
}


module.exports = {
    addAgent,
    agentList,
    filterAgent,
    viewProfile,
    agentDashboard,
    agentStatusUpdate,
    deleteAgent
}