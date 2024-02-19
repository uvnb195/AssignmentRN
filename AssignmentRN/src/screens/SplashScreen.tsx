import LottieView from "lottie-react-native";
import ScreenWrapper from "../components/ScreenWrapper";
import React, { useEffect } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StartRoutesStackParams } from "../routes/StartRoutes";
import { NativeScreenNavigationContainer } from "react-native-screens";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/reducer";
import { authApi } from "../apis/authApi";
const height = Dimensions.get("window").height;

const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StartRoutesStackParams>>()

    useEffect(() => {
        isLogged()
    }, [])

    const isLogged = async () => {
        const isLogged = await AsyncStorage.getItem('isLogged')
        if (!isLogged) navigation.replace("WelcomeRoutes")
        else {
            const res = await authApi.CheckTokenExp(isLogged)
            if (res?.status != 200) {
                await AsyncStorage.removeItem("isLogged")
                navigation.replace("WelcomeRoutes")
            }
            else {
                navigation.replace("MainRoutes")
            }
        }
    }


    return (
        < ScreenWrapper style={{ justifyContent: 'center', alignContent: 'center' }
        }>

            <LottieView
                source={require('../../assets/animationJson/loading.json')}
                style={
                    {
                        width: '100%',
                        height: height / 3
                    }
                }
                autoPlay
                loop />
        </ScreenWrapper >
    )
}

export default SplashScreen;