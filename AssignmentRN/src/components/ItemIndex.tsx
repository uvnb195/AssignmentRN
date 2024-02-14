import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor, secondaryColor} from '../../theme';

export type ItemIndexData = {
  name: string;
  imgSource: ImageSourcePropType;
};

type ItemIndexProps = {
  data: ItemIndexData;
  isFocused: boolean;
  onClick: () => void;
};

export default function ItemIndex({data, isFocused, onClick}: ItemIndexProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onClick}>
      <View
        style={[
          styles.iconWrapper,
          {backgroundColor: isFocused ? '#303030' : '#e8faea'},
        ]}>
        <Image
          source={data.imgSource}
          style={styles.img}
          tintColor={isFocused ? 'white' : 'black'}
          resizeMode="contain"
        />
      </View>
      <Text
        style={[
          styles.text,
          {
            color: isFocused ? primaryColor : '#909090',
            fontWeight: isFocused ? '600' : '300',
          },
        ]}
        numberOfLines={isFocused ? 2 : 1}>
        {data.name}
      </Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {alignItems: 'center', height: 100, width: 70},
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 32,
    height: 32,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
});
