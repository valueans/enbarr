import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";
import COLORS from "../../utils/colors";
import fonts from "../../utils/fonts";

const SpecialButton = (props) => {
  const {
    children = "Text",
    textColor = COLORS.white,
    width = 115,
    style,
    gradiantStyle,
    contentStyle,
    textStyle,
    backgroundColor = COLORS.color3,
    secondaryColor = COLORS.white,
    reverse = false,
    onPress = () => {},
    textAlign = "center",
  } = props;

  const textJustify = () => {
    if (textAlign == "center") {
      return {
        justifyContent: "center",
      };
    } else if (textAlign == "start") {
      return {
        justifyContent: "flex-start",
      };
    } else {
      return {
        justifyContent: "flex-end",
      };
    }
  };
  return (
    <TouchableOpacity activeOpacity={0.9} style={style} onPress={onPress}>
      <LinearGradient
        style={[styles.container, { width: width }, gradiantStyle]}
        start={{ x: 0, y: reverse ? 0 : 1 }}
        end={{ x: 0, y: reverse ? 1 : 0 }}
        colors={[backgroundColor, secondaryColor]}
      >
        <View
          style={[
            styles.content,
            { backgroundColor },
            textJustify(textAlign),
            contentStyle,
          ]}
        >
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {children}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SpecialButton;

const styles = StyleSheet.create({
  container: {
    padding: 1,
    overflow: "hidden",
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: 127,
    height: 60,
  },
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.color3,
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 15,
    fontFamily: fonts.regular,
    fontWeight: "500",
  },
});
