export const changeBackground = (value: string) => {
    return ({
        type: "Change Background",
        payload: value
    })
}

export const fetchTodo = (value: any) => {
    return ({
        type: "Fetch Todo",
        payload: value
    })
}

export const addTodo = (id: any) => {
    return ({
        type: "Add Todo",
        payload: id
    })
}

export const removeTodo = (value: any) => {
    return ({
        type: "Remove Todo",
        payload: value
    })
}

export const fetchItem = (item: any) => {
    return ({
        type: "Edit",
        payload: item
    })
}

export const toggleLoading = (value: Boolean) => {
    return ({
        type: "Toggle Loading",
        payload: value
    })
}

export const runSuccess = (value: Boolean) => {
    return ({
        type: "Run Success",
        payload: value
    })
}

export const runDelete = (value: Boolean) => {
    return ({
        type: "Run Delete",
        payload: value
    })
}