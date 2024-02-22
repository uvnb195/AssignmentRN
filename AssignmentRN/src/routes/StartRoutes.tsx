import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import HomeRoutes from "./HomeRoutes";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import WelcomeRoutes from "./WelcomeRoutes";
import MainRoutes from "./MainRoutes";
import { StatusBar } from "react-native";
import SplashScreen from "../screens/SplashScreen";

export type StartRoutesStackParams = {
    WelcomeRoutes: undefined
    MainRoutes: undefined
    SplashScreen: undefined
}


const Stack = createNativeStackNavigator<StartRoutesStackParams>()

const StartRoutes = () => {
    return (
        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="WelcomeRoutes" component={WelcomeRoutes} />
            <Stack.Screen name="MainRoutes" component={MainRoutes} />
        </Stack.Navigator >

        /* <CreateList /> */
    )
}
export default StartRoutes;