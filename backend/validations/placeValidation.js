const { body } = require('express-validator');

const placeReg = [
    body('name').not().isEmpty().trim().escape().withMessage('The name field cannot be left blank!'),
    body('category').not().isEmpty().trim().escape().withMessage('The category field cannot be left blank!'),
    body('city').not().isEmpty().trim().escape().withMessage('The city field cannot be left blank!'),
    body('description').not().isEmpty().trim().escape().withMessage('The description field cannot be left blank!'),
    body('coordinate')
        .custom(value => {
            // JSON verisinden latitude ve longitude çıkarın
            const { lat, lng } = value;

            // Koordinatların doğruluğunu kontrol edelim
            if (
                isNaN(parseFloat(lat)) || isNaN(parseFloat(lng)) ||
                parseFloat(lat) < -90 || parseFloat(lat) > 90 ||
                parseFloat(lng) < -180 || parseFloat(lng) > 180
            ) {
                throw new Error('Invalid coordinates. Latitude should be between -90 and 90, and longitude should be between -180 and 180.');
            }

            return true;
        })
];

module.exports = { placeReg };
