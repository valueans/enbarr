import { FlatList, StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import COLORS from '../../../../utils/colors';
import { list } from '../../../../utils/data';

import MyAds from '../../../../components/ListItem/MyAds';
import { useFocusEffect } from '@react-navigation/native';
import { getMyHorses } from '../../../../APIs/api';
import { BarIndicator } from 'react-native-indicators';
import fonts from '../../../../utils/fonts';
global.pag = 2;
const MyHorses = props => {
  const [myHorses, setMyHorses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalHorseCount, setTotalHorseCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchHorses() {
        setLoading(true);
        const res = await getMyHorses(1);
        const horses=res.results
        setTotalHorseCount(res.count)
        // console.log(horses);
        setLoading(false);
        setMyHorses(horses);
      }
      pag = 2;
      fetchHorses();
    }, []),
  );

  const fetchHorseInAdsPage = async () => {
    setLoading(true);
    setTotalHorseCount(0)
    const res = await getMyHorses(1);
    const horses=res.results
    setTotalHorseCount(res.count)
    // console.log(horses);
    setLoading(false);
    setMyHorses(horses);
  };

  const loadMoreMyHorses = async () => {
    if(totalHorseCount===myHorses.length) return
    const res = await getMyHorses(pag);
    const data=res.results
    setMyHorses(p => [...p, ...data]);
    pag = pag + 1;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <BarIndicator color="black"></BarIndicator>
      ) : (
        <FlatList
          onEndReached={loadMoreMyHorses}
          onEndReachedThreshold={0.7}
          data={myHorses}
          keyExtractor={index => (index + 1 + Math.random() * 100).toString()}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
            paddingBottom: 130,
          }}
          renderItem={({ item, index }) => (
            <MyAds
              item={item}
              index={index}
              fetchHorseInAdsPage={fetchHorseInAdsPage}
              setMyHorses={setMyHorses}
              myHorses={myHorses}
              navigation={props.navigation}
            />
          )}
          ListFooterComponent={() => !!totalHorseCount && totalHorseCount>myHorses.length &&<ActivityIndicator  size="large" />}
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

export default MyHorses;

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
