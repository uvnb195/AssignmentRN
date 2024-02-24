
const initState = {
    bgColor: "bg-slate-200"
}

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case "Change Background":
            return ({
                ...state,
                bgColor: action.payload
            })
        default:
            return state
    }
}

export type RootState = ReturnType<typeof reducer>
export default reducer