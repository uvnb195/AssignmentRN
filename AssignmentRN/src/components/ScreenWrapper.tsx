import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import LoadingComponent from './LoadingComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';

type ScreenWrapperProps = {
  style?: ViewStyle;
  children: ReactNode;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, style }) => {

  const loadingState = useSelector((state: RootState) => state.loading)
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>

      <LoadingComponent visible={loadingState} />
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
