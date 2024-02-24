
const initState = {
    bgColor: "bg-slate-200",
    listTodo: [],
    editItem: {}
}

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case "Change Background":
            return ({
                ...state,
                bgColor: action.payload
            })
        case "Fetch Todo":
            return ({
                ...state,
                listTodo: action.payload
            })
        case "Add Todo":
            return ({
                ...state,
                listTodo: [...state.listTodo, action.payload]
            })
        case "Remove Todo":
            return ({
                ...state,
                listTodo: state.listTodo.filter((item: any) => item._id != action.payload)
            })
        case "Edit":
            return ({
                ...state,
                listTodo: state.listTodo.filter((item: any) => item._id != action.payload._id),
                editItem: action.payload
            })
        default:
            return state
    }
}

export type RootState = ReturnType<typeof reducer>
export default reducer