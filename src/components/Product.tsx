import * as React from 'react'
import { Producto } from '../../types'
import { Image, StyleSheet, Text, View } from 'react-native'

const Product = ({
  producto_nombre,
  producto_cantidad,
  unidad_medida_descri,
  estado_producto_descri,
  imagenes
}: Producto) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          alignItems: 'center'
        }}>
        <Image style={styles.imagen} source={{ uri: imagenes[0].imagen_url }} />
      </View>
      <Text style={styles.title}>{producto_nombre}</Text>
      <Text style={styles.descri}>
        {producto_cantidad} [{unidad_medida_descri}]
      </Text>
      <Text style={styles.descri}>{estado_producto_descri}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 150,
    gap: 10,
    borderWidth: 2,
    padding: 12,
    margin: 5,
    backgroundColor: '#ffff',
    borderColor: '#ddd',
    borderRadius: 6
  },
  imagen: {
    width: 80,
    height: 80
  },
  title: { fontSize: 12, fontWeight: 'bold' },
  descri: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#eee',
    paddingVertical: 2,
    paddingHorizontal: 10
  }
})

export default Product
