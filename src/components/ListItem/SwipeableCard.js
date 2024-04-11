import React from 'react'
import { Dimensions, Animated, PanResponder, StyleSheet } from 'react-native'
const SCREEN_WIDTH = Dimensions.get('window').width

export default SwipeableCard = ({
  item,
  swipedDirection,
  swipeStart,
  swipeEnd,
  onPress
}) => {
  let xPosition = new Animated.Value(1)
  let rotateCard = xPosition.interpolate({
    inputRange: [-500, 0, 500],
    outputRange: ['-20deg', '0deg', '20deg']
  })
  const animateCardPostion = SCREEN_WIDTH + 500
  let panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderTerminationRequest: () => true,
    onMoveShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant: () => {
      swipeStart()
    },
    onPanResponderMove: (evt, gestureState) => {
      xPosition.setValue(gestureState.dx)
    },

    onPanResponderRelease: (evt, gestureState) => {
      const minPosition = 50

      if (gestureState.dx <= minPosition && gestureState.dx >= -minPosition) {
        swipedDirection('')
        swipeEnd()
        Animated.spring(xPosition, {
          toValue: 0,
          speed: 5,
          bounciness: 10,
          useNativeDriver: false
        }).start()
      } else if (gestureState.dx > minPosition) {
        swipeEnd()
        Animated.timing(xPosition, {
          toValue: animateCardPostion,
          duration: 200,
          useNativeDriver: false
        }).start(({ finished }) => {
          if (finished) {
            Animated.timing(xPosition, {
              toValue: 0,
              duration: 0,
              useNativeDriver: false
            }).start(() => swipedDirection('Right'))
          }
        })
      } else if (gestureState.dx < minPosition) {
        swipeEnd()
        Animated.timing(xPosition, {
          toValue: -animateCardPostion,
          duration: 200,
          useNativeDriver: false
        }).start(({ finished }) => {
          if (finished) {
            Animated.timing(xPosition, {
              toValue: 1,
              duration: 0,
              useNativeDriver: false
            }).start(() => swipedDirection('Left'))
          }
        })
      }
    }
  })

  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={styles.absoluteContainer}
      />

      <Animated.View
        style={{
          opacity: xPosition.interpolate({
            inputRange: [-animateCardPostion, 0, animateCardPostion],
            outputRange: [0, 1, 0]
          }),
          transform: [{ translateX: xPosition }, { rotate: rotateCard }]
        }}
      >
        {item()}
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  absoluteContainer: {
    zIndex: 100,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '60%',
    height: '55%'
  }
})
