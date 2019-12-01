const systemInfo = uni.getSystemInfoSync()

export const toPixel = (value: string) => {
    try {
        const t = /^([0-9]*[.]*[0-9]+)(rpx|px|vw|vh)$/.exec(value)!
        const number = parseInt(t[1])
        switch (t[2]) {
        case 'rpx': return number / 750 * systemInfo.windowWidth!
        case 'vw': return number / 100 * systemInfo.windowWidth!
        case 'vh': return number / 100 * systemInfo.windowHeight!
        case 'px':
        default: return number
        }
    } catch {
        return null
    }
}
