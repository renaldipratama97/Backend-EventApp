const { actionQuery } = require('../helpers/actionQuery')

const eventModel = {
    getEvents: (limit, offset, order, title) => {
        return actionQuery(`SELECT * FROM event WHERE title LIKE ? ORDER BY id ${order} LIMIT ${offset},${limit}`, `%${title}%`)
    },
    addEvents: (data) => {
        return actionQuery('INSERT INTO event SET ?', data)
    },
    countAmountDataEvents: (table) => {
        return actionQuery(`SELECT COUNT(*) as totalData FROM ${table}`)
    },
}

module.exports = eventModel