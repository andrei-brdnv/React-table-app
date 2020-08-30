export default (store) => (next) => (action) => {
    const hexToRgb = (hex) => {
        console.log('hexToRgb')
        return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
    }
    if (!action.colorRgb) return next(action)
    next({
        ...action,
        colorRgb: hexToRgb(action.payload.dataItem.color)
    })
}