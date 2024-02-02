import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import Constants from 'expo-constants'
import Product from '../components/Product'
import { getToken, logOut } from '../../utils/login'
import { Producto } from '../../types'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default function Home() {
  const navigation = useNavigation()
  const [productos, setProductos] = React.useState<Producto[]>([])
  const [token, setToken] = React.useState()
  const [refreshing, setRefreshing] = React.useState(false)
  const backendUrl = Constants.expoConfig?.extra?.backendUrl || ''
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState('')

  const getProductos = async () => {
    const token = await getToken()
    try {
      if (token) {
        setToken(token)
        setIsLoading(true)
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
        setIsLoading(false)
      } else {
        console.log('no hay token')
        setIsLoading(true)
        const response = await fetch(`${backendUrl}/productos`)
        const json = await response.json()
        setProductos(json)
      }
      setError('')
    } catch (error) {
      console.error(error)
      setError('Error al cargar los productos...')
    }
    setIsLoading(false)
    setRefreshing(false)
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
  }, [navigation, token, productos])

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProductos()
    })

    return unsubscribe
  }, [navigation])

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={'#fff'} />
        <Text style={styles.title}>Cargando...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
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
            renderItem={({ item }) => (
              <Product key={item.producto_id} {...item} />
            )}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475569'
  },
  errorContainer: {
    backgroundColor: '#FFC0CB',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
    margin: 16,
    alignItems: 'center'
  },
  errorText: {
    color: '#D8000C',
    fontSize: 16,
    textAlign: 'center'
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center'
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
