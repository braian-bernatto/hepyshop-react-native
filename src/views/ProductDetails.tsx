import React from 'react'
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import { RootStackParams } from '../../types'
import { useRoute } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

const ProductDetails = () => {
  const {
    params: {
      producto_nombre,
      producto_cantidad,
      unidad_medida_descri,
      estado_producto_descri,
      imagenes
    }
  } = useRoute<NativeStackScreenProps<RootStackParams, 'Detalles'>['route']>()

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={styles.container}
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
  }
})

export default ProductDetails
