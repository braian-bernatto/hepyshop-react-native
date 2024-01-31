import * as React from 'react'
import {
  CategoriaProducto,
  EstadoProducto,
  Producto,
  UnidadMedida
} from '../../types'
import { useNavigation } from '@react-navigation/native'
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import { getToken } from '../../utils/login'
import Constants from 'expo-constants'
import { CheckBox } from '@rneui/themed'
import * as ImagePicker from 'expo-image-picker'

export default function Add() {
  const backendUrl = Constants.expoConfig?.extra?.backendUrl || ''
  const navigation = useNavigation()
  const [newProducto, setNewProducto] = React.useState<Producto>({
    producto_id: 0,
    producto_nombre: '',
    producto_cantidad: 0,
    estado_producto_id: 0,
    unidad_medida_id: 0
  })

  const [estados, setEstados] = React.useState([])
  const [unidadesMedida, setUnidadesMedida] = React.useState([])
  const [categorias, setCategorias] = React.useState([])
  const [images, setImages] = React.useState<ImagePicker.ImagePickerAsset[]>([])

  React.useEffect(() => {
    const getEstados = async () => {
      const token = await getToken()
      try {
        if (token) {
          const response = await fetch(`${backendUrl}/estados-producto`, {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token.token}`
            }
          })
          const data = await response.json()
          const formattedData = data.map((estado: EstadoProducto) => ({
            key: estado.estado_producto_id,
            label: estado.estado_producto_descri,
            value: estado.estado_producto_id
          }))
          if (formattedData.length > 0) {
            setEstados(formattedData)
          }
        } else {
          console.log('no hay token')
        }
      } catch (error) {
        console.error(error)
      }
    }

    const getUnidadMedida = async () => {
      const token = await getToken()
      try {
        if (token) {
          const response = await fetch(`${backendUrl}/unidades-medida`, {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token.token}`
            }
          })
          const data = await response.json()
          const formattedData = data.map((estado: UnidadMedida) => ({
            key: estado.unidad_medida_id,
            label: estado.unidad_medida_descri,
            value: estado.unidad_medida_id
          }))
          if (formattedData.length > 0) {
            setUnidadesMedida(formattedData)
          }
        } else {
          console.log('no hay token')
        }
      } catch (error) {
        console.error(error)
      }
    }

    const getCategorias = async () => {
      const token = await getToken()
      try {
        if (token) {
          const response = await fetch(`${backendUrl}/categorias-producto`, {
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${token.token}`
            }
          })
          const data = await response.json()
          const formattedData = data.map((estado: CategoriaProducto) => ({
            key: estado.categoria_producto_id,
            label: estado.categoria_producto_descri,
            selected: false
          }))
          if (formattedData.length > 0) {
            setCategorias(formattedData)
          }
        } else {
          console.log('no hay token')
        }
      } catch (error) {
        console.error(error)
      }
    }

    getEstados()
    getUnidadMedida()
    getCategorias()
  }, [])

  const onSubmit = async () => {
    let formData = new FormData()
    const token = await getToken()
    if (!token) {
      console.error('no hay token')
      return null
    }

    const categoriasId = categorias
      .filter((cat: any) => cat.selected)
      .map((cat: any) => +cat.key)

    formData.append('categorias', categoriasId.join(','))

    if (images.length) {
      images.forEach((foto: any) =>
        formData.append('foto', {
          uri: foto.uri,
          name: foto.fileName,
          type: foto.type
        } as any)
      )
    }

    Object.keys(newProducto).forEach((key: any) => {
      formData.append(key, `${newProducto[key]}`)
    })

    console.log(JSON.stringify(formData, null, 2))

    try {
      const response = await fetch(`${backendUrl}/producto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Bearer ${token.token}`
        },
        body: formData
      })
      const data = await response.json()
      console.log(data)
      navigation.goBack()
    } catch (error) {
      console.error(error)
    }
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      selectionLimit: 4,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      console.log(JSON.stringify(result, null, 2))
      setImages(result.assets)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Nuevo Producto</Text>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          flexDirection: 'column',
          alignItems: 'center',
          paddingBottom: 50
        }}>
        <View style={styles.imageContainer}>
          <Button title='Selecciona Fotos' onPress={pickImage} color={'#fff'} />
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              overflow: 'hidden'
            }}>
            {images &&
              images.map((image: any) => (
                <Image
                  key={image.assetId}
                  source={{ uri: image.uri }}
                  style={styles.image}
                />
              ))}
          </ScrollView>
        </View>
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
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 10
            },
            placeholder: {
              color: '#fff'
            }
          }}
          placeholder={{ label: 'Selecciona un estado' }}
          onValueChange={value =>
            setNewProducto({ ...newProducto, estado_producto_id: +value })
          }
          items={estados}
        />
        <RNPickerSelect
          style={{
            ...pickerSelectStyles,
            iconContainer: {
              top: 20,
              right: 10
            },
            placeholder: {
              color: '#fff'
            }
          }}
          placeholder={{ label: 'Selecciona una unidad' }}
          onValueChange={value =>
            setNewProducto({ ...newProducto, unidad_medida_id: +value })
          }
          items={unidadesMedida}
        />
        <View style={styles.checkboxContainer}>
          <Text style={styles.subtitle}>Categoria</Text>
          {categorias.map((cat: any) => (
            <CheckBox
              key={cat.key}
              title={cat.label}
              checkedColor='gray'
              checked={
                categorias.filter(
                  (categoria: any) => categoria.key === cat.key
                )[0].selected || cat.selected
              }
              onPress={() => {
                const newCategorias = categorias.map((categoria: any) => {
                  if (categoria.key !== cat.key) {
                    return categoria
                  } else {
                    return {
                      key: categoria.key,
                      label: categoria.label,
                      selected: !categoria.selected
                    }
                  }
                })
                setCategorias(newCategorias as any)
              }}
            />
          ))}
        </View>
        <Button title='Guardar' color='#fff' onPress={onSubmit} />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475569'
  },

  imageContainer: {
    height: 250
  },

  image: {
    width: 150,
    height: 150,
    objectFit: 'cover',
    borderRadius: 10
  },

  title: { fontSize: 32, fontWeight: '700', padding: 20, color: '#fff' },
  subtitle: {
    fontSize: 20,
    marginVertical: 6,
    color: '#fff'
  },

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
  },

  checkboxContainer: {
    width: '90%',
    marginVertical: 6,
    borderRadius: 6
  }
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    alignSelf: 'center',
    width: '90%',
    marginVertical: 6,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#fff',
    paddingRight: 30 // to ensure the text is never behind the icon
  }
})
