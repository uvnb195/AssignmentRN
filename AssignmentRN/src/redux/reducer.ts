import AsyncStorage from "@react-native-async-storage/async-storage";

const iniState = {
    passwordHash: "",
    indexGrocery: [],
    selectedIndex: 0,
    items: []
}

const rootReducer = (state = iniState, action: any) => {
    switch (action.type) {
        case "Update Logging State": {
            console.log("Update Logging State");

            return {
                ...state,
                passwordHash: action.payload
            }
        }

        case "Fetch Index": {
            return {
                ...state,
                indexGrocery: action.payload
            }

        }

        case "Update Selected": {
            return {
                ...state,
                selectedIndex: action.payload
            }
        }

        case "Update Items": {
            return {
                ...state,
                items: action.payload
            }
        }

        default: {
            return state
        }
    }
}

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

