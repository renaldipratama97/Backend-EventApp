const { actionQuery } = require('../helpers/actionQuery')

const eventModel = {
    getEvents: (limit, offset, order) => {
        return actionQuery(`SELECT * FROM event ORDER BY id ${order} LIMIT ${offset},${limit}`)
    },
    addEvents: (data) => {
        return actionQuery('INSERT INTO event SET ?', data)
    },
    countAmountDataEvents: (table) => {
        return actionQuery(`SELECT COUNT(*) as totalData FROM ${table}`)
    },
}

module.exports = eventModel