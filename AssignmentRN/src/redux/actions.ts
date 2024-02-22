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

export const updateFavourites = (value: any[]) => {
    return ({
        type: "Update Favourites",
        payload: value
    })
}

export const addFavourite = (value: any) => {
    return ({
        type: "Add Favourite",
        payload: value
    })
}

export const updateLoading = (value: boolean) => {
    return ({
        type: "Loading",
        payload: value
    })
}

export const removeFavourite = (value: any) => {
    return ({
        type: "Remove Favourite",
        payload: value
    })
}