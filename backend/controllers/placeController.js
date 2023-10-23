const { ObjectId } = require('mongodb');
const connect = require('../config/db');
const Place = require('../models/Place');
const { validationResult } = require('express-validator');
const formidable = require('formidable'); // formidable kütüphanesini ekledim

const createPlace = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true });
    form.parse(req, async (err, fields) => {
        if (!err) {
            const parsedData = JSON.parse(fields.data);
            const errors = [];
            if (parsedData.name.trim().length === 0) {
                errors.push({ msg: 'The name field cannot be left blank!' });
            }
            if (parsedData.category.trim().length === 0) {
                errors.push({ msg: 'The category field cannot be left blank!' });
            }
            if ((parsedData.coordinates.lat).trim().length === 0 || (parsedData.coordinates.lng).trim().length === 0) {
                errors.push({ msg: 'The both coordinates must be filled!' });
            }
            if (errors.length === 0) {
                try {
                    const client = await connect();
                    const placeCollection = client.db('mapworks').collection('place');
                    const placeExists = await placeCollection.findOne({ 'coordinates.lat': parsedData.coordinates.lat, 'coordinates.lng': parsedData.coordinates.lng });
                    if (!placeExists) {
                        const place = new Place(parsedData.name, parsedData.category, parsedData.city, parsedData.province, parsedData.coordinates, fields.description[0]);
                        await placeCollection.insertOne(place);
                        return res.status(201).json({ msg: 'Place created successfully.' });
                    } else {
                        return res.status(400).json({ errors: [{ msg: `This place is already created.`, path: 'coordinates' }] });
                    }
                } catch (error) {
                    console.log(error);
                    res.status(500).json(error);
                }
            } else {
                return res.status(400).json({ errors });
            }
        }
    }); // Eksik parantezi burada ekledim
};

const get = async (req, res) => {
    const { page } = req.params;
    const perPage = 5;
    const skip = (page - 1) * perPage;
    try {
        const client = await connect();
        const placeCollection = client.db('mapworks').collection('place');
        const count = await placeCollection.countDocuments();
        const cursor = placeCollection.find({}).skip(skip).limit(perPage).sort({ updatedAt: -1 }); // Cursor handling.
        const response = await cursor.toArray();
        return res.status(200).json({ perPage, count, places: response });
    } catch (error) {
        console.log(error.message);
    }

};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const objID = new ObjectId(id);
        const client = await connect();
        const placeCollection = client.db('mapworks').collection('place');

        await placeCollection.deleteOne({ _id: objID });
        return res.status(201).json({ msg: 'Place has been deleted successfully.' });
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAll = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
};

module.exports = { createPlace, get, deleteProduct };
