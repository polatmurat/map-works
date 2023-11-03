const express = require('express');
const router = express.Router();
const placeValidation = require('../validations/placeValidation');
const { createPlace, get, fetch, deleteProduct, updatePlace, fetchByAuthor } = require('../controllers/placeController');
const Authorization = require('../services/Authorization');

router.post('/create-place', [Authorization.authorized], createPlace);
router.get('/places/:page', [Authorization.authorized], get);
router.get('/place/:id', [Authorization.authorized], fetch);
router.get('/author/:authorID/places', [Authorization.authorized], fetchByAuthor);
router.put('/places', [Authorization.authorized], updatePlace);
router.delete('/delete-place/:id', [Authorization.authorized], deleteProduct);


module.exports = router;