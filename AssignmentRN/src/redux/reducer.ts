import AsyncStorage from "@react-native-async-storage/async-storage";
import { act } from "react-test-renderer";
import { favourites } from "../constants";
import { stat } from "react-native-fs";

const iniState = {
    passwordHash: "",
    indexGrocery: [],
    selectedIndex: 0,
    items: [],
    favourites: [],
    loading: false
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

        case "Update Favourites":
            return {
                ...state,
                favourites: [...action.payload]
            }

        case "Add Favourite":
            return {
                ...state,
                favourites: [...state.favourites, action.payload]
            }

        case "Remove Favourite":
            return {
                ...state,
                favourites: state.favourites.filter((item: any) => item._id != action.payload)
            }

        case "Loading":
            return {
                ...state,
                loading: action.payload
            }

        default: {
            return state
        }
    }
}

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;

