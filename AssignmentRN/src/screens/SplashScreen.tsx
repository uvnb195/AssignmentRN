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
import { checkSignToken } from "../utils/callAsyncStorage";
import { storageApi } from "../apis/storageApi";
import { updateFavourites } from "../redux";
const height = Dimensions.get("window").height;

const SplashScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<StartRoutesStackParams>>()
    const dispatch = useDispatch()
    useEffect(() => {
        isLogged()
    }, [])

    const isLogged = async () => {
        const token = await checkSignToken()
        if (!token) navigation.replace("WelcomeRoutes")
        else {
            const call = await storageApi.handleData(`/storage?token=${token}`, 'get')
            const favourites = call?.data.response
            // if (favourites && favourites.length > 0) {

            //     dispatch(updateFavourites([...favourites]))
            // }

            navigation.replace("MainRoutes")
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