const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const connect = require('./config/db');
const userRoute = require('./routes/userRoute');
const placeRoute = require('./routes/placeRoute');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoute);
app.use('/api', placeRoute); 

app.get('/try', async (req, res) => {
    return res.status(200).json({ msg: 'Working' })
});

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is running at ${PORT} port!`.magenta.italic));

const startServer = async () => {
    try {
        const client = await connect();
        const databaseName = client.db('mapworks').databaseName;

        console.log(`MongoDB has been connected --> ${databaseName}`.blue.inverse);
    } catch (error) {
        console.error(`Failed to connect to MongoDB or add product:: ${error.message}`.red.bold);
        // Optionally, you can handle the error further or gracefully terminate the server
        process.exit(1);
    }
}

startServer();

