import { StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeActionBar from '../components/HomeActionBar';
import ItemIndex, { ItemIndexData } from '../components/ItemIndex';
import ItemIndexList from '../components/ItemIndexList';
import BigItem from '../components/BigItem';
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { Circle as ProgressCircle } from 'react-native-progress';
import { primaryColor } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const listItemIndex: ItemIndexData[] = [
  { name: 'Popular', imgSource: require('../../assets/icons/star.png') },
  { name: 'Bed', imgSource: require('../../assets/icons/bed.png') },
  {
    name: 'Book Shelves',
    imgSource: require('../../assets/icons/bookshelves.png'),
  },
  { name: 'Bowl', imgSource: require('../../assets/icons/bowl.png') },
  { name: 'Chair', imgSource: require('../../assets/icons/chair.png') },
  { name: 'Door', imgSource: require('../../assets/icons/door.png') },
  { name: 'Gas Stove', imgSource: require('../../assets/icons/gas-stove.png') },
  { name: 'Lamp', imgSource: require('../../assets/icons/lamp.png') },
  { name: 'Light', imgSource: require('../../assets/icons/light.png') },
  { name: 'Sink', imgSource: require('../../assets/icons/sink.png') },
  { name: 'Sofa', imgSource: require('../../assets/icons/sofa.png') },
  { name: 'Table', imgSource: require('../../assets/icons/table-work.png') },
  {
    name: 'Washer Machine',
    imgSource: require('../../assets/icons/washer-machine.png'),
  },
  { name: 'Window', imgSource: require('../../assets/icons/window-frame.png') },
];

export default function HomeScreen() {
  const [loading, toggleLoading] = useState(true);
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    if (loading) {
      setTimeout(() => toggleLoading(false), 500);
    }
  }, [selected]);
  const renderBigItem = (title: string) => <BigItem title={title} />;

  return (
    <ScreenWrapper style={styles.container}>
      <HomeActionBar
        title={'Find All You Need'}
        leftIcon={<Ionicons name="search" size={30} color={primaryColor} />}
      />
      <ItemIndexList
        datas={listItemIndex}
        selectedIndex={selected}
        onSelectedChange={index => {
          toggleLoading(true);
          setSelected(index);
        }}
      />

      {loading ? (
        <ProgressCircle
          size={40}
          color={primaryColor}
          borderWidth={3}
          indeterminate
        />
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={[1, 2, 3, 4, 5, 6]}
            renderItem={({ item }) => renderBigItem(`Item number ${item}`)}
            numColumns={2}
          />
        </View>
      )}
    </ScreenWrapper>
  );
}
export const styles = StyleSheet.create({
  container: {
    margin: 20,
    rowGap: 20,
    alignItems: 'center',
  },
});
