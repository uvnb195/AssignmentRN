import Welcome from './src/screens/Welcome';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import HomeRoutes from './src/routes/HomeRoutes';
import Settings from './src/screens/Settings';
import MyList from './src/screens/MyList';
import CreateList from './src/screens/CreateList';
import { Provider, useSelector } from 'react-redux';
import { store } from './src/redux';
import StartRoutes from './src/routes/StartRoutes';

export default function App() {

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle={'dark-content'}
        />
        <StartRoutes />
      </NavigationContainer>
    </Provider>
  );
}
