const express = require('express')
const router = express.Router()
const { addEvent, getEvent } = require('../controllers/eventController')
const multer = require('multer')
const { uploadMulter } = require('../middleware/upload')

const upload = (req, res, next) => {
    const handleUpload = uploadMulter.single('picture')
    handleUpload(req, res, error => {
        if (error instanceof multer.MulterError) {
            return res.status(400).send({
                status: 'Failed',
                message: 'File too large'
            })
        }
        
        if (error) {
            return res.status(500).send({
                status: 'Failed',
                message: 'Internal server error'
            })
        }
        next()
    })
}

router
.get('/', getEvent)
.post('/addevent', upload, addEvent)
module.exports = router
