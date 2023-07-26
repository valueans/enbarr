import { StyleSheet, Text, View } from "react-native";
import React from "react";
import fonts from "../../utils/fonts";
import COLORS from "../../utils/colors";

const Feature = ({ title, value, style = {} }) => {
  return (
    <View style={style}>
      <Text style={styles.key}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

export default Feature;

const styles = StyleSheet.create({
  key: {
    fontFamily: fonts.regular,
    fontSize: 8,
    color: COLORS.color10,
    fontWeight: "400",
    lineHeight: 12,
  },
  value: {
    fontFamily: fonts.medium,
    fontSize: 10,
    color: COLORS.color10,
    fontWeight: "600",
    lineHeight: 15,
  },
});
