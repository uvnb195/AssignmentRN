export const capitalWords = (value: string) => {
    return value.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")
}
export const capitalFirstWord = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1)
}