const express = require('express')

const response = require('../../../network/response')
const Controller = require('./index')

const router = express.Router()

// Routes
router.get('/', list)
router.post('/', get)
router.post('/', upsert)
router.put('/', upsert)

function list(req, res) {
  Controller.list()
    .then(lista => {
      response.success(req, res, lista, 200)
    })
    .catch(error => {
      response.error(req, res, error.message, 500)
    })
}

function get(req, res) {
  Controller.get(req.params.id)
    .then(user => {
      response.success(req, res, user, 200)
    })
    .catch(error => {
      response.error(req, res, error.message, 500)
    })
}

function upsert(req, res) {
  Controller.upsert(req.body)
    .then(user => {
      response.success(req, res, user, 201)
    })
    .catch(error => {
      response.error(req, res, error.message, 500)
    })
}

module.exports = router