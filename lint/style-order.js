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
            'padding-left',
            'box-sizing'
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
            'text-align'
        ]
    },
    // Visual
    {
        groupName: 'Visual',
        emptyLineBefore: 'always',
        order: 'flexible',
        noEmptyLineBetween: true,
        properties: [
            'color',
            'background',
            'background-color',
            'background-image',
            'border',
            'border-raidus',
            'opacity',
            'box-shadow',
            'filter',
            'overflow',
            'mix-blend-mode'
        ]
    },
    // Animation
    {
        groupName: 'Animation',
        emptyLineBefore: 'always',
        order: 'flexible',
        noEmptyLineBetween: true,
        properties: [
            'transition',
            'transition-delay',
            'transition-duration',
            'transition-property',
            'transition-timing-function'
        ]
    }
]

module.exports = {
    order,
    propertiesOrder
}
