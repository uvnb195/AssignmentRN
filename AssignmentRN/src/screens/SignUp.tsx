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
import { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import BreakerButtonSection from '../components/BreakerButtonSection';
import ScreenWrapper from '../components/ScreenWrapper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import PasswordField from '../components/PasswordField';
import { authApi } from '../apis/authApi';
import LoadingComponent from '../components/LoadingComponent';
import { Validation } from '../utils/validation';
import { AxiosResponse } from 'axios';
import { WelcomeRoutesStackParams } from '../routes/WelcomeRoutes';

type SignupState = {
  name: string,
  email: string,
  password: string,
  agreeTerms: boolean
}

export default function SignUp() {
  const navigation = useNavigation<StackNavigationProp<WelcomeRoutesStackParams>>();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  const [input, setInput] = useState<SignupState>({
    name: "",
    email: "",
    password: "",
    agreeTerms: false,
  });


  const validationInput = (email: string, password: string, name: string) => {
    if (Validation.isAnyBlank(...Object.values(input))) {
      setErrorMessage('Please fill blank or check box.')
      return false
    } else if (!Validation.name(name)) {
      setErrorMessage('Name must be at least 4 characters')
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

  const handleSignUp = async () => {
    const { email, password, name } = input
    const validation = validationInput(email, password, name)
    if (!validation) {
      setLoading(false);
      return
    } else {
      const res = await authApi.HandleAuthentication(`/user?email=${input.email}`, 'get')
      if (res?.status === 200) {
        setErrorMessage('Email already exists')
        setLoading(false)
        return
      }
    }

    const res = await authApi.HandleAuthentication('/register', 'post', input);
    setLoading(false);
    if (res?.status !== 201) setErrorMessage('Unknow error, please try again')
    else {
      ToastAndroid.showWithGravity(
        "Register successfully!",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER
      )
      navigation.navigate('SignIn', {
        email: email,
        password: password
      })
    }
    return
  }

  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <LogInActionBar title="Sign Up" onClick={() => navigation.popToTop()} />
        <ScrollView>
          <View style={styles.container}>
            <Spacer height={30} />
            <InputField
              onTextChange={v => setInput({ ...input, name: v })}
              title="Name"
              placeHolder="Full Name"
            />
            <InputField
              onTextChange={v => setInput({ ...input, email: v })}
              title="E-mail"
              placeHolder="example@gmail.com"
            />
            <PasswordField
              title={'Password'}
              placeHolder="********"
              onTextChange={v => setInput({ ...input, password: v })}
            />
            <TouchableOpacity
              style={styles.termsSection}
              onPress={() => setInput({ ...input, agreeTerms: !input.agreeTerms })}>
              <CheckBox
                value={input.agreeTerms}
                onValueChange={v => setInput({ ...input, agreeTerms: v })}
                disabled={false}
                tintColors={{ true: secondaryColor }}
                style={styles.checkBox}
              />
              <Text style={styles.text}>
                I agree with <Text style={styles.textBold}>Terms</Text> &{' '}
                <Text style={styles.textBold}>Privacy</Text>
              </Text>
            </TouchableOpacity>
            {
              errorMessage ?
                <Text style={{ color: warningColor }}>{errorMessage}</Text>
                : null
            }
            <View style={styles.buttonSection}>
              <CustomButton
                style={styles.button}
                title="Sign Up"
                onClick={() => {
                  setErrorMessage('')
                  setLoading(true)
                  handleSignUp()
                }}
              />
              <BreakerButtonSection />
              <CustomButton
                style={styles.googleButton}
                isIconButton={true}
                iconName="google"
              />
              <TouchableOpacity onPress={() => navigation.navigate('SignIn', {})}>
                <Text style={[styles.text, { textAlign: 'center' }]}>
                  Already have an account?{' '}
                  <Text style={styles.textBold}>Sign In</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        <LoadingComponent visible={loading} />
      </View>

    </ScreenWrapper>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingTop: 20,
  },
  container: { flex: 1, padding: 20, rowGap: 20 },
  termsSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkBox: {},
  text: { fontSize: 14, color: primaryColor, fontWeight: '400' },
  textBold: { fontWeight: '700' },
  buttonSection: {
    flex: 1,
    rowGap: 20,
    justifyContent: 'space-evenly',
  },
  button: { width: '100%' },
  googleButton: {
    width: '50%',
    backgroundColor: '#3F4A59',
  },
});
