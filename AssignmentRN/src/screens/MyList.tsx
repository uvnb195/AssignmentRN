import { FlatList, StyleSheet } from 'react-native';
import ScreenWrapper from '../components/ScreenWrapper';
import HomeActionBar, { arrowLeftIcon } from '../components/HomeActionBar';
import { renderItem } from './BookMark';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { styles as homeStyles } from '../screens/Home';
import { MainRoutesStackParams } from '../routes/MainRoutes';

export default function MyList() {
  const navigation = useNavigation<StackNavigationProp<MainRoutesStackParams>>();
  const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ScreenWrapper style={homeStyles.container}>
      <HomeActionBar
        title={'My Listings'}
        leftIcon={arrowLeftIcon}
        onLeftClick={() => navigation.pop()}
      />
      <FlatList
        style={{ width: '100%' }}
        data={list}
        renderItem={({ item, index }) =>
          renderItem(index == list.length - 1, 'trash-outline')
        }
      />
    </ScreenWrapper>
  );
}
const styles = StyleSheet.create({});
