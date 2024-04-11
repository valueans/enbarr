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
  getNmberOfNotifications,
  getOrCreateNewChannel,
  searchHorses
} from '../../../APIs/api'
import { TimeFromNow } from '../../../utils/Time'
import * as PubNubKeys from '../Chat/PubNubKeys'

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
      listOfSerachHorses: [],
      loading: false,
      myImage: '',
      isSeraching: false,
      filterItem: 'All',
      numberOfNotif: 0,
      refreshing: false,
      totalHorseCount: 0,
      page: 1
    }
  }

  goToDetails = item => {
    const { navigation } = this.props
    const { userDetail } = this.props

    navigation.navigate('Details', {
      item,
      pubnub:this.pubnub,
      myhorse: userDetail.user.id === item.userprofile.id
    })
  }

  onRefresh = () => {
    this.setState({ refreshing: true })
    setTimeout(() => {
      this.setState({ refreshing: false })
    }, 2000)}
  

 
  async fetchHorses() {
    const { listOfHorses, filterItem } = this.state
    this.setState({ isSeraching: false,loading: true })
    

    const res = await getAlhorses(1)
    const horses = res.results
    this.setState({ loading: false,totalHorseCount:res?.count })

    if (filterItem == 'All') {
      this.setState({ listOfHorses: horses })
    } else if (filterItem == 'Last Day') {
      x = horses.filter((item, index) => TimeFromNow(item.created_at) == 'D')
      this.setState({ listOfHorses: x })
    } else if (filterItem == 'Week') {
      x = horses.filter(
        (item, index) =>
          TimeFromNow(item.created_at) == 'W' ||
          TimeFromNow(item.created_at) == 'D'
      )
      this.setState({ listOfHorses: x })
    } else if (filterItem == 'Month') {
      x = horses.filter(
        (item, index) =>
          TimeFromNow(item.created_at) == 'M' ||
          TimeFromNow(item.created_at) == 'W' ||
          TimeFromNow(item.created_at) == 'D'
      )
      this.setState({ listOfHorses: x })
    }

    const notifCount = await getNmberOfNotifications()
    this.setState({ numberOfNotif: notifCount[1].count })
  }
   getPurchaseHistory = async () => {
    try {
      const purchaseHistory = await RNIap.getPurchaseHistory();
      console.log('PURCHASE HISRTORY ', purchaseHistory)
      const data = await appleTransaction(purchaseHistory[0])
      console.log('SUCCESS OF API CALL ', data)

    } catch (error) {
      console.log('error ', error)
    }
  }


  componentDidMount(){
    this.fetchHorses()
    this.getPurchaseHistory()
  }


   loadMoreHorses = async () => {
    const {page}=this.state
   
    const res = await getAlhorses(page + 1)
    
    const data=res?.results
   
    const {  filterItem } = this.state
    if (data != '') {
      this.setState({page:page+1})
      if (filterItem == 'All') {
        this.setState(prevState=>({listOfHorses: [...prevState.listOfHorses, ...data]}))
     
      } else if (filterItem == 'Last Day') {
        x = data.filter((item, index) => TimeFromNow(item.created_at) == 'D')
        this.setState(prevState=>({listOfHorses: [...prevState.listOfHorses, ...x]}))
      
        
      } else if (filterItem == 'Week') {
        x = data.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D'
        )
        this.setState(prevState=>({listOfHorses: [...prevState.listOfHorses, ...x]}))
      } else if (filterItem == 'Month') {
        x = data.filter(
          (item, index) =>
            TimeFromNow(item.created_at) == 'M' ||
            TimeFromNow(item.created_at) == 'W' ||
            TimeFromNow(item.created_at) == 'D'
        )
        this.setState(prevState=>({listOfHorses: [...prevState.listOfHorses, ...x]}))
      }
    }
  }

   goToChat = async item => {
    const { navigation } = this.props
    const data = await getOrCreateNewChannel(item.userprofile.user.id,item.id)
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
    if (e == '') {
      this.setState({isSeraching:false,loading:true})
   
      const res = await getAlhorses(1)
      const horses=res.results
      this.setState({isSeraching:false,totalHorseCount:res.count, loading:false ,listOfHorses:horses})
     
    } else {
      this.setState({isSeraching:true,loading:true ,totalHorseCount:0})
   
   
      const res = await searchHorses(e, e)
     
      const seachHorse=res.results
      this.setState({totalHorseCount:res.count,listOfHorses:seachHorse ,loading:false})
  
    }
  }

  optimizedSerachUsernamefunc = (this.debounce(this.onChnageTextFunc))


  render() {
    const {numberOfNotif,myImage,loading,isSeraching,listOfHorses ,refreshing,totalHorseCount,listOfSerachHorses}=this.state
    const {pubnub}=this
    const {navigation,userDetail}=this.props
    return (
      <Background>
      <SafeAreaView style={styles.container}>
        <View style={[styles.container, styles.wrapper]}>
          <HomeHeader
            showBackButton={false}
            numberOfNotif={numberOfNotif}
            pubnub={pubnub}
            setFilterItem={item => this.setState({filterItem:item,listOfHorses:[]},()=>this.fetchHorses())}
            onChnageTextFunc={this.optimizedSerachUsernamefunc}
            avatar={myImage}
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
            {!isSeraching ? (
              <FlatList
                initialNumToRender={20}
                onEndReached={()=>{ this.loadMoreHorses()}}
                onEndReachedThreshold={0.7}
                contentContainerStyle={{ paddingBottom: 90 }}
                keyExtractor={index =>
                  (index + 1 + Math.random() * 100).toString()
                }
                removeClippedSubviews
                maxToRenderPerBatch={20}
                data={listOfHorses}
                extraData={listOfHorses}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                
                  return (
                    <>
                      <MainItem
                        item={item}
                        pubnub={pubnub}
                        index={index}
                        onPressDetails={() => this.goToDetails(item)}
                        onPressMessage={() => this.goToChat(item)}
                        onPressImage={() => this.goToDetails(item)}
                        myhorse={
                          userDetail.user.id === item?.userprofile?.id
                        }
                      />
                    </>
                  )
                }}
                refreshControl={
                  <RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />
                }
                ListFooterComponent={() => !!totalHorseCount && totalHorseCount>listOfHorses.length &&<ActivityIndicator  size="large" />}
                ListEmptyComponent={() => (
                  <View style={styles.nothingWrapper}>
                    <Text style={styles.nothingText}>
                      There is nothing to show
                    </Text>
                  </View>
                )}
              />
            ) : (
              <FlatList
                initialNumToRender={20}
                onEndReached={this.loadMoreHorses}
                onEndReachedThreshold={0.7}
                contentContainerStyle={{ paddingBottom: 90 }}
                keyExtractor={index =>
                  (index + 1 + Math.random() * 100).toString()
                }
                data={listOfSerachHorses}
                extraData={listOfSerachHorses}
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
                ListFooterComponent={() => !!totalHorseCount && totalHorseCount>listOfHorses?.length &&<ActivityIndicator  size="large" />}
                ListEmptyComponent={() => (
                  <View style={styles.nothingWrapper}>
                    <Text style={styles.nothingText}>
                      There is nothing to show
                    </Text>
                  </View>
                )}
               
              />
            )}
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
    userDetail: state.userDetail.userDetail
  }
}

export default connect(mapStateToProps)(HomeScreen)
