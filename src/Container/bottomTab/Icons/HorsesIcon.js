import { StyleSheet, Image, View } from "react-native";
import React from "react";
import icon from "../../../assets/images/horse.png";

const HorsesIcon = (props) => {
  const { focused } = props;

  return (
    <View style={{ alignItems: "center" }}>
      <Image source={icon} style={styles.img} resizeMode="contain" />
      {focused ? <View style={styles.circle} /> : <View style={styles.view} />}
    </View>
  );
};

export default HorsesIcon;

const styles = StyleSheet.create({
  img: {
    width: 20,
    height: 20,
  },
  view: {
    marginTop: 12,
  },
  circle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "white",
    marginTop: 6,
  },
});
