import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import { primaryColor, secondaryColor } from '../../theme';
import { KeyboardType } from '../constants';
import FeatherIcons from 'react-native-vector-icons/Feather';
import { ReactNode, useEffect, useState } from 'react';

type InputFieldProps = {
  title: string;
  placeHolder?: string;
  icon?: ReactNode;
  numOfLines?: number;
  keyboardType?: KeyboardTypeOptions;
  enable?: boolean;
  value?: string;
  onTextChange: (value: string) => void;
};

export default function InputField(props: InputFieldProps) {
  const [input, setInput] = useState(props.value || '');
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
          editable={props.enable}
          keyboardType={props.keyboardType || 'default'}
          multiline={props.numOfLines !== undefined}
          numberOfLines={props.numOfLines || 1}
        />
        {props.icon ? (
          <TouchableOpacity style={styles.icon}>{props.icon}</TouchableOpacity>
        ) : null}
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
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    maxHeight: 100,
  },
  icon: {
    padding: 16,
  },
});
