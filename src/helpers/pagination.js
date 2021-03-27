const { countAmountDataEvents } = require('../models/eventModel')

exports.pagination = async (limit, page, endpoint, table) => {
    const events = await countAmountDataEvents(table)
    const totalData = events[0].totalData
    const totalPage = Math.ceil(totalData / limit)
    const setPagination = {
        totalData: totalData,
        totalPage,
        currentPage: page,
        perPage: limit,
        prevPage: page > 1 ? `${process.env.BASE_URL}/${endpoint}?page=${parseInt(page) - 1}&limit=${limit}` : null,
        nextPage: page < totalPage ? `${process.env.BASE_URL}/${endpoint}?page=${parseInt(page) + 1}&limit=${limit}` : null,
    }
    return setPagination
}