export const addDot = (number) => {
    if (number && number.length > 1) {
        return number[0] + '.' + number.slice(1)
    }
    return number
}