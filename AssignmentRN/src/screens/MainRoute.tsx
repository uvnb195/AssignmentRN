import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View} from 'react-native';
import HomeScreen from './Home';
import BookMarkScreen from './BookMark';
import ProfileScreen from './Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor} from '../../theme';

const Tab = createBottomTabNavigator();

export default function MainRoute() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          justifyContent: 'center',
          paddingHorizontal: 50,
          height: 75,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={focused ? primaryColor : '#999999'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="BookMark"
        component={BookMarkScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'bookmarks' : 'bookmarks-outline'}
              size={24}
              color={focused ? primaryColor : '#999999'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={focused ? primaryColor : '#999999'}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
