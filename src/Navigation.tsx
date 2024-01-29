import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from './views/Home'
import Add from './views/Add'
import Login from './views/Login'

const Stack = createNativeStackNavigator()

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Inicio' component={Home} />
      <Stack.Screen
        name='Agregar'
        component={Add}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen
        name='Login'
        component={Login}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  )
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  )
}
