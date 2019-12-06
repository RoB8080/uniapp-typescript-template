export const componentSize = (value: any) => {
    return ['mini', 'small', 'medium', 'large'].includes(value)
}

interface inputValidatorResult {
    valid: boolean,
    autoFixed?: string
}

export const inputNumber = (value: string): inputValidatorResult => {
    const valid = /^(-?(0|([1-9]\d*))(\.\d*)?)$/.test(value)
    if (valid) {
        return {
            valid: true
        }
    } else {
        let autoFixed: string | undefined
        if (value === '') autoFixed = '0'
    }
    return {
        valid
    }
}

export const completeNumber = (value: string) => {
    return /^(-?(0|([1-9]\d*))(\.\d+)?)$/.test(value)
}

export const inputIDCard = (value: string) => {
    return /^(\d{1,16})|(\d{17}(\d|X))$/.test(value)
}

export const completeIDCard = (value: string) => {
    if (/^\d{17}(\d|X)$/.test(value)) {
        const t = value.split('')
        return ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'][[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2].reduce((acc, cur, i) => { return acc + cur * parseInt(t[i]) }, 0) % 11] === value.split('')[17]
    } else {
        return false
    }
}
