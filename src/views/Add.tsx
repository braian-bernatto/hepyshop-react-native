import * as React from 'react'
import { Producto } from '../../types'
import { useNavigation } from '@react-navigation/native'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Add() {
  const navigation = useNavigation()
  const [newProducto, setNewProducto] = React.useState<Producto>({
    producto_id: 0,
    producto_nombre: '',
    producto_cantidad: 0,
    estado_producto: 0,
    unidad_medida_id: 0
  })

  const onSave = async () => {
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Nuevo Producto</Text>
      <TextInput
        onChangeText={text =>
          setNewProducto({ ...newProducto, producto_nombre: text })
        }
        placeholder='Nombre'
        placeholderTextColor='#fff'
        style={styles.textInput}
      />
      <TextInput
        onChangeText={cant =>
          setNewProducto({ ...newProducto, producto_cantidad: +cant })
        }
        keyboardType='number-pad'
        placeholder='Cantidad'
        placeholderTextColor='#fff'
        style={styles.numberInput}
      />
      <Button title='Guardar' color='#fff' onPress={onSave} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475569',
    alignItems: 'center'
  },

  title: { fontSize: 32, fontWeight: '700', padding: 20, color: '#fff' },

  textInput: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#fff',
    shadowColor: '#fff'
  },

  numberInput: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#fff'
  }
})
