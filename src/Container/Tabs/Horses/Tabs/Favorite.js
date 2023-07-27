import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../../../utils/colors';
import {list} from '../../../../utils/data';
import MainItem from '../../../../components/ListItem/MainItem';
import {useFocusEffect} from '@react-navigation/native';
import {getFavHorses, getOrCreateNewChannel} from '../../../../APIs/api';
import {BarIndicator} from 'react-native-indicators';
import fonts from '../../../../utils/fonts';

global.pag = 2;
const Favorite = props => {
  const [favHorses, setFavHorses] = useState([]);
  const [loading, setLoading] = useState(false);

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
          renderItem={({item, index}) => (
            <MainItem
              item={item.horses}
              index={index}
              onPressDetails={() =>
                props.navigation.navigate('Details', {item: item.horses})
              }
              onPressMessage={() => goToChat(item)}
            />
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
