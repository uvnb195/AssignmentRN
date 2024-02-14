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
import { primaryColor, secondaryColor } from '../../theme';
import React, { useEffect, useState } from 'react';
import CustomButton from '../components/CustomButton';
import BreakerButtonSection from '../components/BreakerButtonSection';
import ScreenWrapper from '../components/ScreenWrapper';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParams } from '../../App';
import PasswordField from '../components/PasswordField';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { authApi } from '../apis/authApi';
import LoadingComponent from '../components/LoadingComponent';

type SignInProps = NativeStackScreenProps<StackParams, 'SignIn'>
const SignIn: React.FC<SignInProps> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const email = route.params?.email || ""
  console.log(email);

  const password = route.params?.password || ""
  const [input, setInput] = useState({ email, password })
  useEffect(() => {
    setInput({ email, password })
  }, [email, password])
  const [loading, setLoading] = useState(false)

  const resetNav = CommonActions.reset({
    index: 0,
    routes: [{ name: 'MainRoute' }],
  });
  const [checkBox, toggleCheckBox] = useState(false);

  const handleSignIn = async () => {
    setLoading(true)
    const res = await authApi.HandleAuthentication(`/user?email=${input.email}&password=${input.password}`, 'get')
    if (res?.status === 200) {
      ToastAndroid.showWithGravity("Login successfully", ToastAndroid.SHORT, ToastAndroid.CENTER)
      navigation.dispatch(resetNav)
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
