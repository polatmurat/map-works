const express = require('express');
const router = express.Router();
const { createPlace, get, deleteProduct } = require('../controllers/placeController');
const Authorization = require('../services/Authorization');

router.post('/create-place', [Authorization.authorized], createPlace);
router.get('/places/:page', [Authorization.authorized], get);
router.delete('/delete-place/:id', [Authorization.authorized], deleteProduct);


module.exports = router;