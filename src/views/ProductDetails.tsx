import React from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { RootStackParams } from '../../types'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  NativeStackNavigationProp,
  NativeStackScreenProps
} from '@react-navigation/native-stack'
import Button from '../components/Button'
import { getToken } from '../../utils/login'
import Constants from 'expo-constants'

type EditProductNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'Editar'
>

const ProductDetails = () => {
  const {
    params: {
      producto_id,
      producto_nombre,
      producto_cantidad,
      unidad_medida_id,
      estado_producto_id,
      estado_producto_descri,
      unidad_medida_descri,
      categorias,
      imagenes
    }
  } = useRoute<NativeStackScreenProps<RootStackParams, 'Editar'>['route']>()
  const backendUrl = Constants.expoConfig?.extra?.backendUrl || ''
  const navigation = useNavigation<EditProductNavigationProps>()

  const eliminarProducto = async () => {
    const token = await getToken()
    try {
      if (token) {
        const response = await fetch(`${backendUrl}/producto/${producto_id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token.token}`
          }
        })
        const data = await response.json()
        console.log({ data })
        navigation.goBack()
      } else {
        console.log('no hay token')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const showConfirmDialog = () => {
    return Alert.alert(
      'Confirmar',
      'Estas seguro que deseas eliminar este producto?',
      [
        // The "Yes" button
        {
          text: 'Si',
          onPress: () => {
            eliminarProducto()
          }
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No'
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttonsContainer}>
        <Button
          title='Eliminar'
          onPress={() => showConfirmDialog()}
          color={'#991b1b'}
        />
        <Button
          title='Editar'
          onPress={() =>
            navigation.navigate('Editar', {
              producto_id,
              producto_nombre,
              producto_cantidad,
              unidad_medida_id,
              estado_producto_id,
              estado_producto_descri,
              unidad_medida_descri,
              categorias,
              imagenes
            })
          }
        />
      </View>
      <ScrollView
        horizontal={true}
        style={styles.imagesContainer}
        contentContainerStyle={{
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
        {imagenes.map((img: any) => (
          <Image
            key={img.imagen_url}
            style={styles.imagen}
            source={{ uri: img.imagen_url }}
          />
        ))}
      </ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{producto_nombre}</Text>
        <Text style={styles.cantidad}>
          {producto_cantidad} {unidad_medida_descri}
        </Text>
        <Text style={styles.cantidad}>{estado_producto_descri}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475569',
    paddingHorizontal: 16
  },
  imagesContainer: {
    flex: 1,
    backgroundColor: '#475569',
    paddingHorizontal: 16
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginVertical: 10
  },
  imagen: {
    width: 300,
    height: 300,
    objectFit: 'contain'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
    textTransform: 'capitalize'
  },
  cantidad: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: '#fff',
    marginBottom: 12
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black'
  },
  danger: {
    backgroundColor: '#fee2e2'
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white'
  }
})

export default ProductDetails
