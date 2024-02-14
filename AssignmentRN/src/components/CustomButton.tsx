import React, {CSSProperties} from 'react';
import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';

type ButtonProps = {
  style?: ViewStyle;
  title?: string;
  isIconButton?: boolean;
  iconName?: string;
  color?: string;
  onClick?: () => void;
};

export default function CustomButton(props: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={props.onClick}>
      {props.isIconButton ? (
        <AntDesignIcons
          name={props.iconName || ''}
          color={props.color || 'white'}
          size={30}
        />
      ) : (
        <Text style={[styles.buttonText, {color: props.color || 'white'}]}>
          {props.title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#4F63AC',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 16,
    borderRadius: 8,
    height: 60,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 20,
    color: 'white',
    fontWeight: '700',
  },
});
