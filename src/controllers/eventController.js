const eventModel = require('../models/eventModel')
const { response } = require('../helpers/response')
const { pagination } = require('../helpers/pagination')

const eventController =  {
    getEvent: async(req, res, next) => {
        const { limit = 5, page = 1, order = "ASC" } = req.query
        const offset = (parseInt(page) - 1) * parseInt(limit)
        
        const setPagination = await pagination(limit, page, "event", "event")
        eventModel.getEvents(limit, offset, order)
        .then(results => {
            const setResults = {
                pagination: setPagination,
                events: results
            }
            response(res, setResults,{ status: 'succeed', statusCode: '200' }, null)
        })
        .catch(() => {
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    },
    addEvent: async(req, res) => {
        const { title, participant, location, date, note } = req.body
    
        const data = {
            title,
            participant,
            location,
            date,
            note,
            picture: `${process.env.BASE_URL}/upload/${req.file.filename}`
        }
        eventModel.addEvents(data)
        .then(result => {
            const resultPhone = result
            response(res, {message: 'Add event succesfully'} , { status: 'succeed', statusCode: 200 }, null)
        })
        .catch((err) => {
            console.log(err)
            const error = new createError(500, 'Looks like server having trouble')
            return next(error)
        })
    }
}

module.exports = eventController