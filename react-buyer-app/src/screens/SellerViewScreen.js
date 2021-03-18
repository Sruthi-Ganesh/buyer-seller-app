import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Button,
  ScrollView,
} from 'react-native'
import axios from 'axios'
import { useSelector } from 'react-redux'
import DatePicker from 'react-native-date-picker'
import * as CONSTANTS from '../helpers/constants'

const SellersScreen = ({ route, navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const token = useSelector((state) => state.tokens)
  const [date, setDate] = useState(new Date())
  const access_token = token.access_token
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const { item } = route.params
  const availableFrom = new Date(item.availableFrom).toString().split('GMT')[0]
  const availableTo = new Date(item.availableTo).toString().split('GMT')[0]
  const onSubmit = () => {
    setIsLoading(true)
    setMessage('')
    setError('')
    axios
      .post(
        CONSTANTS.SELLER_SCHEDULE_APPOINTMENT_API,
        {
          sellerId: item.id,
          scheduledAt: date,
        },
        {
          headers: {
            'x-access-token': access_token,
          },
        }
      )
      .then((results) => {
        setMessage(results.data.message)
        setIsLoading(false)
      })
      .catch((err) => {
        setError(err.response.data.message)
        setIsLoading(false)
      })
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    )
  }
  return (
    <ScrollView style={styles.listItem}>
      <Text style={styles.title}>{`${item.name}`}</Text>
      <Text style={styles.body}>{`${item.email_address}`}</Text>
      <Text style={styles.header}>Available from </Text>
      <Text style={styles.body}>{`${availableFrom}`}</Text>
      <Text style={styles.header}>Available To </Text>
      <Text style={styles.body}>{availableTo}</Text>
      <DatePicker style={styles.date} date={date} onDateChange={setDate} />
      <Button
        style={styles.button}
        title="Schedule Appointment"
        onPress={onSubmit}
      />
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.error}>{error}</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700',
  },
  listItem: {
    marginTop: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  metaInfo: {
    marginLeft: 10,
  },
  title: {
    fontSize: 20,
    width: 200,
    padding: 10,
  },
  body: {
    fontSize: 12,
    width: 200,
    padding: 10,
  },
  header: {
    fontSize: 16,
    width: 200,
    padding: 5,
    color: 'gray',
  },
  error: {
    fontSize: 12,
    width: 200,
    padding: 10,
    color: 'red',
    marginBottom: 30,
  },
  message: {
    fontSize: 12,
    width: 200,
    padding: 10,
    color: 'blue',
  },
  date: {
    marginTop: 30,
    marginBottom: 30,
    width: 300,
  },
  button: {
    elevation: 8,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  separator: {
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})
export default SellersScreen
