import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { login } from '../../utils/login'
import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

export default function Login() {
  const navigation = useNavigation()
  const [user, setUser] = React.useState({
    correo: '',
    password: ''
  })

  const onSubmit = async () => {
    await login(user)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesion</Text>
      <TextInput
        onChangeText={text => setUser({ ...user, correo: text.toLowerCase() })}
        placeholder='Correo'
        style={styles.textInput}
      />
      <TextInput
        onChangeText={text => setUser({ ...user, password: text })}
        placeholder='Contraseña'
        style={styles.textInput}
      />
      <Button title='Enviar' onPress={onSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },

  title: { fontSize: 32, fontWeight: '700', padding: 20 },

  textInput: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6
  },

  numberInput: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6
  }
})
