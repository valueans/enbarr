import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

const AnimatedLoader = ({
    isLoading
}) => {

    const rotation = new Animated.Value(0);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        circle: {
            width: (35),
            height: (35),
            borderRadius: (30),
            borderWidth: (2),
            borderColor: '#c2c2c2',
            borderTopColor: '#4f5c8c',
            alignSelf: 'center',
            // borderStyle:'dotted'
        },
    });

    useEffect(() => {
        const animate = () => {
            console.log('start loader.....');
            Animated.loop(
                Animated.timing(rotation, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.linear,
                    useNativeDriver: true,
                })
            ).start();
        };
        animate();
    }, [isLoading]);

    const spin = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View
            style={[styles.circle, { transform: [{ rotate: spin }] }]}
        />
    );
};


export default AnimatedLoader;
