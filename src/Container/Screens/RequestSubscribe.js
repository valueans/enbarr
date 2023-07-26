import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Background from "../../components/Layout/Background";
import COLORS, { ColorShade } from "../../utils/colors";
import danger from "../../assets/images/danger.png";
import fonts from "../../utils/fonts";
import RoundBtn from "../../components/Button/RoundBtn";
const RequestSubscribe = ({ navigation }) => {
  const goToSubscription = () => {
    navigation.navigate("Subscriptions");
  };
  return (
    <Background>
      <View style={styles.overlay}>
        <Image source={danger} style={styles.danger} resizeMode="contain" />
        <Text style={styles.text}>
          {"To become a seller in the app,\nplease subscribe "}
        </Text>
        <RoundBtn onPress={goToSubscription}>Subcribe</RoundBtn>
      </View>
    </Background>
  );
};

export default RequestSubscribe;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ColorShade("#f4f3f2", 60),
    paddingHorizontal: 21,
  },
  danger: {
    width: 63,
    marginBottom: 27,
  },
  text: {
    lineHeight: 20,
    fontSize: 16,
    color: COLORS.color10,
    fontFamily: fonts.medium,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
  },
});
