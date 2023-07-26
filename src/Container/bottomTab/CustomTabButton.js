import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../../utils/colors";

const CustomTabButton = (props) => {
  const { descriptors, state, navigation, isFocused } = props;

  //   const { options } = descriptors[route.key];
  //   const label =
  //     options.tabBarLabel !== undefined
  //       ? options.tabBarLabel
  //       : options.title !== undefined
  //       ? options.title
  //       : route.name;

  //   const isFocused = state.index === index;

  const onPress = () => {
    // const event = navigation.emit({
    //   type: "tabPress",
    //   target: route.key,
    //   canPreventDefault: true,
    // });
    // if (!isFocused && !event.defaultPrevented) {
    //   // The `merge: true` option makes sure that the params inside the tab screen are preserved
    //   navigation.navigate({ name: route.name, merge: true });
    // }
  };

  const onLongPress = () => {
    // navigation.emit({
    //   type: "tabLongPress",
    //   target: route.key,
    // });
  };
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={{ flex: 1 }}
    >
      <View
        style={[styles.circle, { display: isFocused ? "flex" : "none" }]}
      ></View>
    </TouchableOpacity>
  );
};

export default CustomTabButton;

const styles = StyleSheet.create({
  circle: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.white,
  },
});
