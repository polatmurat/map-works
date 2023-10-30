const { body } = require('express-validator');

const placeValidation = [
    body('name').not().isEmpty().trim().escape().withMessage('The name field cannot be left blank!'),
    body('category').not().isEmpty().trim().escape().withMessage('The category field cannot be left blank!'),
    body('description').not().isEmpty().trim().escape().withMessage('The description field cannot be left blank!'),
    body('coordinates')
        .custom(value => {
            // JSON verisinden latitude ve longitude çıkarın
            const { lat, lng } = value;

            // Koordinatların doğruluğunu kontrol edelim
            if (!lat && !lng) {
                return false;
            }

            return true;
        })
];

module.exports = placeValidation;
