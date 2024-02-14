import {CSSProperties} from 'react';
import {Image, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {TouchableOpacity} from 'react-native';

export default function BigItem({title}: {title: string}) {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../../assets/images/dummy.webp')}
          resizeMode="cover"
          style={styles.img}
        />
      </View>
      <Text style={styles.text}>Black Simple Lamp</Text>
      <Text style={styles.price}>$ 12.00</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    padding: 20,
    rowGap: 8,
  },
  imgContainer: {
    width: '100%',
    maxHeight: 150,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
  },
  price: {
    fontWeight: '600',
    fontSize: 18,
  },
});
