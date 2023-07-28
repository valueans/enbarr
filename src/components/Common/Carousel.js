// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import React, {useState, useRef} from 'react';
// import COLORS from '../../utils/colors';
// import Video from 'react-native-video';
// import playIcon from '../../assets/images/play.png';
// const {width, height} = Dimensions.get('screen');

// const Carousel = ({items, children}) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [play, setPlay] = useState(false);
//   const videoRef = useRef(null);

//   const renderItem = ({item, index}) => {
//     const isVideo = item.file_type === 'VIDEO';
//     return (
//       <View key={'img ' + index.toString()} style={styles.container}>
//         {isVideo ? (
//           <View style={{width: '100%', height: '100%'}}>
//             <Video
//               // playInBackground={false}
//               // onLoad={setPlay(false)}
//               muted={true}
//               ref={videoRef}
//               source={{uri: item.file}}
//               paused={!play}
//               repeat={true}
//               style={{flex: 1, width: '100%', height: '100%'}}
//               poster={item.file}
//               resizeMode={'cover'}
//               posterResizeMode={'cover'}
//               fullscreen={play}
//               onFullscreenPlayerDidDismiss={() => {
//                 console.log('exit');

//                 videoRef.current.seek(0);
//                 setPlay(!play);
//               }}
//               onFullscreenPlayerDidPresent={() => {
//                 // videoRef.showVideoPlayer();

//                 console.log('sadfasdfasdfENTER');
//                 setPlay(play);
//               }}
//               onFullscreenPlayerWillDismiss={() => {
//                 console.log('sadfasdfasdfENTERR');
//                 setPlay(play);
//               }}
//             />
//             <View
//               style={{
//                 ...StyleSheet.absoluteFillObject,
//                 backgroundColor: 'rgba(0,0,0,0.5)',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//               <TouchableOpacity
//                 style={styles.playBtn}
//                 onPress={() => setPlay(!play)}>
//                 <Image
//                   source={playIcon}
//                   resizeMode="contain"
//                   style={{width: '100%', height: '100%'}}
//                 />
//               </TouchableOpacity>
//             </View>
//           </View>
//         ) : (
//           <Image
//             source={{uri: item.file}}
//             resizeMode="cover"
//             style={styles.img}
//           />
//         )}
//       </View>
//     );
//   };
//   return (
//     <View style={{flex: 1, position: 'relative'}}>
//       <FlatList
//         key={item => item}
//         data={items}
//         extraData={items}
//         horizontal={true}
//         keyExtractor={(item, i) => i}
//         pagingEnabled={true}
//         renderItem={renderItem}
//         onMomentumScrollEnd={event => {
//           const index = Math.floor(
//             event.nativeEvent.contentOffset.x /
//               event.nativeEvent.layoutMeasurement.width,
//           );
//           // work with: index

//           setSelectedIndex(index);
//         }}
//       />
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'center',
//           position: 'absolute',
//           width,
//           left: 0,
//           bottom: 60,
//         }}>
//         {items.length > 1 &&
//           items.map((_, index) => {
//             return (
//               <View
//                 style={[
//                   styles.circle,
//                   {opacity: selectedIndex == index ? 1 : 0.3},
//                 ]}
//               />
//             );
//           })}
//       </View>
//       {children}
//     </View>
//   );
// };

// export default Carousel;

// const styles = StyleSheet.create({
//   img: {
//     width,
//     height: '100%',
//   },
//   container: {
//     flex: 1,
//     width,
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   circle: {
//     width: 10,
//     height: 10,
//     borderRadius: 10,
//     backgroundColor: COLORS.white,
//     marginVertical: 12,
//     marginHorizontal: 3,
//   },
//   playBtn: {
//     width: 70,
//     height: 70,
//     // elevation: 5,
//     // shadowColor: COLORS.black,
//     // shadowRadius: 5,
//     // shadowOpacity: 0.2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState, useRef } from 'react';
import COLORS from '../../utils/colors';
import Video from 'react-native-video';
import playIcon from '../../assets/images/play.png';
import VideoModal from './VideoModal';
const { width, height } = Dimensions.get('screen');

const Carousel = ({ items, children }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [play, setPlay] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedVideoItem, setSelectedVideoItem] = useState({});
  const videoRef = useRef(null);

  const renderItem = ({ item, index }) => {
    const isVideo = item.file_type === 'VIDEO';

    return (
      <View key={index} style={styles.container}>
        {isVideo ? (
          <View style={{ width: '100%', height: '100%' }}>
            <Video
              ref={videoRef}
              source={{ uri: item.file }}
              paused={true}
              repeat={true}
              style={{ width: '100%', height: '100%' }}
              poster={item.file}
              resizeMode={'cover'}
              posterResizeMode={'cover'}
            // fullscreen={play}
            // onFullscreenPlayerDidPresent={() => {
            //   setPlay(true);
            // }}
            // onFullscreenPlayerDidDismiss={() => {
            //   console.log('exit');
            //   setPlay(false);
            //   videoRef.current.seek(0);
            // }}
            // onFullscreenPlayerWillDismiss={() => {
            //   setPlay(false);
            // }}
            />
            <View
              style={{
                ...StyleSheet.absoluteFillObject,
                backgroundColor: 'rgba(0,0,0,0.5)',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.playBtn}
                onPress={() => openVideoModal(item)}>
                <Image
                  source={playIcon}
                  resizeMode="contain"
                  style={{ width: '100%', height: '100%' }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <Image
            source={{ uri: item.file }}
            resizeMode="cover"
            style={styles.img}
          />
        )}
      </View>
    );
  };
  const openVideoModal = item => {
    console.log(item);
    setIsModalVisible(true);
    setSelectedVideoItem(item);
  };
  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <FlatList
        key={item => item}
        data={items}
        extraData={items}
        horizontal={true}
        keyExtractor={(item, i) => i}
        pagingEnabled={true}
        renderItem={renderItem}
        onMomentumScrollEnd={event => {
          const index = Math.floor(
            event.nativeEvent.contentOffset.x /
            event.nativeEvent.layoutMeasurement.width,
          );
          // work with: index

          setSelectedIndex(index);
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          width,
          left: 0,
          bottom: 60,
        }}>
        {items.length > 1 &&
          items.map((_, index) => {
            return (
              <View
                style={[
                  styles.circle,
                  { opacity: selectedIndex == index ? 1 : 0.3 },
                ]}
              />
            );
          })}
      </View>
      {children}
      <VideoModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        item={selectedVideoItem}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  img: {
    width,
    height: '100%',
  },
  container: {
    flex: 1,
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 12,
    marginHorizontal: 3,
  },
  playBtn: {
    width: 70,
    height: 70,
    // elevation: 5,
    // shadowColor: COLORS.black,
    // shadowRadius: 5,
    // shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
