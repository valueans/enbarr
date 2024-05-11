import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { globalStyle } from '../../utils/GlobalStyle';
import COLORS, { ColorShade } from '../../utils/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import fonts from '../../utils/fonts';
import backIcon from '../../assets/images/arrowLeft_white.png';
import { profile_img } from '../../utils/data';
import cameraIcon from '../../assets/images/camera_white.png';
import Input from '../../components/Input/Input';
import TextField from '../../components/Input/TextField';
import RoundBtn from '../../components/Button/RoundBtn';
import { getMyDetail, updateMyDetail } from '../../APIs/api';
import ImagePicker from 'react-native-image-crop-picker';
import Image from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarIndicator } from 'react-native-indicators';
import { userProfileUrl } from '../../Constants/urls';
import { setUserDetail } from '../../redux/userDetail';
import { useDispatch, useSelector } from 'react-redux';

const { width, height } = Dimensions.get('screen');

const DEFAULT_IMAGE = require('../../assets/images/user.png');

const MyProfile = ({ navigation }) => {
  // const [fullName, setFullName] = useState('');
  const { userDetail } = useSelector(state => state.userDetail)
  const userProfile=userDetail['user-profile']
  const [lastName, setLastName] = useState(userProfile?.last_name||'');
  const [firstName, setFirstName] = useState(userProfile?.first_name||'');
  const [email, setEmail] = useState();
  const [bio, setBio] = useState(userProfile?.bio||'');
  const [address, setAddress] = useState(userProfile?.address||'');
  const [city, setCity] = useState(userProfile?.city||'');
  const [zipCode, setZipCode] = useState(userProfile?.zipcode||'');
  const [state, setState] = useState(userProfile?.state||'');
  const [country, setCountry] = useState(userProfile?.country||'');
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const dispatch = useDispatch();
 
  const safeArea = useSafeAreaInsets();

  const sendDataToServer = async () => {
    const data = await updateMyDetail(
      firstName,
      lastName,
      bio,
      address,
      city,
      zipCode,
      state,
      country,
      10,
    );

    if (data) {
      let tempUserDetail={...userDetail}
      tempUserDetail['user-profile']=data
      dispatch(setUserDetail(tempUserDetail));
      Alert.alert('Updated Successfully.');
    } else {
      Alert.alert('Please try again.');
    }
  };

  const openPicker = async type => {
    await ImagePicker.openPicker({
      mediaType: type,
      width: 1200,
      height: 1200,
      forceJpg: true,
      includeBase64: true,
      cropping: true
    })
      .then(async file => {
        if (type == 'video') {

        } else {

          setIsUploading(true);
          //so lets upload profile image
          var url = userProfileUrl;
          var photo = {
            uri:
              Platform.OS === 'android' ? file.path
                : file.sourceURL.replace('file://', ''), // CameralRoll Url
            // uri: file.path,
            type: file.mime,
            name: Platform.OS === 'android' ? 'name.jpeg' : file.filename,
          };
          acc = await AsyncStorage.getItem('acc');

          var formData = new FormData();

          formData.append('profile_photo', photo);

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;


          xhr.upload.addEventListener('progress', event => {
           
          });
          xhr.addEventListener('load', event => {
            
            setIsUploading(false);
          });

          xhr.open('PUT', url);
          xhr.setRequestHeader('Authorization', `Token ${acc}`);
          xhr.send(formData);

          xhr.addEventListener('readystatechange', async e => {

            if (xhr.readyState === xhr.DONE) {
              res = JSON.parse(xhr.response);
              AsyncStorage.setItem('myProfilePicture', file.data);
             
              let tempUserDetail={...userDetail}
              tempUserDetail['user-profile']=res
              dispatch(setUserDetail(tempUserDetail));

              setIsUploading(false);
            } 
          });
        }
      })
      .catch(e => console.log(e));
  };
  return (
    <View style={[globalStyle.container, { backgroundColor: 'white' }]}>
      <StatusBar barStyle={'light-content'} />

      {isLoadingDetail ? (
        <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
      ) : (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <View style={[styles.row, { marginTop: safeArea.top }]}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => navigation.goBack()}>
                  <Image
                    source={backIcon}
                    style={styles.backIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <Text style={styles.title}>Profile</Text>
              </View>
            </View>

            <View style={styles.contentContainer}>
              <View style={[globalStyle.row, { justifyContent: 'center' }]}>
                <View style={styles.imgContainer}>
                  <View style={{ position: 'relative' }}>
                    <View style={styles.avatar}>
                      {userProfile?.profile_photo ? (
                        <>
                          <Image
                            source={{ uri: userProfile?.profile_photo }}
                            resizeMode="cover"
                            style={styles.avatarImg}
                            onLoad={() => setIsUploading(true)}
                            onLoadStart={() => setIsUploading(true)}
                            onLoadEnd={() => setIsUploading(false)}></Image>
                          {isUploading ? (
                            <BarIndicator
                              style={{
                                alignSelf: 'center',
                                justifyContent: 'center',
                                alignItems: 'center',
                                position: 'absolute',
                              }}
                              color={COLORS.color3}
                              size={22}></BarIndicator>
                          ) : null}
                        </>
                      ) : (
                        <Image
                          resizeMode="cover"
                          style={styles.avatarImg1}
                          source={DEFAULT_IMAGE}></Image>
                      )}
                    </View>
                    <TouchableOpacity
                      onPress={() => openPicker('photo')}
                      activeOpacity={0.4}
                      style={styles.cameraBtn}>
                      <Image
                        source={cameraIcon}
                        style={styles.btnIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View style={{ paddingTop: 0 }}>
                <Input
                  value={firstName}
                  title="First Name"
                  backgroundColor={COLORS.color11}
                  onChangeText={e => setFirstName(e)}
                />
                <Input
                  value={lastName}
                  title="Last Name"
                  backgroundColor={COLORS.color11}
                  onChangeText={e => setLastName(e)}
                />
                <Input
                  value={userProfile?.user?.email||''}
                  title="Email"
                  backgroundColor={COLORS.color11}
                  editable={false}
                />
                <TextField
                  value={bio}
                  title={'Bio'}
                  optional
                  backgroundColor={COLORS.color11}
                  onChangeText={e => setBio(e)}
                />
                <Input
                  value={address}
                  title="Address"
                  backgroundColor={COLORS.color11}
                  onChangeText={e => setAddress(e)}
                />
                <Input
                  value={city}
                  title="City"
                  backgroundColor={COLORS.color11}
                  onChangeText={e => setCity(e)}
                />
                <Input
                  value={zipCode}
                  title="Zip Code"
                  backgroundColor={COLORS.color11}
                  onChangeText={e => setZipCode(e)}
                />
                <Input
                  value={state}
                  title="State"
                  backgroundColor={COLORS.color11}
                  onChangeText={e => setState(e)}
                />
                <Input
                  value={country}
                  title="Country"
                  backgroundColor={COLORS.color11}
                  onChangeText={e => setCountry(e)}
                />
                <RoundBtn
                  onPress={sendDataToServer}
                  style={styles.editBtn}
                  color={COLORS.color10}>
                  Save
                </RoundBtn>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  header: {
    height: height * 0.3,
    backgroundColor: COLORS.color10,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    height: 50,
  },
  title: {
    color: COLORS.white,
    fontFamily: fonts.medium,
    fontWeight: '600',
    fontSize: 20,
  },
  backBtn: {
    position: 'absolute',
    left: 21,
  },
  backIcon: {
    width: 20,
  },
  contentContainer: {
    paddingHorizontal: 21,
    position: 'relative',
    flex: 1,
  },
  avatar: {
    ...globalStyle.shadowBtn,
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: COLORS.white,
    borderWidth: 2,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 0,
  },
  imgContainer: {
    position: 'relative',
    top: -60,
  },
  cameraBtn: {
    width: 42,
    height: 42,
    borderRadius: 30,
    borderColor: COLORS.white,
    borderWidth: 2,
    backgroundColor: COLORS.color10,
    position: 'absolute',
    bottom: -6,
    right: -6,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    elevation: 1,
  },
  btnIcon: {
    width: 20,
    height: 20,
  },
  editBtn: {
    ...globalStyle.btnType2,
    marginTop: 60,
    marginBottom: 60,
  },
  avatarImg: { width: 120, height: 120, borderRadius: 60 },
  avatarImg1: { width: 110, height: 110, borderRadius: 60 },
});
