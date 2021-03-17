import React from 'react'
import { Provider } from 'react-native-paper'
import { Provider as ReduxProvider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createStore } from 'redux'
import { theme } from './src/core/theme'
import tokenSaver from './src/actions/token_saver'
import {
  StartScreen,
  LoginScreen,
  RegisterScreen,
  Dashboard,
  SellersScreen,
  SellerViewScreen,
} from './src/screens'

const Stack = createStackNavigator()
const store = createStore(tokenSaver)

const App = () => {
  return (
    <Provider theme={theme}>
      <ReduxProvider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="StartScreen"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="StartScreen" component={StartScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="SellersScreen" component={SellersScreen} />
            <Stack.Screen
              name="SellerViewScreen"
              component={SellerViewScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ReduxProvider>
    </Provider>
  )
}

export default App
