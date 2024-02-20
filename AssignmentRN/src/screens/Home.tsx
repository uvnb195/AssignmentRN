import { StyleSheet, Text, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeActionBar from '../components/HomeActionBar';
import ItemIndex, { ItemIndexData } from '../components/ItemIndex';
import ItemIndexList from '../components/ItemIndexList';
import BigItem, { BigItemProps } from '../components/BigItem';
import { FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import { Circle as ProgressCircle } from 'react-native-progress';
import { primaryColor } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../apis/authApi';
import { productApi } from '../apis/productApi';
import { RootState } from '../redux/reducer';
import { fetchIndexGrocery, updateItems, updateSelected } from '../redux';

export type ItemIndex =
  "Table" |
  "Chair" |
  "Bookshelf" |
  "Bed" |
  "Wardrobe" |
  "Shelf" |
  "Dressing" |
  "Refrigerator" |
  "Stove" |
  "Shoe" |
  "Sofa" |
  "Lamp" |
  string

export default function HomeScreen() {
  const [loading, toggleLoading] = useState(true);
  // const [selected, setSelected] = useState(0);
  const selected = useSelector((state: RootState) => state.selectedIndex)
  const listIndex = useSelector((state: RootState) => state.indexGrocery)
  const showItems = useSelector((state: RootState) => state.items)


  const dispatch = useDispatch()

  //fetch index grocery first render component
  const handleIndexGrocery = async () => {
    toggleLoading(true);
    try {
      const res = await productApi.HandleEvent('/index', 'get')
      dispatch(fetchIndexGrocery([{ name: "All" }, ...res.data]))
    } catch (err) {
      console.log("Error fetching index");
    }
    toggleLoading(false);
  }
  useEffect(() => {
    handleIndexGrocery()
  }, [])

  useEffect(() => {
    toggleLoading(true)
    handleSelected(selected)
  }, [selected]);

  const fetchItems = async (type: ItemIndex) => {
    const res = await (type !== "All" ?
      productApi.HandleEvent('/products', 'post', { type: type == "All" ? undefined : type })
      : productApi.HandleEvent('/products', 'post'))

    dispatch(updateItems(res.response))//
  }

  const handleSelected = async (index: number) => {
    dispatch(updateSelected(index))
    fetchItems(listIndex[index]?.name || "All")
    setTimeout(() => {
      toggleLoading(false)
    }, 500);
  }

  const renderBigItem = (item: any) => {
    const { id, name, price, quantity, index: { name: indexName } } = item
    return <BigItem key={id} price={price} quantity={quantity} name={name} type={indexName} />
  }

  return (
    <ScreenWrapper style={styles.container}>
      <HomeActionBar
        title={'Find All You Need'}
        leftIcon={<Ionicons name="search" size={30} color={primaryColor} />}
      />
      {(listIndex.length > 0) ?
        < ItemIndexList
          datas={listIndex}
          selectedIndex={selected}
          onSelectedChange={value => dispatch(updateSelected(value))}
        />
        : null
      }

      {loading ? (
        <ProgressCircle
          size={40}
          color={primaryColor}
          borderWidth={3}
          indeterminate
        />)
        : (showItems.length > 0) ?
          (<View style={{ flex: 1 }}>
            <FlatList
              data={showItems}
              renderItem={({ item, index }) =>
                renderBigItem(item)
                // const renderItem:BigItemProps = {
                //   id:
                // }
              }
              numColumns={2}
            />
          </View>)
          : <View>
            <Text style={{ fontSize: 20 }}>Empty storage</Text>
          </View>
      }
    </ScreenWrapper>
  )
}
export const styles = StyleSheet.create({
  container: {
    margin: 20,
    rowGap: 20,
    alignItems: 'center',
  },
});
