const asyncHandler = require('express-async-handler')
const User = require('../modals/userModal')
const Note = require('../modals/noteModel')
const Ticket = require('../modals/ticketModel')


// @desc Get Notes for a ticket
// @route GET /api/tickets/:ticketId/notes
// @access Private

const getNotes = asyncHandler(async(req, res) => {
    // Get user using the ID and JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User Not Found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorized')

    }

    const notes = await Note.find({ticket: req.params.ticketId})
    res.status(200).json(notes)

}) 

// @desc Create ticket note 
// @route POST /api/tickets/:ticketId/notes
// @access Private

const addNote = asyncHandler(async(req, res) => {
    // Get user using the ID and JWT
    const user = await User.findById(req.user.id)

    if(!user){
        res.status(401)
        throw new Error('User Not Found')
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not Authorized')

    }

    const note = await Note.create({
        ticket: req.params.ticketId, 
        text: req.body.text,
        isStaff: false,
        user: req.user.id
    })
    res.status(200).json(note)

}) 

module.exports = {
    getNotes,
    addNote
};