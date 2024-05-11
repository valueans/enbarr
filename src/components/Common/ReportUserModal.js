import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import Modal from 'react-native-modal';
import COLORS from '../../utils/colors';
import ScreenTitle from '../Text/ScreenTitle';
import Seprator from '../Layout/Seprator';
import close from '../../assets/images/close_solid.png';
import fonts from '../../utils/fonts';
import { reportHorse, reportUser } from '../../APIs/api';
const { width, height } = Dimensions.get('screen');

const ReportUserModal = ({ visible, navigation, setVisible, userID }) => {
  const [isOpen, setIsOpen] = useState(visible);
  const closeModal = () => {
    setVisible(false);
  };
  const message = [
    'Spam',
    // 'Pornography',
    // 'Self-harm',
    // 'Not for children',
    // 'Illegal activities (e.g. drug selling)',
    // 'Deceptive content',
    'Report ',
  ];

  const pressItem = async (item, index) => {
    console.log("data");
    const data = await reportUser(userID);
    closeModal();
    const res=data[0]
   
    if(res.code==200) alert(data[1]?.message)
    
   
    navigation.goBack()
  };

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setIsOpen(false)}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      animationInTiming={350}
      animationOutTiming={350}
      onDismiss={() => {
        // setVisible(false);
      }}
      style={{
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.container}>
        <ScreenTitle size={20} marginVertical={0}>
          Report
        </ScreenTitle>
        <ScreenTitle size={12} marginVertical={5} weight="500">
          Why are you reporting this?
        </ScreenTitle>
        <Seprator style={{ marginVertical: 10 }} />
        <TouchableOpacity style={styles.btn} onPress={closeModal}>
          <Image source={close} resizeMode="contain" />
        </TouchableOpacity>
        <View style={{ marginVertical: 10 }} />
        <View style={{ alignItems: 'flex-start', width: '100%' }}>
          {message.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.rowBtn}
              onPress={() => {
                pressItem(item, index);
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.circle} />
                <Text style={styles.text}>{item}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

export default ReportUserModal;

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: width * 0.9,
    height: height * 0.6,
    backgroundColor: COLORS.white,
    borderRadius: 30,
    alignItems: 'center',
    padding: 27,
    paddingTop: 40,
  },
  btn: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  circle: {
    width: 17,
    height: 17,
    borderRadius: 20,
    borderColor: COLORS.color10,
    borderWidth: 1,
    marginRight: 10,
  },
  rowBtn: {
    marginBottom: 16,
  },
  text: {
    fontFamily: fonts.medium,
    color: COLORS.color10,
    fontSize: 15,
  },
});
