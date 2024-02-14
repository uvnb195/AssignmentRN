import { styles } from './SignUp';
import {
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import LogInActionBar from '../components/LogInActionBar';
import InputField from '../components/InputField';
import Spacer from '../components/Spacer';
import CheckBox, { CheckBoxProps } from '@react-native-community/checkbox';
import { primaryColor, secondaryColor } from '../../theme';
import React, { useState } from 'react';
import CustomButton from '../components/CustomButton';
import BreakerButtonSection from '../components/BreakerButtonSection';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParams } from '../../App';
import PasswordField from '../components/PasswordField';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

type SignInProps = NativeStackScreenProps<StackParams, 'SignIn'>
const SignIn: React.FC<SignInProps> = ({ route }) => {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const { email, password } = route.params
  const [checkBox, toggleCheckBox] = useState(false);
  return (
    <ScreenWrapper>
      <View style={styles.wrapper}>
        <LogInActionBar title="Sign In" onClick={() => navigation.popToTop()} />
        <ScrollView>
          <View style={styles.container}>
            <Spacer height={30} />
            <InputField
              value={email || ''}
              onTextChange={v => console.log(v)}
              title="E-mail"
              placeHolder="example@gmail.com"
            />
            <PasswordField
              value={password || ''}
              title={'Password'}
              placeHolder="********"
              onTextChange={value => console.log(value)}
            />
            <View style={styles.buttonSection}>
              <CustomButton style={styles.button} title="Sign In" />
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
    </ScreenWrapper>
  );
}


export default SignIn
