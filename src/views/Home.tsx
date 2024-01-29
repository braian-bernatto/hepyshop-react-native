import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import Product from '../components/Product'
import { getToken, logOut } from '../../utils/login'
import { Producto } from '../../types'
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  const navigation = useNavigation()
  const [productos, setProductos] = React.useState([])
  const [token, setToken] = React.useState()
  const backendUrl = Constants.expoConfig?.extra?.backendUrl || ''

  React.useLayoutEffect(() => {
    console.log('entro en layout ', token)
    navigation.setOptions({
      headerRight: () => (
        <Button
          title='Agregar'
          color={'#fff'}
          onPress={() => navigation.navigate('Agregar')}
        />
      ),
      headerLeft: () => (
        <>
          {token ? (
            <Button title='Log Out' color={'#fff'} onPress={() => logOut()} />
          ) : (
            <Button
              title='Login'
              color={'#fff'}
              onPress={() => navigation.navigate('Login')}
            />
          )}
        </>
      )
    })
  }, [token])

  React.useEffect(() => {
    const getProductos = async () => {
      const token = await getToken()
      try {
        if (token) {
          setToken(token)
          const response = await fetch(`${backendUrl}/productos`, {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token.token}`
            }
          })
          const data = await response.json()
          const productWithUrl = data.map((item: any) => ({
            ...item,
            imagenes: item.imagenes.map((img: any) => ({
              ...img,
              imagen_url: `${backendUrl}/${img.imagen_url.replace(
                'public/',
                ''
              )}`
            }))
          }))

          setProductos(productWithUrl)
        } else {
          console.log('no hay token')
          const response = await fetch(`${backendUrl}/productos`)
          const json = await response.json()
          setProductos(json)
        }
      } catch (error) {
        console.error(error)
      }
    }

    getProductos()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>
      <ScrollView
        style={styles.products}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
        {productos.length > 0 &&
          productos.map((producto: Producto) => (
            <Product key={producto.producto_id} {...producto} />
          ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475569'
  },
  products: {
    paddingHorizontal: 24,
    marginBottom: 32
  },
  title: { fontSize: 32, fontWeight: 'bold', margin: 16, color: '#fff' },
  cantidad: { fontSize: 24, fontWeight: 'bold', color: 'gray' }
})
