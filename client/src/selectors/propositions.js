export const isInSelectedAncestry = (number, selectedNumber = '') => {
    return selectedNumber.toString().startsWith(number.toString())
}