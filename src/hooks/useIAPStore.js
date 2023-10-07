import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'
import { useEffect } from 'react'
import { Alert, Platform } from 'react-native'
import * as RNIap from 'react-native-iap'
import { _GET_SKUS } from '../Constants/urls'
import Geolocation from 'react-native-geolocation-service'
import { appleTransaction } from '../APIs/api'

const useIAPStore = () => {
  const navigation = useNavigation()
  const [isStoreConnected, setStoreConnected] = useState(false)
  const { currentPurchase, currentPurchaseError, finishTransaction } =
    RNIap.useIAP()
  const [appSubscriptions, setAppSubscriptions] = useState([])
  const [fetchLoading, setFetchLoading] = useState(false)
  const [purchaseLoading, setPurchaseLoading] = useState(false)

  const clearPendingPurchases = async () => {
    try {
      if (Platform.OS == 'android')
        await RNIap.flushFailedPurchasesCachedAsPendingAndroid()
      else {
        await RNIap.clearProductsIOS()
        await RNIap.clearTransactionIOS()
      }
    } catch (error) {
      console.log(
        `ERROR WHILE CLEARING PENDING PURCHASES AND PRODUCTS ${error}`
      )
    }
  }

  const getAppSubscriptions = async () => {
    try {
      setFetchLoading(true)
      await RNIap.initConnection()
      await clearPendingPurchases()
      setStoreConnected(true)
      const appSubs = await RNIap.getSubscriptions({
        skus: _GET_SKUS()
      })
      setAppSubscriptions(appSubs)
      setFetchLoading(false)
    } catch (error) {
      console.log(
        `ERROR WHILE FETCHING APP SUBSCRIPTIONS ${JSON.stringify(error)}`
      )
      setFetchLoading(false)
    }
  }

  useEffect(() => {
    getAppSubscriptions()
  }, [])

  const handlePurchase = async purchase => {
    try {

      console.log('THIS IS PURCHASE ', purchase)
      await finishTransaction({
        purchase: purchase,
        isConsumable: true
      })
      const data = await appleTransaction(purchase)
      console.log(data)

      setPurchaseLoading(false)

      setTimeout(() => {
        Alert.alert('Sucess', 'You have successfully purchase the Item.', [
          {
            text: 'Okay',
            style: 'default',
            onPress: () => {
              Geolocation.getCurrentPosition(async position => {
                navigation.replace('Seller', {
                  myLat: position.coords.latitude,
                  myLong: position.coords.longitude
                })
              })
            }
          }
        ])
      }, 1500)
    } catch (error) {
      setPurchaseLoading(false)
      console.log(`ERROR WHILE HANDLING PURCHASE ${error}`)
    }
  }

  // useEffect to check the current purchase
  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        console.log('CURRENT PURCHASE FOUND ', currentPurchase)
        if (currentPurchase && isStoreConnected)
          await handlePurchase(currentPurchase)

        setPurchaseLoading(false)
      } catch (error) {
        setPurchaseLoading(false)
        console.log(`ERROR WHILE HANDLING PURCHASE ${error}`)
      }
    }
    checkCurrentPurchase()
  }, [currentPurchase, RNIap.finishTransaction, isStoreConnected])

  // useEffect to check current purchase error
  useEffect(() => {
    const checkCurrentPurchaseError = async () => {
      if (currentPurchase && isStoreConnected) {
        setPurchaseLoading(false)
        console.log(`CURRENT PURCHASE ERROR ${currentPurchase?.productId}`)
      } else setPurchaseLoading(false)
    }
    checkCurrentPurchaseError()
  }, [currentPurchaseError, isStoreConnected])

  // Effect to close IAP connection
  useEffect(() => {
    return () => {
      void RNIap.endConnection()
    }
  }, [])

  const purchaseIAP = async (sku, offerToken) => {
    try {
      setPurchaseLoading(true)
      await RNIap.requestSubscription({
        sku: sku,
        ...(offerToken && {
          subscriptionOffers: [{ sku: sku, offerToken }]
        })
      })
      setPurchaseLoading(false)
    } catch (error) {
      console.log(`ERROR WHILE PURCHASING IAP ${error}`)
      setPurchaseLoading(false)
    }
  }

  const reedemPromocodeIAP = async () => {
    try {
      setPurchaseLoading(true)

      await RNIap.presentCodeRedemptionSheetIOS()

      setPurchaseLoading(false)
    } catch (error) {
      console.log(`ERROR WHILE PROMOCODE ${error}`)
      setPurchaseLoading(false)
    }
  }

  return {
    isStoreConnected,
    appSubscriptions,
    fetchLoading,
    purchaseLoading,
    getAppSubscriptions,
    purchaseIAP,
    reedemPromocodeIAP
  }
}

export default useIAPStore
