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
import { useDispatch, useSelector } from 'react-redux';
import { authApi } from '../apis/authApi';
import { productApi } from '../apis/productApi';
import { RootState } from '../redux/reducer';
import { fetchIndexGrocery } from '../redux';

export default function HomeScreen() {
  const [loading, toggleLoading] = useState(true);
  const [selected, setSelected] = useState(0);

  const listIndex = useSelector((state: RootState) => state.indexGrocery)

  const dispatch = useDispatch()

  //fetch index grocery first render component
  const handleIndexGrocery = async () => {

    try {
      const res = await productApi.HandleEvent('/index', 'get')
      dispatch(fetchIndexGrocery([{ name: "All" }, ...res.data]))
    } catch (err) {
      console.log("Error fetching index");
      return
    }

  }
  useEffect(() => {
    handleIndexGrocery()
  }, [])

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
      {(listIndex.length > 0) ?
        < ItemIndexList
          datas={listIndex}
          selectedIndex={selected}
          onSelectedChange={index => {
            toggleLoading(true);
            setSelected(index);
          }}
        />
        : null
      }

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
