import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkSignToken = async () => await AsyncStorage.getItem('isLogged')