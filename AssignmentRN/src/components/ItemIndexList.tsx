import {FlatList, ImageSourcePropType, StyleSheet, View} from 'react-native';
import ItemIndex, {ItemIndexData} from './ItemIndex';
import {useState} from 'react';
import {primaryColor} from '../../theme';

type ItemIndexListProps = {
  datas: ItemIndexData[];
  selectedIndex: number;
  onSelectedChange: (index: number) => void;
};

export default function ItemIndexList({
  datas,
  selectedIndex,
  onSelectedChange,
}: ItemIndexListProps) {
  const renderItem = (
    data: ItemIndexData,
    isFocused: boolean,
    onClick: () => void,
  ) => <ItemIndex data={data} isFocused={isFocused} onClick={onClick} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={datas}
        renderItem={({item, index}) =>
          renderItem(item, index == selectedIndex, () => {
            onSelectedChange(index);
          })
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.list}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  list: {
    rowGap: 10,
  },
});
