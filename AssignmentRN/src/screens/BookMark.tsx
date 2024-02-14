import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Item from '../components/Item';
import {FlatList} from 'react-native';
import HomeActionBar from '../components/HomeActionBar';

import {primaryColor} from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles as homeStyles} from '../screens/Home';

export const renderItem = (isLast: boolean, iconName: string) => (
  <View>
    <Item
      icon={
        <TouchableOpacity
          style={{
            margin: 5,
            backgroundColor: '#d3d3d3',
            borderRadius: 50,
            padding: 5,
          }}>
          <Ionicons name={iconName} size={20} color={primaryColor} />
        </TouchableOpacity>
      }
      onClick={() => console.log('Favorites Item clicked')}
    />
    {!isLast ? <View style={styles.breacker}></View> : null}
  </View>
);

export default function BookMarkScreen() {
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ScreenWrapper style={homeStyles.container}>
      <HomeActionBar title="Favourites" />
      <FlatList
        style={{width: '100%'}}
        data={list}
        renderItem={({item, index}) =>
          renderItem(index == list.length - 1, 'close')
        }
      />
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({
  breacker: {
    marginHorizontal: 5,
    width: '100%',
    height: 1,
    backgroundColor: '#d3d3d3',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    width: '100%',
    textAlign: 'center',
    padding: 12,
    color: 'black',
  },
});
