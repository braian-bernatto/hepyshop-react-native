import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import Product from '../components/Product'
import { getToken, logOut } from '../../utils/login'
import { Producto } from '../../types'
import { Button, FlatList, StyleSheet, Text, View } from 'react-native'

export default function Home() {
  const navigation = useNavigation()
  const [productos, setProductos] = React.useState<Producto[]>([])
  const [token, setToken] = React.useState()
  const [refreshing, setRefreshing] = React.useState(false)
  const backendUrl = Constants.expoConfig?.extra?.backendUrl || ''

  const getProductos = async () => {
    const token = await getToken()
    try {
      if (token) {
        setToken(token)
        console.log({ token })

        const response = await fetch(`${backendUrl}/productos`, {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token.token}`
          }
        })
        const data = await response.json()
        const productWithUrl = data
          .map((item: any) => ({
            ...item,
            imagenes: item.imagenes.map((img: any) => ({
              ...img,
              imagen_url: img.imagen_url
                ? `${backendUrl}/${img.imagen_url.replace('public/', '')}`
                : null
            }))
          }))
          .sort((a: Producto, b: Producto) => b.producto_id - a.producto_id)

        setProductos(productWithUrl)
      } else {
        console.log('no hay token')
        const response = await fetch(`${backendUrl}/productos`)
        const json = await response.json()
        setProductos(json)
      }
      setRefreshing(false)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRefresh = () => {
    setRefreshing(true)
    getProductos()
  }

  React.useLayoutEffect(() => {
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
    getProductos()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>
      <FlatList
        data={productos}
        style={styles.productsList}
        ListEmptyComponent={
          <Text style={styles.title}>No se encontraron productos...</Text>
        }
        numColumns={2}
        contentContainerStyle={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 40
        }}
        keyExtractor={item => item.producto_id.toString()}
        renderItem={({ item }) => <Product key={item.producto_id} {...item} />}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475569'
  },
  productsList: {
    paddingHorizontal: 24
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    margin: 16,
    color: '#fff'
  },
  cantidad: { fontSize: 24, fontWeight: 'bold', color: 'gray' }
})
