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
} from 'react-native'
import axios from 'axios'
import { useSelector } from 'react-redux'
import filter from 'lodash.filter'
import * as CONSTANTS from '../helpers/constants'

const SellersScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')
  const [fullData, setFullData] = useState([])
  const token = useSelector((state) => state.tokens)
  const access_token = token.access_token

  useEffect(() => {
    setIsLoading(true)

    axios
      .get(CONSTANTS.SELLERS_API, {
        headers: {
          'x-access-token': access_token,
        },
      })
      .then((results) => {
        setData(results.data.data)
        setFullData(results.data.data)
        setIsLoading(false)
      })
      .catch((err) => {
        setIsLoading(false)
        setError(err.message)
      })
  }, [])

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="always"
          value={query}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{ backgroundColor: '#fff', paddingHorizontal: 20 }}
        />
      </View>
    )
  }

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase()
    const filteredData = filter(fullData, (user) => {
      return contains(user.name, user.email_address, formattedQuery)
    })
    setData(filteredData)
    setQuery(text)
  }

  const clickOnItem = (item) => {
    navigation.navigate('SellerViewScreen', {
      item,
    })
  }

  const contains = (name, email, _query) => {
    if (name.includes(_query) || email.includes(_query)) {
      return true
    }

    return false
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5500dc" />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Error fetching data... {error}</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>All Sellers</Text>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableWithoutFeedback onPress={() => clickOnItem(item)}>
            <View style={styles.listItem}>
              <View style={styles.metaInfo}>
                <Text style={styles.title}>{`${item.name}`}</Text>
                <Text style={styles.body}>{`${item.email_address}`}</Text>
                <Text style={styles.header}>Available from </Text>
                <Text style={styles.body}>{`${item.availableFrom}`}</Text>
                <Text style={styles.header}>Available To </Text>
                <Text style={styles.body}>${item.availableTo}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        )}
      />
    </View>
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
    flexDirection: 'row',
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
})
export default SellersScreen
