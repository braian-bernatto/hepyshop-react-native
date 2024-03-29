import * as React from 'react'
import { Producto, RootStackParams } from '../../types'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import ButtonCustom from '../components/Button'

type ProductDetailsNavigationProps = NativeStackNavigationProp<
  RootStackParams,
  'Detalles'
>

const Product = ({
  producto_id,
  producto_nombre,
  producto_cantidad,
  unidad_medida_id,
  estado_producto_id,
  estado_producto_descri,
  unidad_medida_descri,
  categorias,
  imagenes
}: Producto) => {
  const navigation = useNavigation<ProductDetailsNavigationProps>()
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
          height: 80,
          alignItems: 'center'
        }}>
        {imagenes.length > 0 && (
          <Image
            style={styles.imagen}
            source={{ uri: imagenes[0].imagen_url }}
          />
        )}
      </View>
      <Text style={styles.title}>{producto_nombre}</Text>
      <Text style={styles.descri}>
        {producto_cantidad} [{unidad_medida_descri}]
      </Text>
      <Text style={styles.descri}>{estado_producto_descri}</Text>
      <View style={styles.buttonContainer}>
        <ButtonCustom
          title='Ver'
          onPress={() =>
            navigation.navigate('Detalles', {
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 150,
    height: 220,
    gap: 5,
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
  title: { width: '100%', fontSize: 12, fontWeight: 'bold' },
  descri: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'gray',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#eee',
    paddingVertical: 2,
    paddingHorizontal: 10
  },
  buttonContainer: {
    marginTop: 5,
    width: '100%'
  }
})

export default Product
