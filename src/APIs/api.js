import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'

import { fetchWithTimeout } from '../Shared/fetchData'

export async function getAlhorses(pageNumber) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')

  myHeaders.append('Authorization', `Token ${acc}`)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }
  const data = await fetchWithTimeout(
    `/api/v1/horses/?page=${pageNumber}`,
    requestOptions
  )

  if (data[0].code == 200) {
   
    return data[1]
  } else {
    return []
  }
}

export async function getHorseDetails(horse_id) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/horse/?horse-id=${horse_id}`,
    requestOptions
  )
  return data
}
export async function updateHorse(horseID, rest = {}) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)
  myHeaders.append('Content-Type', 'application/json')

  var raw = JSON.stringify(rest)
  var requestOptions = {
    method: 'PUT',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/horse/?horse-id=${horseID}`,
    requestOptions
  )

  return data
}

export async function addHorseToFav(horse_id) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)
  var formdata = new FormData()
  formdata.append('horse_id', horse_id)

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout('/api/v1/favourite/', requestOptions)

  if (data[0] == 201) {
    return data[1]
  } else {
    return []
  }
}

export async function deleteHorseToFav(horse_id) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)
  var formdata = new FormData()
  formdata.append('horse-id', horse_id)

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/favourite/?horse-id=${horse_id}`,
    requestOptions
  )

  if (data[0] == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getFavHorses(pageNumber) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/favourite/?page=${pageNumber}`,
    requestOptions
  )
  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getMyHorses(pageNumber) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/horse/?page=${pageNumber}`,
    requestOptions
  )

  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function sendFeedBack(email, message) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var formdata = new FormData()
  formdata.append('email', email)
  formdata.append('message', message)

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: myHeaders
  }
  const data = await fetchWithTimeout(
    '/api/v1/feedback/feedback/',
    requestOptions
  )
  if (data[0].code == 200) {
    return true
  } else {
    return false
  }
}

export async function changePassword(password1, password2, oldPass) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)
  var formdata = new FormData()
  formdata.append('password1', password1)
  formdata.append('password2', password2)
  formdata.append('current_password', oldPass)

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    '/api/v1/users/reset-password/',
    requestOptions
  )
  return data
}
export async function resetPassword(password1, password2, token) {
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${token}`)
  var formdata = new FormData()
  formdata.append('password1', password1)
  formdata.append('password2', password2)

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    '/api/v1/users/reset-password/',
    requestOptions
  )
  return data
}

export async function getPlans() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }
  const data = await fetchWithTimeout('/api/v1/payment/plans/', requestOptions)
  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getAllNotifications(pageNumber) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/notifications/notifications/?page=${pageNumber}`,
    requestOptions
  )
  if (data[0].code == 200) {
    return data[1].results
  } else {
    return []
  }
}

export async function getAllCurrencies() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout('/api/v1/getAllCurrency/', requestOptions)

  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getAllBreeds() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout('/api/v1/breeds/', requestOptions)

  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getAllColors() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout('/api/v1/colors/', requestOptions)

  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getAllDisciplines() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout('/api/v1/disciplines/', requestOptions)

  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getAlltemperaments() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout('/api/v1/temperaments/', requestOptions)

  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getMyDetail() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    '/api/v1/users/userprofile/',
    requestOptions
  )

  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function updateMyDetail(
  first_name,
  last_name,
  bio,
  address,
  city,
  zipCode,
  state,
  country,
  notification_setting
) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var formdata = new FormData()

  if (first_name) {
    formdata.append('first_name', first_name)
  }

  if (last_name) {
    formdata.append('last_name', last_name)
  }

  if (bio) {
    formdata.append('bio', bio)
  }
  if (address) {
    formdata.append('address', address)
  }
  if (city) {
    formdata.append('city', city)
  }
  if (zipCode) {
    formdata.append('zipcode', zipCode)
  }

  if (state) {
    formdata.append('state', state)
  }

  if (country) {
    formdata.append('country', country)
  }

  if (notification_setting != 10) {
    formdata.append('receive_notifications', notification_setting)
  }

  var requestOptions = {
    method: 'PUT',
    body: formdata,
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    '/api/v1/users/userprofile/',
    requestOptions
  )

  if (data[0].code == 201) {
    return true
  } else {
    return false
  }
}

export async function sendHorseToServer(
  images_ids,
  title,
  lat,
  lon,
  price,
  description,
  breed_id,
  gender,
  age,
  color_id,
  height,
  temperament_id,
  discipline_id,
  keywords_ids,
  locationName,
  stateName,
  cityName,
  year_of_birth,
  currency
) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Token ${acc}`)

  var raw = JSON.stringify({
    images_id: images_ids,
    title: title,
    // user_location: `${lat}, ${lon}`,
    user_location: `POINT(${lon} ${lat})`,
    price: parseFloat(price),
    description: description,
    breed_id: breed_id,
    country: locationName,
    state: stateName,
    city: cityName,
    gender: gender,
    age: age,
    color_id: color_id,
    height: parseFloat(height),
    temperament_id: temperament_id,
    discipline_id: discipline_id,
    keywords_id: keywords_ids,
    year_of_birth: year_of_birth,
    currency: currency
  })

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  }
  const data = await fetchWithTimeout('/api/v1/horse/', requestOptions)
  return data
}

