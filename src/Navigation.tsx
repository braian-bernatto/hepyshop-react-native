import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'

import Home from './views/Home'
import Add from './views/Add'
import Login from './views/Login'
import ProductDetails from './views/ProductDetails'
import Edit from './views/Edit'

const Stack = createNativeStackNavigator()
const routeScreenDefaultOptions = {
  headerStyle: {
    backgroundColor: '#475569'
  },
  headerTitleStyle: {
    color: '#fff'
  }
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='Inicio'
          component={Home}
          options={routeScreenDefaultOptions}
        />
        <Stack.Screen
          name='Agregar'
          component={Add}
          options={{ ...routeScreenDefaultOptions, presentation: 'modal' }}
        />
        <Stack.Screen
          name='Login'
          component={Login}
          options={routeScreenDefaultOptions}
        />
        <Stack.Screen
          name='Detalles'
          component={ProductDetails}
          options={routeScreenDefaultOptions}
        />
        <Stack.Screen
          name='Editar'
          component={Edit}
          options={routeScreenDefaultOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
