import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "../screens/Welcome";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";

export type WelcomeRoutesStackParams = {
    Welcome: undefined;
    SignUp: undefined;
    SignIn: {
        email?: string,
        password?: string
    };
}

const Stack = createNativeStackNavigator<WelcomeRoutesStackParams>()

const WelcomeRoutes = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={Welcome} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    )
}
export default WelcomeRoutes;