const { body, validationResult, } = require('express-validator')

export default [
    body('voucherId').notEmpty().isInt(),
    body('paymentMethod').notEmpty().isIn(['cash', 'creditCard']),
    body('creditCardNumber').if((value, { req }) => req.body.paymentMethod == 'creditCard').notEmpty().isCreditCard(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        next()
    },
]