export async function deleteAHorse(horse_id) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'DELETE',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/horse/?horse-id=${horse_id}`,
    requestOptions
  )
  if (data[0].code == 200) {
    return true
  } else {
    return false
  }
}

export async function addKeyword(keyword) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)
  // myHeaders.append('Content-Type', 'application/json');

  var formdata = new FormData()
  formdata.append('keyword', keyword.toString())

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout('/api/v1/keywords/', requestOptions)
  return data
}

export async function uploadMedia(file, filePath) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Content-Type', 'multipart/form-data; ')
  myHeaders.append('Authorization', `Token ${acc}`)

  var formdata = new FormData()

  formdata.append('file', file, filePath)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow',
    timeout: 60000 * 3
  }
  const data = await fetchWithTimeout('/api/v1/horse-images/', requestOptions)

  return data
}

export async function searchHorses(title, keywords) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }
  // user-search-by-name/?search_param=Test
  // const data = await fetchWithTimeout(
  //   `/api/v1/search-horse/?keywords=["${keywords}"]&title=${title}`,
  //   requestOptions,
  // );
  const data = await fetchWithTimeout(
    `/api/v1/user-search-by-name/?search_param=${title}`,
    requestOptions
  )
  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function likeAHorse(horse_id) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/like-horse/?horse-id=${horse_id}`,
    requestOptions
  )

  if (data[0].code == 200) {
    return true
  } else {
    return false
  }
}

export async function disLikeAHorse(horse_id) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/dislike-horse/?horse-id=${horse_id}`,
    requestOptions
  )
  if (data[0].code == 200) {
    return true
  } else {
    return false
  }
}

export async function forgetPasswordEmailCheck(email) {
  var myHeaders = new Headers()
  // acc = await AsyncStorage.getItem('acc');
  // myHeaders.append('Authorization', `Token ${acc}`);
  var requestOptions = {
    headers: myHeaders,
    method: 'GET',
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/users/reset-email/?email=${email}`,
    requestOptions
  )
  if (data[0].code == 200) {
    return data
  } else {
    return [{ code: 400 }]
  }
}

export async function paymentMethods() {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    headers: myHeaders,
    method: 'GET',
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/payment/paymentMethods/`,
    requestOptions
  )
}

export async function getANewSetupIntent() {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    headers: myHeaders,
    method: 'GET',
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/payment/customer-intent-stripe/`,
    requestOptions
  )
  if (data[0].code == 200) {
    return data
  } else {
    return []
  }
}

export async function getMyCardDetail() {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    headers: myHeaders,
    method: 'GET',
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/payment/paymentMethods/`,
    requestOptions
  )

  if (data[0].code == 200) {
    return data
  } else {
    return []
  }
}

export async function applyPromoCode(code) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  // var formdata = new FormData();
  // formdata.append('plan-id', plan_id);

  var requestOptions = {
    headers: myHeaders,
    method: 'GET',
    // body: formdata,
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/payment/promo_code/?code=` + code,
    requestOptions
  )

  if (data[0].code == 200) {
    return data
  } else {
    return []
  }
}

