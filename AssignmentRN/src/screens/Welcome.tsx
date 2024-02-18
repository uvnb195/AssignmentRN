import { Image, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import ScreenWrapper from '../components/ScreenWrapper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { instance as axiosInstance } from '../apis/axiosClient';
import { useDispatch } from 'react-redux';
import { logSomeThing, logSomeThingElse } from '../redux';
import { WelcomeRoutesStackParams } from '../routes/WelcomeRoutes';

export default function Welcome() {
  const navigation = useNavigation<StackNavigationProp<WelcomeRoutesStackParams>>();

  const dispatch = useDispatch();

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require('../../assets/images/welcome.png')}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>
          You'll find{' '}
          <Text style={styles.welcomeTextVariant}>
            {'\n'}All you need{'\n'}
          </Text>{' '}
          Here!
        </Text>
        <View style={styles.buttonSection}>
          <CustomButton
            style={styles.solidButton}
            title="Sign Up"
            onClick={() =>

              // dispatch(logSomeThingElse())
              navigation.navigate('SignUp')
            }
          />
          <CustomButton
            style={styles.textButton}
            title="Sign In"
            color="#4F63AC"
            onClick={() =>
              // dispatch(logSomeThing())
              navigation.navigate('SignIn', {})
            }
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 50,
  },
  img: {
    width: '100%',
    height: 300,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 50,
    color: '#303030',
  },
  welcomeTextVariant: {
    color: '#FCA34D',
    textDecorationLine: 'underline',
  },
  buttonSection: { width: '100%', paddingHorizontal: 25, rowGap: 8 },
  solidButton: {
    width: '100%',
  },
  textButton: {
    padding: 16,
    backgroundColor: 'transparent',
    width: '100%',
  },
});
