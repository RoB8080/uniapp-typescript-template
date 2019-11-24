const order = [
    'custom-properties',
    'dollar-variables',
    'declarations',
    'rules',
    'at-rules'
]

const propertiesOrder = [
    // Positioning
    {
        groupName: 'Positioning',
        emptyLineBefore: 'always',
        order: 'flexible',
        noEmptyLineBetween: true,
        properties: [
            'position',
            'top',
            'right',
            'bottom',
            'left',
            'z-index',
            'transform'
        ]
    },
    // Box-model
    {
        groupName: 'Box-model',
        emptyLineBefore: 'always',
        order: 'flexible',
        noEmptyLineBetween: true,
        properties: [
            'display',
            'grid',
            'grid-area',
            'grid-auto-columns',
            'grid-auto-flow',
            'grid-auto-rows',
            'grid-column',
            'grid-column-end',
            'grid-column-start',
            'grid-row',
            'grid-row-end',
            'grid-row-start',
            'grid-template',
            'grid-template-areas',
            'grid-template-columns',
            'grid-template-rows',
            'float',
            'width',
            'height',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left'
        ]
    },
    // Typography
    {
        groupName: 'Typography',
        emptyLineBefore: 'always',
        order: 'flexible',
        noEmptyLineBetween: true,
        properties: [
            'font',
            'font-size',
            'font-weight',
            'text-decoration',
            'line-height',
            'text-align',
            'color',
            'background',
            'background-color',
            'border',
            'border-raidus',
            'opacity'
        ]
    }
]

module.exports = {
    order,
    propertiesOrder
}