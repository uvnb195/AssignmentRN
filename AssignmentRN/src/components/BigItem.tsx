import { CSSProperties } from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { parseSampleItemImage } from '../utils/parseImage';

export type BigItemProps = {
  name: string,
  quantity: number,
  price: number,
  type: string,
  onClick: () => void
}

export default function BigItem(
  props: BigItemProps
) {
  const { name, quantity, price, type, onClick } = props

  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <View style={styles.imgContainer}>
        <Image
          source={parseSampleItemImage(name)}
          resizeMode="cover"
          style={styles.img}
        />
      </View>
      <Text style={styles.text}>{name}</Text>
      <Text style={styles.price}>{price} VNĐ</Text>
      <Text style={styles.text}>Quantity: {quantity}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "50%",
    alignContent: 'center',
    padding: 5,
    rowGap: 4,
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
