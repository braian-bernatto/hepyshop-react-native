import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'

export const login = async ({
  correo,
  password
}: {
  correo: string
  password: string
}) => {
  const backendUrl = Constants.expoConfig?.extra?.backendUrl || ''
  try {
    const response = await fetch(`${backendUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correo, password })
    })
    const token = await response.json()
    await AsyncStorage.setItem('token', JSON.stringify(token))
  } catch (e) {
    console.log({ error: e })
  }
}

export const getToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('token')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (error) {
    console.log(error)
  }
}

export const logOut = async () => {
  try {
    await AsyncStorage.removeItem('token')
  } catch (e) {
    console.log(e)
  }
}
