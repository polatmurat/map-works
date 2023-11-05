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
            if (parsedData.authorID.trim().length === 0) {
                errors.push({ msg: 'The author cannot find!' });
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
                        const place = new Place(parsedData.name, parsedData.category, parsedData.city, parsedData.province, parsedData.coordinates, fields.description[0], parsedData.authorID);
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
    });
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

const fetch = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Place ID is missing in the request.' });
    }


    try {
        const objID = new ObjectId(id);
        const client = await connect();
        const placeCollection = client.db('mapworks').collection('place');

        const response = await placeCollection.findOne({ _id: objID });

        if (!response) {
            return res.status(404).json({ error: 'Place not found.' });
        }

        return res.status(201).json({ place: response });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: 'Server internal error!' });
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

const updatePlace = async (req, res) => {

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
                    const { _id: id, name, category, city, province, coordinates } = parsedData;
                    const description = fields.description[0];
                    await placeCollection.updateOne({ _id: new ObjectId(id) }, { $set: { name, category, city, province, coordinates, description, updatedAt: new Date() } });
                    return res.status(201).json({ msg: 'Place updated successfully.' });
                } catch (error) {
                    console.log(error);
                    res.status(500).json(error);
                }
            } else {
                return res.status(400).json({ errors });
            }
        }
    });

};

const fetchByAuthor = async (req, res) => {
    const { authorID } = req.params;

    if (!authorID) {
        return res.status(400).json({ error: 'The author id is require!' });
    }

    try {
        const client = await connect();
        const placeCollection = client.db('mapworks').collection('place');

        const response = await placeCollection.find({ authorID }).toArray();

        return res.status(200).json({ places: response });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Server internal error!' });
    }
};

const fetchByCategory = async (req, res) => {
    const { category } = req.params;

    if (!category) {
        return res.status(400).json({ error: 'The category is require!' });
    }


    try {
        const client = await connect();
        const placeCollection = client.db('mapworks').collection('place');

        const response = await placeCollection.find({ category }).toArray();

        return res.status(200).json({ place: response });

    } catch (error) {
        console.log(error.message);
    }
};


module.exports = { createPlace, get, deleteProduct, updatePlace, fetch, fetchByAuthor, fetchByCategory };
