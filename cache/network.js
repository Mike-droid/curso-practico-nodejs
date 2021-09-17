const express = require('express');

const response = require('../network/response');
const Store = require('../store/redis');

const router = express.Router();

router.get('/:tabla', list)
router.get('/:tabla/:id', get)
router.put('/:tabla', upsert)

async function list(req, res, next) {
  try {
    const datos = await Store.list(req.params.tabla);
    response.success(req, res, datos, 200);
  } catch (error) {
    next(error);
  }
}

async function get(req, res, next) {
  try {
    const datos = await Store.get(req.params.tabla, req.params.id);
    response.success(req, res, datos, 200);
  } catch (error) {
    next(error);
  }
}

async function upsert(req, res, next) {
  try {
    const datos = await Store.upsert(req.params.tabla);
    response.success(req, res, datos, 200);
  } catch (error) {
    next(error);
  }
}

module.exports = router;