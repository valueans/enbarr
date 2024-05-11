import React, { PureComponent } from 'react'
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import HomeHeader from '../../../components/Common/HomeHeader'
import Background from '../../../components/Layout/Background'
import MainItem from '../../../components/ListItem/MainItem'
import COLORS from '../../../utils/colors'
import fonts from '../../../utils/fonts'

import PubNub from 'pubnub'
import * as RNIap from 'react-native-iap'
import { BarIndicator } from 'react-native-indicators'
import {
  appleTransaction,
  getAlhorses,
  getMyDetail,
  getNmberOfNotifications,
  getOrCreateNewChannel,
  searchHorses
} from '../../../APIs/api'
import { TimeFromNow } from '../../../utils/Time'
import * as PubNubKeys from '../Chat/PubNubKeys'
import { setNotificationCount } from '../../../redux/numberOfNotifications'

class HomeScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.pubnub = new PubNub({
      subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
      publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
      userId: `${props.userDetail?.user?.email}`
      // uuid: `${myDetail?.user?.email}`,
    })
    this.state = {
      listOfHorses: [],
      loading: false,
      myImage: '',
      isSearching: false,
      filterItem: 'All',
      refreshing: false,
      totalHorseCount: 0,
      page: 1,
      searchText: ''
    }
    this.menuItems = ['All', 'Last Day', 'Week', 'Month']
  }

  goToDetails = item => {
    const { navigation } = this.props
    const { userDetail } = this.props

    navigation.navigate('Details', {
      item,
      pubnub: this.pubnub,
      myhorse: userDetail.user.id === item.userprofile.id
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 2000)
  }

  async fetchHorses() {
    const { filterItem, page } = this.state
    const { setNotificationCount } = this.props
    let filterParam =
      filterItem === this.menuItems[1]
        ? 'last_day'
        : filterItem === this.menuItems[2]
        ? 'week'
        : filterItem === this.menuItems[3]
        ? 'month'
        : 'all'

    this.setState({ isSearching: false, loading: true })

    const res = await getAlhorses(page, filterParam)
    const horses = res.results
    this.setState({
      loading: false,
      totalHorseCount: res?.count,
      listOfHorses: horses,
      page: page + 1
    })

    const notifCount = await getNmberOfNotifications()
    setNotificationCount(notifCount[1]?.count)
  }
  getPurchaseHistory = async () => {
    try {
      const purchaseHistory = await RNIap.getPurchaseHistory()
      console.log('PURCHASE HISRTORY ', purchaseHistory)
      const data = await appleTransaction(purchaseHistory[0])
      console.log('SUCCESS OF API CALL ', data)
    } catch (error) {
      console.log('error ', error)
    }
  }

  componentDidMount() {
    this.fetchHorses()
  }

  loadMoreHorses = async () => {
    const {
      page,
      filterItem,
      totalHorseCount,
      listOfHorses,
      loading,
      isSearching,
      searchText
    } = this.state
    if (
      (totalHorseCount && !(totalHorseCount > listOfHorses?.length)) ||
      loading ||
      isSearching
    )
      return
    let filterParam =
      filterItem === this.menuItems[1]
        ? 'last_day'
        : filterItem === this.menuItems[2]
        ? 'week'
        : filterItem === this.menuItems[3]
        ? 'month'
        : 'all'
    let res = {}
    if (searchText) {
      res = await searchHorses(e, page)
    } else {
      res = await getAlhorses(page, filterParam)
    }
    const horses = res?.results

    this.setState(prevState => ({
      listOfHorses: [...prevState.listOfHorses, ...horses],
      page: page + 1
    }))
  }

  goToChat = async item => {
    const { navigation } = this.props
    const data = await getOrCreateNewChannel(item.userprofile.user.id, item.id)
    if (data.data) {
      navigation.navigate('Chat', {
        item: data.data,
        myDetail: data.data.user_one_profile,
        pubnub: this.pubnub
      })
    } else {
      Alert.alert('Error', 'Please try again later.')
    }
  }

  debounce = func => {
    let timer
    return function (...args) {
      const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, 500)
    }
  }

  onChnageTextFunc = async e => {
    this.setState({ listOfHorses: [], totalHorseCount: 0, searchText: e ,page:1},async()=>{
      if (e == '') {
        this.fetchHorses()
      } else {
        this.setState({ isSearching: true, loading: true, totalHorseCount: 0 })
  
        const res = await searchHorses(e, 1)
  
        const seachHorse = res.results
        this.setState({
          totalHorseCount: res.count,
          listOfHorses: seachHorse,
          loading: false,
          page: 2
        })
      }
    })
  
  }

  optimizedSerachUsernamefunc = this.debounce(this.onChnageTextFunc)

  getUniqueHorses = () => [
    ...new Map(this.state.listOfHorses.map(item => [item['id'], item])).values()
  ]

  render() {
    const { loading, isSearching, listOfHorses, refreshing, totalHorseCount } =
      this.state
    const { pubnub } = this
    const { navigation, userDetail, numberOfNotifications } = this.props

    return (
      <Background>
        <SafeAreaView style={styles.container}>
          <View style={[styles.container, styles.wrapper]}>
            <HomeHeader
              showBackButton={false}
              numberOfNotif={numberOfNotifications}
              pubnub={pubnub}
              setFilterItem={item =>
                this.setState(
                  {
                    filterItem: item,
                    totalHorseCount: 0,
                    listOfHorses: [],
                    page: 1
                  },
                  () => this.fetchHorses()
                )
              }
              onChnageTextFunc={this.optimizedSerachUsernamefunc}
              avatar={userDetail?.['user-profile']?.profile_photo}
              navigation={navigation}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  // alignSelf: 'center',
                  color: COLORS.color10,
                  fontSize: 11,
                  fontFamily: fonts.light,
                  fontWeight: '100',
                  marginBottom: 12
                }}
              >
                Search for exact title of horse
              </Text>
              <Text style={styles.listTitle}>Recently added</Text>
              {loading && (
                <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
              )}

              <FlatList
                initialNumToRender={20}
                onEndReached={() => this.loadMoreHorses()}
                // onEndReachedThreshold={0.7}
                contentContainerStyle={{ paddingBottom: 90 }}
                keyExtractor={index =>
                  (index + 1 + Math.random() * 100).toString()
                }
                data={listOfHorses}
                extraData={listOfHorses}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <MainItem
                    pubnub={pubnub}
                    item={item}
                    index={index}
                    onPressDetails={() => this.goToDetails(item)}
                    onPressMessage={() => this.goToChat(item)}
                    onPressImage={() => this.goToDetails(item)}
                    myhorse={
                      userDetail.user.id === item.userprofile.id ? true : false
                    }
                  />
                )}
                ListFooterComponent={() =>
                  !!totalHorseCount &&
                  !isSearching &&
                  totalHorseCount > listOfHorses?.length && (
                    <ActivityIndicator size="large" />
                  )
                }
                ListEmptyComponent={() =>
                  !loading && (
                    <View style={styles.nothingWrapper}>
                      <Text style={styles.nothingText}>
                        There is nothing to show
                      </Text>
                    </View>
                  )
                }
              />
            </View>
          </View>
        </SafeAreaView>
      </Background>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    paddingHorizontal: 16
  },

  listTitle: {
    color: COLORS.color10,
    fontSize: 15,
    fontFamily: fonts.medium,
    fontWeight: '600',
    marginBottom: 12
  },
  nothingText: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: COLORS.color17
  },
  nothingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120
  }
})

const mapStateToProps = state => {
  return {
    userDetail: state.userDetail.userDetail,
    numberOfNotifications: state.numberOfNotifications.numberOfNotifications
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setNotificationCount: count => dispatch(setNotificationCount(count))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
