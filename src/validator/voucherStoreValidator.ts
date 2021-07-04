const { body, validationResult, } = require('express-validator')

export default [
    body('title').notEmpty(),
    body('expiredAt').notEmpty(),
    body('amount').notEmpty(),
    body('quantity').notEmpty(),
    body('type').notEmpty(),
    body('limitPerUser').notEmpty(),
    body('discountPayment').notEmpty(),
    body('discountValue').notEmpty(),
    body('isActive').isBoolean(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    },
]
