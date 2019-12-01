const idcard = (value) => {
    if (/^\d{17}(\d|X)$/.test(value)) {
        const t = value.split('')
        return ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'][[7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2].reduce((acc, cur, i) => { return acc + cur * t[i] }, 0) % 11] === value.split('')[17]
    }
}

console.log(idcard('310102199702032819'))
