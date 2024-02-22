import { StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import Item from '../components/Item';
import { FlatList } from 'react-native';
import HomeActionBar from '../components/HomeActionBar';

import { primaryColor } from '../../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles as homeStyles } from '../screens/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { favourites } from '../constants';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/reducer';
import { removeFavourite, updateFavourites, updateLoading } from '../redux';
import { storageApi } from '../apis/storageApi';
import { checkSignToken } from '../utils/callAsyncStorage';
import { authApi } from '../apis/authApi';
import LoadingComponent from '../components/LoadingComponent';
import { productApi } from '../apis/productApi';


export default function BookMarkScreen() {
  const dispatch = useDispatch()

  const loadFavourites = async () => {
    dispatch(updateLoading(true))
    const isLogged = await checkSignToken()
    if (!isLogged) return
    const res = await productApi.HandleEvent(`/storage?token=${isLogged}`, 'get')
    if (res.status == 200) {
      dispatch(updateFavourites(res.response))
    }
    dispatch(updateLoading(false))
    return
  }

  const handleRemoveFavourite = async (itemId: string) => {
    dispatch(updateLoading(true))
    const isLogged = await checkSignToken()
    if (!isLogged) {
      console.log("TokenError, log from bookmark");
    }
    const res = await productApi.HandleEvent(
      '/favourites/remove',
      'post',
      {
        token: isLogged,
        itemId: itemId
      })
    if (res.status == 200) {
      dispatch(removeFavourite(itemId))
    } else {
      ToastAndroid.showWithGravity("Please try again later", ToastAndroid.SHORT, ToastAndroid.CENTER)
    }
    dispatch(updateLoading(false))
    // dispatch(updateFavourites(favouritesState.filter((i: any) => i != item)))
  }
  const favouritesState: any[] = useSelector((state: RootState) => state.favourites);
  useEffect(() => {
    loadFavourites()
  }, [])

  const renderItem = (isLast: boolean, data: any) => {
    const name = data?.name
    const price = data?.price
    const quantity = data?.quantity
    const id = data?._id

    return (
      <View>
        <Item
          icon={
            <TouchableOpacity onPress={() => {
              console.log("Item icon clicked");
              console.log("Check id:", id);

              handleRemoveFavourite(`${id}`)

            }}
              style={{
                margin: 5,
                backgroundColor: '#d3d3d3',
                borderRadius: 50,
                padding: 5,
              }}>
              <Ionicons name={'close'} size={20} color={primaryColor} />
            </TouchableOpacity>
          }
          info={{
            title: name,
            price: price,
            quantity: quantity
          }}
          onClick={() => {
            console.log("Item clicked");
          }}
        />
        {!isLast ? <View style={styles.breacker}></View> : null}

      </View >
    )
  };
  return (
    <ScreenWrapper style={homeStyles.container}>
      <HomeActionBar title="Favourites" />
      {(!favouritesState || favouritesState.length <= 0) ?
        <Text>Empty</Text>
        : <FlatList
          style={{ width: '100%' }}
          data={favouritesState}
          renderItem={({ item, index }) =>
            renderItem(index == favouritesState.length - 1, item)
          }
        />}
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
