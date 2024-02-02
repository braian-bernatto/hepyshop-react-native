import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { login } from '../../utils/login'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Button from '../components/Button'

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
        value={user.correo}
        placeholderTextColor={'#fff'}
        style={styles.textInput}
      />
      <TextInput
        onChangeText={text => setUser({ ...user, password: text })}
        placeholder='Contraseña'
        placeholderTextColor={'#fff'}
        style={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        <Button title='Enviar' onPress={onSubmit} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#475569',
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    width: '100%',
    marginVertical: 6,
    paddingHorizontal: 20
  },
  title: { fontSize: 32, fontWeight: '700', padding: 20, color: '#fff' },
  textInput: {
    width: '90%',
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    color: '#fff'
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
