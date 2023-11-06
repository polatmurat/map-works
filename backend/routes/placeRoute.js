const express = require('express');
const router = express.Router();
const placeValidation = require('../validations/placeValidation');
const { createPlace, get, fetch, deletePlace, updatePlace, fetchByAuthor, fetchByCategory, getAllPlaces } = require('../controllers/placeController');
const Authorization = require('../services/Authorization');

router.post('/create-place', [Authorization.authorized], createPlace);
router.get('/places/:page', [Authorization.authorized], get);
router.get('/all-places', [Authorization.authorized], getAllPlaces);
router.get('/place/:id', [Authorization.authorized], fetch);
router.get('/places/author/:authorID', [Authorization.authorized], fetchByAuthor);
router.get('/places/category/:category', [Authorization.authorized], fetchByCategory);
router.put('/places', [Authorization.authorized], updatePlace);
router.delete('/delete-place/:id', [Authorization.authorized], deletePlace);


module.exports = router;