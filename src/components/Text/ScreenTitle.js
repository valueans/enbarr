import { StyleSheet, Text, View } from "react-native";
import React from "react";
import COLORS from "../../utils/colors";
import fonts from "../../utils/fonts";
const ScreenTitle = (props) => {
  const {
    children,
    style,
    size = 26,
    weight = "600",
    marginVertical = 12,
  } = props;
  return (
    <Text
      style={[
        styles.title,
        { fontSize: size, fontWeight: weight, marginVertical },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default ScreenTitle;

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontFamily: fonts.medium,
    fontWeight: "600",
    color: COLORS.color10,
  },
});
