import AsyncStorage from "@react-native-async-storage/async-storage";

const iniState = {
    passwordHash: ""
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

        default: {
            return state
        }
    }
}

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

