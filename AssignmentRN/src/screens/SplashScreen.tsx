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
const height = Dimensions.get("window").height;

const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StartRoutesStackParams>>()
    const navigate = async () => {
        setTimeout(() => { isLogged() }, 1500)
    }


    useEffect(() => {
        navigate()
    }, [])

    const isLogged = async () => {
        const res = await AsyncStorage.getItem('isLogged')
        if (!res) navigation.replace("WelcomeRoutes")
        else navigation.replace("MainRoutes")
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