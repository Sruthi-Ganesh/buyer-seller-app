import React, { useState } from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import * as CONSTANTS from '../helpers/constants'
import { saveToken } from '../actions/token_saver'

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [appState, setAppState] = useState({
    loading: false,
    error: null,
  })
  const dispatch = useDispatch()

  const onLoginPressed = () => {
    const emailError = nameValidator(name.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError) {
      setName({ ...name, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }

    axios
      .post(CONSTANTS.LOGIN_API, {
        username: name.value,
        password: password.value,
        requestedRole: 'buyer', // going to be always buyer from mobile app
      })
      .then((res) => {
        let data = res.data
        let roles = data.roles
        const access_token = data.accessToken
        dispatch(saveToken(access_token))
        setAppState({ loading: false, error: null, roles, access_token })
        navigation.reset({
          index: 0,
          routes: [{ name: 'Dashboard' }],
        })
      })
      .catch((error) => {
        setAppState({ loading: false, error: error.message })
      })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Welcome back.</Header>
      <TextInput
        label="User Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <View className={styles.error}>
        <Text>{appState.error}</Text>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  error: {
    color: theme.colors.error,
  },
})

export default LoginScreen
