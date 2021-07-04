const { body, validationResult, } = require('express-validator')

export default [
    body('title').notEmpty(),
    body('expiredAt').notEmpty().isDate(),
    body('amount').notEmpty(),
    body('quantity').notEmpty(),
    body('type').notEmpty().isIn(['myself','gift']),
    body('limitPerUser').notEmpty(),
    body('discountPayment').notEmpty().isIn(['cash','creditCard']),
    body('discountValue').notEmpty(),
    body('isActive').optional().toBoolean(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    },
]
