import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../../../../utils/colors';
import { list } from '../../../../utils/data';
import MainItem from '../../../../components/ListItem/MainItem';
import { useFocusEffect } from '@react-navigation/native';
import { getFavHorses, getOrCreateNewChannel } from '../../../../APIs/api';
import { BarIndicator } from 'react-native-indicators';
import fonts from '../../../../utils/fonts';
import { useSelector } from 'react-redux';
import PubNub from 'pubnub';
import * as PubNubKeys from '../../Chat/PubNubKeys';

global.pag = 2;
const Favorite = props => {
  const [favHorses, setFavHorses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { userDetail } = useSelector(state => state.userDetail);

  const pubnub = new PubNub({
    subscribeKey: PubNubKeys.PUBNUB_SUBSCRIBE_KEY,
    publishKey: PubNubKeys.PUBNUB_PUBLISH_KEY,
    userId: `${userDetail?.user?.email}`,
    // uuid: `${myDetail?.user?.email}`,
  });

  useFocusEffect(
    React.useCallback(() => {
      async function fetchHorses() {
        setLoading(true);
        const horses = await getFavHorses(1);
        console.log('wwwww', horses);
        setLoading(false);
        setFavHorses(horses);
      }
      pag = 2;

      fetchHorses();
    }, []),
  );

  const loadMoreFav = async () => {
    const horses = await getFavHorses(pag);
    pag = pag + 1;
    setFavHorses(p => [...p, ...horses]);
  };

  const goToChat = async item => {
    // console.log(item.horses.userprofile.user.id);
    const data = await getOrCreateNewChannel(item.horses.userprofile.user.id);
    if (data.data) {
      props.navigation.navigate('Chat', {
        item: data.data,
        myDetail: data.data.user_one_profile,
        pubnub: pubnub,
      });
    } else {
      Alert.alert('Error', 'Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <BarIndicator color="black"></BarIndicator>
      ) : (
        <FlatList
          onEndReached={loadMoreFav}
          onEndReachedThreshold={0.9}
          data={favHorses}
          extraData={favHorses}
          keyExtractor={index => (index + 1 + Math.random() * 100).toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 130,
          }}
          renderItem={({ item, index }) => (
            <>{
              console.log(userDetail.user.id, item)
            }
              <MainItem
                item={item.horses}
                index={index}
                onPressDetails={() =>
                  props.navigation.navigate('Details', { item: item.horses, pubnub: pubnub, myhorse: userDetail.user.id === item.userprofile.id ? true : false })
                }
                onPressMessage={() => goToChat(item)}
                myhorse={userDetail.user.id === item.horses.userprofile.id ? true : false}
              /></>
          )}
          ListEmptyComponent={() => (
            <View style={styles.nothingWrapper}>
              <Text style={styles.nothingText}>There is nothing to show</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  nothingText: {
    fontFamily: fonts.regular,
    fontWeight: '400',
    color: COLORS.color17,
  },
  nothingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
  },
});
