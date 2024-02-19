import { styles } from './SignUp';
import {
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import LogInActionBar from '../components/LogInActionBar';
import InputField from '../components/InputField';
import Spacer from '../components/Spacer';
import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
import { primaryColor, secondaryColor, warningColor } from '../../theme';
import React, { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import BreakerButtonSection from '../components/BreakerButtonSection';
import ScreenWrapper from '../components/ScreenWrapper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PasswordField from '../components/PasswordField';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { authApi } from '../apis/authApi';
import LoadingComponent from '../components/LoadingComponent';
import { Validation } from '../utils/validation';
import { WelcomeRoutesStackParams } from '../routes/WelcomeRoutes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { updateLogger } from '../redux/actions';

type SignInProps = NativeStackScreenProps<WelcomeRoutesStackParams, 'SignIn'>
const SignIn: React.FC<SignInProps> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<WelcomeRoutesStackParams>>()
  const [input, setInput] = useState({
    email: route.params?.email || "",
    password: route.params?.password || "",
    rememberLogin: false
  })
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // const dispatch = useDispatch()


  const resetNav = CommonActions.reset({
    index: 0,
    routes: [{ name: 'MainRoutes' }],
  });

  const validationInput = (email: string, password: string) => {
    if (Validation.isAnyBlank([email, password])) {
      setErrorMessage('Please fill blank')
      return false
    } else if (!Validation.email(email)) {
      setErrorMessage('It\'s not an email, please try again')
      return false
    }
    else if (!Validation.password(password)) {
      setErrorMessage('Password must be at least 8 characters.')
      return false
    }
    return true
  }

  const handleSignIn = async () => {
    setErrorMessage("")
    const { email, password, rememberLogin } = input
    setLoading(true)
    const validation = validationInput(email, password)
    if (!validation) {
      setLoading(false)
      return
    }
    const res = await authApi.HandleAuthentication('/signIn', 'post', input)
    console.log("response token: ", res.data.token);
    if (res && res.status === 201) {
      if (rememberLogin && res.data.token) {
        await AsyncStorage.setItem("isLogged", res.data.token)

        // dispatch(updateLogger(res.data.user.password))
      }

      ToastAndroid.showWithGravity("Login successfully", ToastAndroid.SHORT, ToastAndroid.CENTER)
      navigation.dispatch(resetNav)
    } else if (res && (res?.status === 404 || res?.status === 400)) {
      setErrorMessage("Email or password does not match, please try again")
    }
    setLoading(false)
  }
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <LogInActionBar title="Sign In" onClick={() => navigation.popToTop()} />
        <ScrollView>
          <View style={styles.container}>
            <Spacer height={30} />
            <InputField
              value={input.email || ''}
              onTextChange={v => setInput({ ...input, email: v })}
              title="E-mail"
              placeHolder="example@gmail.com"
            />
            <PasswordField
              value={input.password || ''}
              title={'Password'}
              placeHolder="********"
              onTextChange={v => setInput({ ...input, password: v })}
            />

            <TouchableOpacity
              style={styles.termsSection}
              onPress={() => setInput({ ...input, rememberLogin: !input.rememberLogin })}>
              <CheckBox
                value={input.rememberLogin}
                onValueChange={v => setInput({ ...input, rememberLogin: v })}
                disabled={false}
                tintColors={{ true: secondaryColor }}
                style={styles.checkBox}
              />
              <Text style={[styles.text, styles.textBold]}>Remember me </Text>
            </TouchableOpacity>
            {
              errorMessage ?
                <Text style={{ color: warningColor }}>{errorMessage}</Text>
                : null
            }
            <View style={styles.buttonSection}>
              <CustomButton style={styles.button} title="Sign In" onClick={handleSignIn} />
              <BreakerButtonSection />
              <CustomButton
                style={styles.googleButton}
                isIconButton={true}
                iconName="google"
              />
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.text, { textAlign: 'center' }]}>
                  Don't have an account?{' '}
                  <Text style={styles.textBold}>Sign Up</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
      <LoadingComponent visible={loading} />
    </ScreenWrapper>
  );
}


export default SignIn