export async function changeSubcriptionPlan(plan_id) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var formdata = new FormData()
  formdata.append('plan-id', plan_id)

  var requestOptions = {
    headers: myHeaders,
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/payment/updagradeSubscription/`,
    requestOptions
  )

  if (data[0].code == 200) {
    return data
  } else {
    return []
  }
}

export async function appleTransaction(purchase) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var formdata = new FormData()
  formdata.append(
    'original_transaction_id',
    purchase?.originalTransactionIdentifierIOS
  )
  formdata.append('transaction_id', purchase?.transactionId)

  var requestOptions = {
    headers: myHeaders,
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/payment/apple-transaction/`,
    requestOptions
  )

  if (data[0].code == 200) {
    return data
  } else {
    return []
  }
}

export async function userSaveSearchBuyer(
  location_name,
  state,
  // city,
  breed_id,
  min_age,
  max_age,
  min_height,
  max_height,
  min_price,
  max_price,
  discipline_id,
  gender,
  color_id,
  temperament_id,
  keywords_id,
  radius
) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Token ${acc}`)

  try {
    const raw = JSON.stringify({
      country: location_name ? location_name : null,
      state: state ? state : null,
      // city: city ? city : null,
      breed_id: breed_id !== '' && breed_id ? breed_id : null,
      min_age: min_age !== '' ? min_age : null,
      max_age: max_age !== '' ? max_age : null,
      min_height: min_height !== '' ? parseFloat(min_height) : null,
      max_height: max_height !== '' ? parseFloat(max_height) : null,
      min_price: min_price !== '' ? parseFloat(min_price) : null,
      max_price: max_price !== '' ? parseFloat(max_price) : null,
      discipline_id:
        discipline_id !== '' && discipline_id ? discipline_id : null,
      // gender_list: gender !== '' ? gender : [],
      gender: gender ? (gender.length == 0 ? null : gender.toString()) : '',
      color_id: color_id !== '' && color_id ? color_id : null,
      temperament_id:
        temperament_id !== '' && temperament_id ? temperament_id : null,
      keywords_id: keywords_id
        ? keywords_id.length !== 0
          ? keywords_id
          : []
        : [],
      radius
    })

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    const data = await fetchWithTimeout(
      `/api/v1/user-saved-search/`,
      requestOptions
    )
    if (data[0].code == 200) {
      return data
    } else {
      return data
    }
  } catch (error) {
    console.log('userSaveSearchBuyer-error', error)
  }
}

export async function getSavedSearchDetal() {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/user-saved-search/`,
    requestOptions
  )
  if (data[0].code == 200) {
    return data
  } else {
    return []
  }
}

export async function resultUserSearchBuyer(pageNumber, lat, lon) {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/search-horse/?lat=${lat}&lng=${lon}&page=${pageNumber}`,
    requestOptions
  )
  if (data[0].code == 200) {
    return data[1]
  } else {
    return []
  }
}

export async function getAllLocations() {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(`/api/v1/locations/`, requestOptions)

  if (data[0].code == 200) {
    return data
  } else {
    return []
  }
}

export async function getAllConversations(pageNumber) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/chat/conversation/?page=${pageNumber}`,
    requestOptions
  )

  if (data[0].code == 200) {
    return data[1].results
  } else {
    return []
  }
}

export async function sendMessage(messageType, context, reciver_id) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var formdata = new FormData()
  formdata.append('receiver', reciver_id.toString())
  formdata.append('message', context.toString())

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(`/api/v1/chat/messages/`, requestOptions)

  return data
}

export async function deletAccount() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/users/delete-user/`,
    requestOptions
  )

  return data
}

export async function getOrCreateNewChannel(reciver_id,horse_id) {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/chat/conversation/?receiver-id=${reciver_id}&horse-id=${horse_id}`,
    requestOptions
  )
  if (data[0].code == 200) {
    return data[1]
  } else {
    return { data: null }
  }
}

