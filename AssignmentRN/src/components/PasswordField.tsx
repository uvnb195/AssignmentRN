import {
  KeyboardType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { primaryColor, secondaryColor } from '../../theme';
import { useEffect, useState } from 'react';
import FeatherIcons from 'react-native-vector-icons/Feather';
type PasswordFieldProps = {
  title: string;
  placeHolder?: string;
  value?: string;
  onTextChange: (value: string) => void;
};

export default function PasswordField(props: PasswordFieldProps) {
  const [input, setInput] = useState(props.value || '');
  const [iconName, setIconName] = useState<string>('eye');
  const [hideInput, setHideInput] = useState(true);
  useEffect(() => {
    setHideInput(iconName == 'eye');
  }, [iconName]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={props.placeHolder || props.title}
          value={input}
          onChangeText={v => {
            setInput(v)
            props.onTextChange(v)
          }}
          secureTextEntry={hideInput}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setIconName(iconName == 'eye' ? 'eye-off' : 'eye')}>
          <FeatherIcons name={iconName} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 8,
    width: '100%',
  },
  title: {
    color: primaryColor,
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: secondaryColor,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 14,
  },
  icon: {
    padding: 16,
  },
});
