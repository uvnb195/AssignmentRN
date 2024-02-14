import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeActionBar, {arrowLeftIcon} from '../components/HomeActionBar';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import {styles as homeStyles} from '../screens/Home';
import {primaryColor, secondaryColor} from '../../theme';
import {useEffect, useRef, useState} from 'react';
import OptionButton from '../components/OptionButton';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParams} from '../../App';

export default function Settings() {
  const navigation = useNavigation<StackNavigationProp<StackParams>>();
  const [enableEdit, setEnableEdit] = useState(false);
  const nameInputRef = useRef<TextInput | null>(null);
  useEffect(() => {
    if (enableEdit) nameInputRef.current?.focus();
  }, [enableEdit]);
  return (
    <ScreenWrapper style={homeStyles.container}>
      <HomeActionBar
        title="Settings"
        leftIcon={arrowLeftIcon}
        onLeftClick={() => navigation.pop()}
      />
      <View style={styles.editButton}>
        <Text style={styles.editTitle}>Personal Infomation</Text>
        <TouchableOpacity
          style={{
            padding: 5,
            backgroundColor: secondaryColor,
            borderRadius: 50,
          }}
          onPress={() => setEnableEdit(!enableEdit)}>
          <AntDesignIcons
            name={enableEdit ? 'check' : 'edit'}
            size={24}
            color={'white'}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.inputSection, {borderWidth: enableEdit ? 1 : 0}]}>
        <Text style={styles.inputTitle}>Name</Text>
        <TextInput
          style={styles.inputValue}
          value="Đào Hữu Quân"
          editable={enableEdit}
          ref={nameInputRef}
        />
      </View>
      <View style={[styles.inputSection, {borderWidth: enableEdit ? 1 : 0}]}>
        <Text style={styles.inputTitle}>Email</Text>
        <TextInput
          style={styles.inputValue}
          value="Example@gmail.com"
          editable={enableEdit}
        />
      </View>
      <Text style={styles.settingTitle}>Settings</Text>
      <OptionButton title="FAQ" onClick={() => console.log('FAQ clicked')} />
      <OptionButton
        title="Contact Us"
        onClick={() => console.log('Contact Us clicked')}
      />
      <OptionButton
        title="Privacy & Terms"
        onClick={() => console.log('Privacy & Terms clicked')}
      />
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  editButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  editTitle: {
    fontSize: 16,
  },
  textInput: {
    width: '100%',
  },
  inputSection: {
    elevation: 10,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  inputTitle: {fontSize: 13},
  inputValue: {
    fontWeight: '600',
    color: primaryColor,
    padding: 0,
  },
  settingTitle: {
    fontSize: 16,
    width: '100%',
    marginTop: 50,
  },
});
