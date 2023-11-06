const connect = require('../config/db');
const Category = require('../models/Category');
const { ObjectId } = require('mongodb');

const createCategory = async (req, res) => {

    const { name } = req.body;

    if (name) {
        try {

            const client = await connect();
            const categoryCollection = client.db('mapworks').collection('category');

            const categoryExist = await categoryCollection.findOne({ name });

            if (!categoryExist) {
                const newCategory = new Category(name);

                await categoryCollection.insertOne(newCategory);

                return res.status(201).json({ msg: 'Category created successfully.' });
            } else {
                return res.status(400).json({ errors: [{ msg: `${name} is already exists!` }] });
            }

        } catch (error) {
            console.log(error.message);
            return res.status(500).json('Server internal error.');
        }
    } else {
        return res.status(400).json({ errors: [{ msg: 'The category field cannot be left blank!' }] });
    }

};


const categories = async (req, res) => {
    const page = req.params.page;
    const perPage = 3;
    const skip = (page - 1) * perPage;

    try {

        const client = await connect();
        const categoryCollection = client.db('mapworks').collection('category');

        const count = await categoryCollection.countDocuments();
        const cursor = categoryCollection.find({}).skip(skip).limit(perPage).sort({ updatedAt: -1 });
        const response = await cursor.toArray();
        return res.status(200).json({ perPage, count, categories: response });
    } catch (error) {
        console.log(error.message);
    }
};


const fetchCategory = async (req, res) => {

    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Category ID is missing in the request.' });
    }

    try {

        const objID = new ObjectId(id);
        const client = await connect();
        const categoryCollection = client.db('mapworks').collection('category');

        const response = await categoryCollection.findOne({ _id: objID });

        if (!response) {
            return res.status(404).json({ error: 'Category not found.' });
        }

        return res.status(200).json({ category: response });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: 'Server internal error!' });
    }

};

const updateCategory = async (req, res) => {
    const { id } = req.params;
    const objID = new ObjectId(id);
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ errors: [{ msg: 'name field cannot be blank.' }] })
    }

    try {
        const client = await connect();
        const categoryCollection = client.db('mapworks').collection('category');

        const categoryExist = await categoryCollection.findOne({ name });

        if (!categoryExist) {
            await categoryCollection.updateOne({ _id: objID }, { $set: { name } });
            return res.status(201).json({ msg: 'The category has been updated successfully.' });
        } else {
            return res.status(400).json({ errors: [{ msg: `${name} is already exists!` }] });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Server internal error!");
    }

};

const deleteCategory = async (req, res) => {
    const { id } = req.params;
    const objID = new ObjectId(id);
    if (!id) {
        return res.status(400).json({ errors: [{ msg: 'ID cannot left blank.' }] });
    }

    try {
        const client = await connect();
        const categoryCollection = client.db('mapworks').collection('category');

        const categoryExist = await categoryCollection.findOne({ _id: objID });

        if (categoryExist) {
            await categoryCollection.deleteOne({ _id: objID });
            return res.status(201).json({ msg: 'The category has been deleted successfully.' });
        } else {
            return res.status(400).json({ errors: [{ msg: `${objID} doesn't exists!` }] });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Server internal error!");
    }
};

const getAllCategories = async (req, res) => {
    try {
        const client = await connect();
        const categoryCollection = client.db('mapworks').collection('category');
        const categoriesCursor = categoryCollection.find({}); // Get the cursor
        const categories = await categoriesCursor.toArray(); // Convert the cursor to an array, await is important :)
        return res.status(200).json({ categories });

    } catch (error) {
        console.log(error.message);
        return res.status(500).json("Server internal error!");
    }
};

module.exports = { createCategory, categories, fetchCategory, updateCategory, deleteCategory, getAllCategories };