import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor, secondaryColor} from '../../theme';
import {ReactNode} from 'react';

type ItemProps = {
  icon: ReactNode;
  onClick: () => void;
};

export default function Item({icon, onClick}: ItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../../assets/images/dummy.webp')}
          style={styles.img}
        />
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Coffee Table</Text>
        <Text style={styles.price}>$ 50.00</Text>
      </View>
      {icon}
    </View>
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
});
