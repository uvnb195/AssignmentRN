import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import HomeRoutes from "./HomeRoutes";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import Settings from "../screens/Settings";
import MyList from "../screens/MyList";

export type MainRoutesStackParams = {
    HomeRoutes: undefined;
    Settings: undefined;
    MyList: undefined;
}

const Stack = createNativeStackNavigator<MainRoutesStackParams>()

const MainRoutes = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeRoutes" component={HomeRoutes} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="MyList" component={MyList} />
        </Stack.Navigator>
    )
}
export default MainRoutes;