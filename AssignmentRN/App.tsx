import Welcome from './src/screens/Welcome';
import SignUp from './src/screens/SignUp';
import SignIn from './src/screens/SignIn';
import { StatusBar, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import MainRoute from './src/screens/MainRoute';
import Settings from './src/screens/Settings';
import MyList from './src/screens/MyList';
import CreateList from './src/screens/CreateList';

export type StackParams = {
  Welcome: undefined;
  SignUp: undefined;
  SignIn: {
    email?: string,
    password?: string
  };
  MainRoute: undefined;
  Settings: undefined;
  MyList: undefined;
};

const Stack = createStackNavigator<StackParams>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="MainRoute" component={MainRoute} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="MyList" component={MyList} />
      </Stack.Navigator>
      {/* <CreateList /> */}
    </NavigationContainer>
  );
}
