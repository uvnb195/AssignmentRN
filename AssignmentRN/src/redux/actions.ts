export const updateLogger = (value: string) => {
    return ({
        type: "Update Logging State",
        payload: value
    })
}

export const fetchIndexGrocery = (value: string[]) => ({
    type: "Fetch Index",
    payload: value
})