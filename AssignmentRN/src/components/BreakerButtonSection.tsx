import {StyleSheet, Text, View} from 'react-native';
import Spacer from './Spacer';

export default function BreakerButtonSection() {
  return (
    <View style={styles.container}>
      <Spacer flex={1} height={1} color="#DADADA" />
      <Text style={styles.text}>Or sign up with</Text>
      <Spacer flex={1} height={1} color="#DADADA" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  text: {
    marginHorizontal: 10,
  },
});
