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

export const updateSelected = (value: number) => ({
    type: "Update Selected",
    payload: value
})

export const updateItems = (values: any[]) => {

    return ({
        type: "Update Items",
        payload: values
    })
}