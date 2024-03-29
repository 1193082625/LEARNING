/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Icon, Provider} from '@ant-design/react-native';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/pages/Home';
import {useUserStore} from './src/store/user';
import LoginScreen from './src/pages/Login';
import ArticleDetails from './src/pages/ArticleDetail';
import PracticeDetails from './src/pages/PracticeDetail';
import Feedback from './src/pages/Feedback';
import Articles from './src/pages/Articles';
import Practices from './src/pages/Practices';
import Mine from './src/pages/Mine';
import customTheme from './customTheme';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

enum TabBarName {
  Home = 'Home',
  Articles = 'Articles',
  Practices = 'Practices',
  Mine = 'Mine',
}

const getTabBarIcon = (route: any, focused: any, size: any, color: any) => {
  let iconName = '';
  switch (route.name) {
    case TabBarName.Home:
      iconName = focused ? 'align-center' : 'ant-cloud';
      break;
    case TabBarName.Articles:
      iconName = focused ? 'align-center' : 'ant-cloud';
      break;
    case TabBarName.Practices:
      iconName = focused ? 'align-center' : 'ant-cloud';
      break;
    case TabBarName.Mine:
      iconName = focused ? 'align-center' : 'ant-cloud';
      break;
  }
  // You can return any component that you like here!
  return <Icon name={iconName} size={focused ? 36 : size} color={color} />;
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          return getTabBarIcon(route, focused, size, color);
        },
        tabBarHideOnKeyboard: true, // 当键盘显示时是否隐藏选项卡栏，默认为 false
        tabBarShowLabel: false, // 是否显示选项卡的标签，默认为 true
        tabBarInactiveBackgroundColor: '#fcfcfc',
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: '#fcfcfc',
        },
        tabBarActiveTintColor: '#e45828',
        tabBarInactiveTintColor: '#2a2c30',
      })}>
      <Tab.Screen
        options={{headerShown: false}}
        name={TabBarName.Home}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={TabBarName.Articles}
        component={Articles}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={TabBarName.Practices}
        component={Practices}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={TabBarName.Mine}
        component={Mine}
      />
    </Tab.Navigator>
  );
};

const pageOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
};

function App(): React.JSX.Element {
  const isLogin = useUserStore(state => state.isLogin);

  return (
    <Provider theme={customTheme}>
      <SafeAreaView style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator>
            {!isLogin ? (
              <Stack.Screen
                options={{headerShown: false, headerBackTitleVisible: false}} // Show the header for internal screens
                name="Login"
                component={LoginScreen}
              />
            ) : (
              <>
                <Stack.Screen
                  options={{headerShown: false}} // Hide the header for first level screens
                  name="TabNavigator"
                  component={TabNavigator}
                />
                <Stack.Screen
                  options={pageOptions} // Show the header for internal screens
                  name="ArticleDetail"
                  component={ArticleDetails as any}
                />
                <Stack.Screen
                  options={pageOptions} // Show the header for internal screens
                  name="PracticeDetail"
                  component={PracticeDetails as any}
                />
                <Stack.Screen
                  options={pageOptions} // Show the header for internal screens
                  name="Feedback"
                  component={Feedback as any}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
