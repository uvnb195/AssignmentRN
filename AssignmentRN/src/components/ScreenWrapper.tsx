import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type ScreenWrapperProps = {
  style?: ViewStyle;
  children: ReactNode;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flex: 1,
  },
});

export default ScreenWrapper;
