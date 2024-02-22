import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { primaryColor, secondaryColor } from '../../theme';
import { ReactNode } from 'react';
import { parseSampleItemImage } from '../utils/parseImage';

type ItemProps = {
  icon: ReactNode;
  info: {
    title: string,
    price: number,
    quantity: number
  }
  onClick: () => void;
};

export default function Item({ icon, onClick, info }: ItemProps) {
  const { title, price, quantity } = info

  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={parseSampleItemImage(title)}
            style={styles.img}
          />
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.price}>{price} VNĐ</Text>
          <Text style={styles.subTitle}>Quantity: {quantity}</Text>
        </View>
        {icon}
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  imgContainer: {
    width: 100,
    height: 100,
  },
  img: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  detailContainer: {
    flex: 1,
    paddingHorizontal: 20,
    rowGap: 4,
    alignSelf: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '400',
    color: '#303030',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#303030',
  },
  subTitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#303030',
  }
});
