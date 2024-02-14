import {StyleSheet, Text, View} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import {styles as homeStyles} from '../screens/Home';
import HomeActionBar from '../components/HomeActionBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor} from '../../theme';
import OptionButton from '../components/OptionButton';
import CustomButton from '../components/CustomButton';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../App';

export default function ProfileScreen() {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const resetNav = CommonActions.reset({
    index: 0,
    routes: [{name: 'Welcome'}],
  });
  return (
    <ScreenWrapper style={homeStyles.container}>
      <HomeActionBar
        title="Profile"
        rightIcon={
          <Ionicons size={30} name="exit-outline" color={primaryColor} />
        }
        onRightClick={() => navigation.dispatch(resetNav)}
      />
      <View style={styles.infoSection}>
        <Text style={styles.name}>Đào Hữu Quân</Text>
        <Text style={styles.email}>example@gmail.com</Text>
      </View>
      <OptionButton
        title="My Listings"
        subTitle="Already have 10 listing"
        onClick={() => navigation.navigate('MyList')}
      />
      <OptionButton
        title="Settings"
        subTitle="Account, FAQ, Contact"
        onClick={() => navigation.navigate('Settings')}
      />

      <CustomButton title="Add a new listing" style={styles.addButton} />
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  infoSection: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 5,
    rowGap: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  email: {
    fontSize: 13,
    color: '#909090',
  },
  addButton: {
    width: '90%',
    position: 'absolute',
    bottom: 0,
  },
});
