const rulesOrder = require('./lint/style-order')

module.exports = {
    'plugins': [
        'stylelint-order'
    ],
    'extends': [
        'stylelint-config-recommended-scss'
    ],
    rules: {
        'number-no-trailing-zeros': true,
        'unit-case': 'lower',
        'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }],
        'selector-pseudo-class-case': 'lower',
        'selector-pseudo-element-case': 'lower',
        'indentation': 4,
        'order/order': rulesOrder.order,
        'order/properties-order': rulesOrder.propertiesOrder
    }
}
