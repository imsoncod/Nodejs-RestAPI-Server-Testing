const express = require('express')
const router = express.Router()
const ctrl = require('./controller/users.ctrl')

router.get('/', ctrl.getUser)

router.get('/:id', ctrl.getUserById)

router.post('/', ctrl.insertUser)

router.delete('/:id', ctrl.deleteUser)

module.exports = router