export async function unsunbscribe() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/payment/unsubscribeSubscription/`,
    requestOptions
  )

  if (data[0].code == 200) {
    return true
  } else {
    return false
  }
}

export async function realAllnotifications() {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/notifications/read-all-notifications/`,
    requestOptions
  )

  if (data[0].code == 200) {
    return true
  } else {
    return false
  }
}

export const SignUpWithGoogle = async access_token => {
  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'multipart/form-data')
  // myHeaders.append('Content-Type', '');

  // var raw = JSON.stringify({
  //   code: access_token,
  // });

  var formdata = new FormData()
  formdata.append('access_token', access_token)

  var requestOptions = {
    method: 'POST',
    // headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  }
  const data = await fetchWithTimeout(`/api/v1/users/google/`, requestOptions)
  return data
}

export const SignUpWithApple = async (id_token, code) => {
  // var myHeaders = new Headers();
  // myHeaders.append('Content-Type', 'application/json');
  // myHeaders.append('Content-Type', '');

  // var raw = JSON.stringify({
  //   code: access_token,
  // });

  var formdata = new FormData()
  formdata.append('id_token', `${id_token}`)
  formdata.append('code', `${code}`)
  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }
  const data = await fetchWithTimeout(`/api/v1/users/apple/`, requestOptions)
  return data
}

export const SignupWithFacebook = async token => {
  var formdata = new FormData()
  formdata.append('access_token', `${token}`)

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  }
  const data = await fetchWithTimeout(`/api/v1/users/facebook/`, requestOptions)
  return data
}

export const reportHorse = async (id, reason) => {
  acc = await AsyncStorage.getItem('acc')

  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Token ${acc}`)

  var formdata = new FormData()
  formdata.append('horse', id)
  formdata.append('reason', reason)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'follow'
  }
  const data = await fetchWithTimeout(`/api/v1/report/`, requestOptions)
  return data
}

export const reportUser = async id => {
  acc = await AsyncStorage.getItem('acc')

  var myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')
  myHeaders.append('Authorization', `Token ${acc}`)

  var formdata = new FormData()
  formdata.append('conversation-id', id)
  formdata.append('block', 1)

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: formdata,
    redirect: 'Chat'
  }
  const data = await fetchWithTimeout(
    `/api/v1/chat/block_conversation/`,
    requestOptions
  )
  return data
}

export const getSpecialHorseDistance = async (horseId, lat, lon) => {
  if (lat == 0 || lon == 0) {
    return 0
  }

  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/horse/?horse-id=${horseId}&lat=${lat}&lng=${lon}`,
    requestOptions
  )

  return data
}

export const getAllHorseLatandLong = async () => {
  var myHeaders = new Headers()
  acc = await AsyncStorage.getItem('acc')
  myHeaders.append('Authorization', `Token ${acc}`)
  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/all-horses-lat-lng/`,
    requestOptions
  )

  return data
}

export const sendPlayerIDToServer = async playerID => {
  var formdata = new FormData()
  formdata.append('one_signal_play_id', playerID)
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'PUT',
    body: formdata,
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/users/userprofile/`,
    requestOptions
  )
}

export const getNmberOfNotifications = async () => {
  acc = await AsyncStorage.getItem('acc')
  var myHeaders = new Headers()
  myHeaders.append('Authorization', `Token ${acc}`)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
  }

  const data = await fetchWithTimeout(
    `/api/v1/notifications/unread-all-notifications/`,
    requestOptions
  )

  return data
}

export async function getPrivacy() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(`/api/v1/PrivacyPolicy/`, requestOptions)
  return data
}

export async function getTerms() {
  // var myHeaders = new Headers();
  // acc = await AsyncStorage.getItem('acc');
  // myHeaders.append('Authorization', `Token ${acc}`);
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }

  const data = await fetchWithTimeout(
    `/api/v1/terms_and_conditions/`,
    requestOptions
  )
  return data
}
