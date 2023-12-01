import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  // ScrollView,
  TextInput,
  Alert,
  // FlatList,
  TouchableOpacity,
  ActivityIndicator,
  PermissionsAndroid,
  Button,
  Linking,
} from 'react-native';
import {
  ScrollView,
  FlatList
} from 'react-native-gesture-handler';
import React, { useState, useEffect, useRef } from 'react';
import Background from '../../components/Layout/Background';
import HomeHeader from '../../components/Common/HomeHeader';
import { profile_img } from '../../assets/images/user.png';
import { globalStyle } from '../../utils/GlobalStyle';
import fonts from '../../utils/fonts';
import ScreenTitle from '../../components/Text/ScreenTitle';
import COLORS from '../../utils/colors';
import addIcon from '../../assets/images/add.png';
import deleteIcon from '../../assets/images/delete.png';

import arrowLeft from '../../assets/images/arrowLeft.png';
import DropDown from '../../components/Button/DropDown';
import Input from '../../components/Input/Input';
import RadioList from '../../components/Input/RadioList';
import TextField from '../../components/Input/TextField';
import TextButton from '../../components/Button/TextButton';
import MultipleInput from '../../components/Input/MultipleInput';
import RoundBtn from '../../components/Button/RoundBtn';
import Sheet from '../../components/Common/Sheet';
import ImagePicker from 'react-native-image-crop-picker';
import { createThumbnail } from 'react-native-create-thumbnail';
import { BottomSheetView, BottomSheetFlatList } from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { locations } from '../../utils/locations';
import Tabbar from '../bottomTab/Tabbar';
import { Country, State, City } from 'country-state-city';
import {
  getAllBreeds,
  getAllColors,
  getAllDisciplines,
  getAlltemperaments,
  uploadMedia,
  sendHorseToServer,
  getAllLocations,
  getMyDetail,
  getHorseDetails,
  updateHorse,
  getAllCurrencies,
} from '../../APIs/api';
import Geolocation from 'react-native-geolocation-service';
import CustomTab from '../../components/Layout/CustomTab';
import { DragSortableView } from 'react-native-drag-sort';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
const { width, height } = Dimensions.get('screen');

const Seller = props => {
  // console.log('props...', props.route.params);

  const mediaSheetRef = useRef(null);
  const locationSheetRef = useRef(null);
  const stateSheetRef = useRef(null);
  const citySheetRef = useRef(null);
  const breedSheetRef = useRef(null);
  const currencySheetRef = useRef(null);
  const disciplineSheetRef = useRef(null);
  const colorSheetRef = useRef(null);
  const temperamentSheetRef = useRef(null);
  const scrollViewRef = useRef(null);
  const [mediaList, setMediaList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [locations, setLocations] = useState([]);
  const [filterLocations, setFilterLocations] = useState([]);
  const [locationID, setLocationID] = useState(0);
  const [mediaListID, setMediaListID] = useState([]);
  const [videoCount, setVideoCount] = useState(0);
  const [render, setRender] = useState(false);
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [breed, setBreed] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [year, setYear] = useState('');
  const [height, setHeight] = useState('');
  const [price, setPrice] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [temperament, setTemperament] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [keyList, setKeyList] = useState([]);
  const [title, setTitle] = useState('');
  const [breedList, setBreedList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [heightList, setHeightList] = useState([]);
  const [disciploneList, setDisciploneList] = useState([]);
  const [temperamentList, setTemperamentList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addOtherLoading, setAddOtherLoading] = useState(false);
  const [uploadFeild, setUploadFeild] = useState(false);
  const [myImage, setMyImage] = useState('');
  const [dataGetLoading, setDataGetLoading] = useState(false);
  const { source, horseID } = props.route.params;
  const genderList = ['Gelding', 'Mare', 'Stallion'];

  const [stateitems, setStatesitems] = useState([]);
  const [filterStatesitems, setFilterStatesitems] = useState([]);
  const [citiesitems, setCitiesitems] = useState([]);
  const [filterCitiesitems, setFilterCitiesitems] = useState([]);

  const [cityy, setCityy] = useState('');
  const [statee, setStatee] = useState('');

  const [keywordIds, setKeywordIds] = useState([]);

  const [markerLat, setMarkerLat] = useState(props.route.params.myLat ?? 0);
  const [markerLng, setMarkerLng] = useState(props.route.params.myLong ?? 0);

  const openSheetToSelectMedia = () => {
    mediaSheetRef.current.snapToIndex(0);
  };
  useEffect(() => {
    getMyPic();
    getBreeds();
    getCurrencies()
    getColors();
    // getAllCountries();
    getDisciplines();
    getTemperaments();
    hasLocationPermission();
    if (source == 'edit') {
      getHorseDetail();
    }
    return () => {
      setMediaList([]);
    };
  }, []);

  useEffect(() => {
    if (mediaList.length) {
      updateItems(mediaList.length - 1, 'isUploading', false);
      updateItems(
        mediaList.length - 1,
        'id',
        mediaListID[mediaListID.length - 1],
      );
    }

    return () => { };
  }, [render]);

  useEffect(() => {
    if (location?.isoCode) {
      setStatesitems(State?.getStatesOfCountry(location.isoCode));
      setFilterStatesitems(State?.getStatesOfCountry(location.isoCode));
      setCitiesitems(City?.getCitiesOfCountry(location.isoCode));
      setFilterCitiesitems(City?.getCitiesOfCountry(location.isoCode));
    }
  }, [location]);

  useEffect(() => {
    if (uploadFeild) {
      Alert.alert('Try again', 'Can not upload file.');

      if (mediaList.length <= 1) {
        setMediaList([]);
      } else {
        const array = [...mediaList];
        array.splice(mediaList.length - 1, 1);
        setMediaList(array);
      }
    }
    return () => {
      setUploadFeild(false);
    };
  }, [uploadFeild]);

  useEffect(() => {
    let arr = [];
    keywords.map((item, id) => {
      arr.push(item.id);
    });
    setKeywordIds(arr);
  }, [keywords])

  const getAllCountries = async () => {
    // const data = await getAllLocations();
    // if (data[1].length > 0) {
    //   setLocations(data[1]);
    // } else {
    //   setLocations([]);
    // }

    const countries = Country.getAllCountries();
    setLocations(countries);
    setFilterLocations(countries);
  };

  const getMyPic = async () => {
    const myData = await getMyDetail();
    setMyImage(myData?.profile_photo);
    // const myBase64ProfileImage = await AsyncStorage.getItem('myProfilePicture');
    // setMyImage(myBase64ProfileImage);
  };

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('always');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('We need your location');
    }

    if (status === 'disabled') {
      Alert.alert('We need your location');
    }

    return false;
  };

  const hasLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
    }

    return false;
  };

  const getCurrencies = async () => {
    const data = await getAllCurrencies();
    // console.log({ data });
    setCurrencyList(data);
  };

  const getBreeds = async () => {
    const data = await getAllBreeds();
    setBreedList(data);
  };
  const getColors = async () => {
    const data = await getAllColors();

    setColorList(data);
  };
  const getDisciplines = async () => {
    const data = await getAllDisciplines();

    // console.log('getDisciplines', data);
    setDisciploneList(data);
  };
  const getTemperaments = async () => {
    const data = await getAlltemperaments();

    setTemperamentList(data);
  };
  let updateItems = (index, key, newval) => {
    let obj = Object.assign([], mediaList);
    obj[index][key] = newval;
    setMediaList(obj);
  };

  const openPicker = async type => {
    if (videoCount >= 3) {
      mediaSheetRef.current.close();
      Alert.alert('You can add only 3 videos.');
      return null;
    }
    if (mediaList.length >= 5) {
      mediaSheetRef.current.close();
      Alert.alert('Please delete a media to add another.');
      return null;
    }
    await ImagePicker.openPicker({
      mediaType: type,
      width: 1700,
      height: 1900,
      forceJpg: true,
      cropping: type === 'image' ? true : false
    })
      .then(async file => {
        mediaSheetRef.current.close();

        if (type == 'video') {
          createThumbnail({
            url: file.path,
            timeStamp: 10000,
          })
            .then(response => {
              setMediaList(prev => [
                ...prev,
                {
                  _id: mediaList.length,
                  filename: file.filename,
                  mime: file.mime,
                  width: file.width,
                  height: file.height,
                  path:
                    Platform.OS === 'android'
                      ? response.path
                      : response.path.replace('file://', ''),
                  file:
                    Platform.OS === 'android'
                      ? response.path
                      : response.path.replace('file://', ''),
                  duration: file.duration,
                  size: file.size,
                  isUploading: true,
                  id: 0,
                  file_type: 'VIDEO',
                },
              ]);
            })
            .catch(err => console.log({ err }));

          file.uri =
            Platform.OS === 'android'
              ? file.path
              : file.path.replace('file://', '');
          file.type = file.mime;
          file.name =
            Platform.OS === 'android' ? file.modificationDate : file.filename;
          setLoading(true);
          const data = await uploadMedia(file, file.uri);

          if (data[0].code == 201) {
            setMediaListID(prev => [...prev, data[1].id]);
            setLoading(false);

            setRender(x => !x);
            // updateItems(0, 'isUploading', false);
            setVideoCount(x => x + 1);
          } else if (data[0].code == '000') {
            setUploadFeild(x => !x);
            setLoading(false);
          }
        } else {
          setMediaList(prev => [
            ...prev,
            {
              _id: mediaList.length,
              filename: file.filename,
              mime: file.mime,
              width: file.width,
              height: file.height,
              path:
                Platform.OS === 'android'
                  ? file.path
                  : file.path.replace('file://', ''),
              file:
                Platform.OS === 'android'
                  ? file.path
                  : file.path.replace('file://', ''),

              duration: file.duration,
              size: file.size,
              isUploading: true,
              id: 0,
              file_type: 'IMAGE',
            },
          ]);

          console.log('sdfasdfasdf', file);
          file.uri =
            Platform.OS === 'android'
              ? file.path
              : file.path.replace('file://', '');
          file.type = file.mime;
          file.name =
            Platform.OS === 'android' ? file.modificationDate : file.filename;
          setLoading(true);
          const data = await uploadMedia(file, file.uri);
          console.log('upload', data);

          if (data[0].code == 201) {
            setMediaListID(prev => [...prev, data[1].id]);
            setLoading(false);

            setRender(x => !x);
            // updateItems(0, 'isUploading', false);
          } else if (data[0].code == '000') {
            setUploadFeild(x => !x);
            setLoading(false);
          }
        }
      })
      .catch(e => console.log(e));
  };
  const deleteMedia = index => {
    var listIndex = mediaList.findIndex(item => item.id == index);
    const isPic = mediaList[listIndex].file_type === 'IMAGE';
    if (!isPic) {
      setVideoCount(x => x - 1);
    }
    if (listIndex != -1) {

      var listId = mediaListID.filter(item => item != mediaList[listIndex].id);
      var list = mediaList.filter(item => item.id != index);

      console.log('THIS IS FOR API ', listId)
      console.log('THIS IS FOR LIST ', list)

      setMediaList(list);
      setMediaListID(listId);
    }
  };

  const sendDataToSerever = async () => {
    // console.log(markerLat, markerLng);
    // return;
    // if (markerLat == 37.78825 && markerLng == -122.4324) {
    //   Alert.alert('Error', 'Please select your location on the map');
    //   return;
    // }


    if (source == 'edit') {
      updateData(horseID);
      return;
    }


    if (mediaListID.length == 0) {
      Alert.alert('Please add some pictures/videos of your horse')
      return
    }
    if (!!!title) {
      Alert.alert('Please add name of your horse')
      return
    }
    if (!!!breed) {
      Alert.alert('Please add breed of your horse')
      return
    }
    if (!!!year) {
      Alert.alert('Please add year of birth')
      return
    }
    if (!!!height) {
      Alert.alert('Please add height of your horse')
      return
    }
    if (!!!currency) {
      Alert.alert('Please choose a currency to sell')
      return
    }
    if (!!!price) {
      Alert.alert('Please add a price of your horse')
      return
    }
    if (!!!discipline) {
      Alert.alert('Please choose a discipline')
      return
    }
    if (!!!gender) {
      Alert.alert('Please choose gender of your horse')
      return
    }
    if (!!!color) {
      Alert.alert('Please choose color of your horse')
      return
    }
    if (!!!temperament) {
      Alert.alert('Please choose temperament of your horse')
      return
    }
    if (!!!description) {
      Alert.alert('Please add some details about your horse')
      return
    }
    if (keywordIds.length == 0) {
      Alert.alert('Please add some keywords to better describe your horse')
      return
    }

    setLoading(true);
    const hasPermission = await hasLocationPermission();
    if (hasPermission) {
      Geolocation.getCurrentPosition(async position => {

        console.log('ooooo', markerLat, markerLng);
        const response = await sendHorseToServer(
          mediaListID,
          title,
          markerLat,
          markerLng,
          price.replace(',', ''),
          description,
          breed.id,
          gender,
          year,
          color.id,
          height,
          temperament.id,
          discipline.id,
          keywordIds,
          location?.isoCode,
          statee?.isoCode,
          cityy?.name,
          year,
          currency
        );
        console.log('save horse...', response);
        if (response[0].code == 201) {
          setLoading(false);
          Alert.alert('Successfully saved');
        } else {
          setLoading(false);
          Alert.alert(response[1].message);
        }
      });
    } else {
      const response = await sendHorseToServer(
        mediaListID,
        title,
        markerLat,
        markerLng,
        price.replace(',', ''),
        description,
        breed.id,
        gender,
        year,
        color.id,
        height,
        temperament.id,
        discipline.id,
        keywordIds,
        locationID,
        year,
        currency
      );
      if (response) {
        setLoading(false);
        Alert.alert('Successfully saved');
      } else {
        setLoading(false);

        Alert.alert('Please try again.');
      }
    }

  };

  const getHorseDetail = async () => {
    setDataGetLoading(true);
    const data = await getHorseDetails(horseID);
    console.log(`getHorseDetail ~ response`, data[1]?.lat, data[1]?.lng);
    if (data[1]?.lat && data[1]?.lng) {
      setMarkerLat(data[1].lat);
      setMarkerLng(data[1].lng);
    }

    setLocation({ name: data[1]?.country });
    setStatee({ name: data[1]?.state });
    setCityy({ name: data[1]?.city });

    setTitle(data[1]?.title);
    setPrice(data[1]?.price);
    setState(data[1]?.state);
    setBreed(data[1]?.breed);
    setColor(data[1]?.color);
    setTemperament(data[1]?.temperament);
    setDiscipline(data[1]?.discipline);
    setYear(data[1]?.year_of_birth);
    setHeight(data[1]?.height);
    setDescription(data[1]?.description);
    const genderIndex = genderList?.findIndex(item => item == data[1].gender);
    setSelectedIndex(genderIndex);
    setKeyList(data[1]?.keywords);
    setMediaList(data[1]?.images);

    var listID = [];
    data[1]?.images.map(item => {
      listID.push(item.id);
    });
    setMediaListID(listID);
    setGender(genderList[genderIndex]);
    setDataGetLoading(false);
  };

  const updateData = async horseID => {
    // console.log(`POINT(${markerLat} ${markerLng})`);
    setLoading(true);
    const body = {
      images_id: getMediaIdFromList(),
      title,
      country: location?.isoCode,
      state: statee?.isoCode,
      city: cityy?.name,
      price,
      description,
      breed_id: breed.id,
      gender,
      year_of_birth: year,
      color_id: color.id,
      height,
      temperament_id: temperament.id,
      discipline_id: discipline.id,
      keywords_id: getKeywordsIdFromList(),
      gender,
      user_location: `POINT(${markerLng} ${markerLat})`,
      currency: currency
    };

    const data = await updateHorse(horseID, body);

    setTimeout(() => {
      setLoading(false);
    }, 1500);
    if (data[0].code == 200) {
      props.navigation.goBack();
    } else {
    }
  };

  if (dataGetLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator animating={dataGetLoading} />
      </View>
    );
  }

  const getMediaIdFromList = () => {
    var list = [];
    mediaList.map((item, index) => {
      list.push(item.id);
    });

    return list;
  };
  const getKeywordsIdFromList = () => {
    var list = [];
    keywords.map((item, index) => {
      list.push(item.id);
      console.log(item);
    });
    console.log(list);
    return list;
  };

  const sendDataToServerAfterAddOtherPress = async () => {
    if (markerLat == 37.78825 && markerLng == -122.4324) {
      Alert.alert('Error', 'Please select your location on the map');
      return;
    }
    if (source == 'edit') {
      console.log('updating...');
      updateData(horseID);
      return;
    }

    arr = [];
    keywords.map((item, id) => {
      arr.push(item.id);
    });
    setKeywordIds(arr);

    // setLoading(true);
    setAddOtherLoading(true);
    const hasPermission = await hasLocationPermission();

    if (hasPermission) {
      Geolocation.getCurrentPosition(async position => {
        const response = await sendHorseToServer(
          mediaListID,
          title, // ok
          markerLat, // ok
          markerLng, // ok
          price, //ok
          description, //ok
          breed.id, //ok
          gender, //ok
          year, //ok
          color.id, //ok
          height, // ok
          temperament.id, //ok
          discipline.id, //ok
          keywordIds, //ok
          locationID,
          year,
        );

        if (response) {
          Alert.alert('Successfully saved');
        } else {
          Alert.alert('Please try again.');
        }
      });
    } else {
      const response = await sendHorseToServer(
        mediaListID,
        title, // ok
        markerLat, // ok
        markerLng, // ok
        price, //ok
        description, //ok
        breed.id, //ok
        gender, //ok
        year, //ok
        color.id, //ok
        height, // ok
        temperament.id, //ok
        discipline.id, //ok
        keyList, //ok
        locationID,
        year,
      );
      if (response) {
        Alert.alert('Successfully saved');
      } else {
        Alert.alert('Please try again.');
      }
    }
    setAddOtherLoading(false);
    // setLoading(false);
  };

  const addOtherPress = async () => {
    // await sendDataToServerAfterAddOtherPress();

    setMediaList([]);
    setSelectedIndex(null);
    setLocations([]);
    setLocationID(0);
    setMediaListID([]);
    setVideoCount(0);
    setRender(false);
    setLocation('');
    setCity('');
    setZipCode('');
    setState('');
    setBreed('');
    setYear('');
    setHeight('');
    setPrice('');
    setDiscipline('');
    setGender('');
    setColor('');
    setTemperament('');
    setDescription('');
    setKeywords([]);
    setKeyList([]);
    setTitle('');

    scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
  };

  const handleChangeCountry = e => {
    if (e == '') {
      setFilterLocations(locations);
    }
    console.log(e);
    arrr = [];
    arrr = locations.filter(item => item.name.includes(e));
    setFilterLocations(arrr);
  };

  const handleChangeState = e => {
    if (e == '') {
      setFilterStatesitems(stateitems);
    }
    console.log(e);
    arrr = [];
    arrr = stateitems.filter(item => item.name.includes(e));
    setFilterStatesitems(arrr);
  };

  const handleChangeCity = e => {
    if (e == '') {
      setFilterCitiesitems(citiesitems);
    }
    console.log(e);
    arrr = [];
    arrr = citiesitems.filter(item => item.name.includes(e));
    setFilterCitiesitems(arrr);
  };

  return (
    <Background>
      <SafeAreaView style={globalStyle.container}>
        <TouchableOpacity
          style={{ marginLeft: 15, marginBottom: 15 }}
          onPress={() => props.navigation.goBack()}>
          <Image source={arrowLeft} style={{ height: 20, width: 20 }} />
        </TouchableOpacity>

        <KeyboardAvoidingView
          style={{ flex: 1, marginBottom: 50 }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={10}>
          <View style={[globalStyle.innerContainer, { position: 'relative' }]}>
            <ScrollView
              ref={scrollViewRef}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}>
              <HomeHeader
                avatar={myImage}
                showLine3={false}
                navigation={props.navigation}
                isSeller={true}
              />

              <ScreenTitle size={15}>Add a horse</ScreenTitle>
              <Pressable onPress={openSheetToSelectMedia} disabled={loading}>
                <View style={styles.selection}>
                  <ScreenTitle size={15}>Upload image/video *</ScreenTitle>
                  <ScreenTitle size={10} marginVertical={0} weight="400">
                    First image/video-is the title picture
                  </ScreenTitle>
                  <View style={styles.iconContainer}>
                    <Image
                      source={addIcon}
                      resizeMode="contain"
                      style={styles.addIcon}
                    />
                  </View>
                  <ScreenTitle
                    marginVertical={0}
                    size={10}
                    weight={'400'}
                    style={{ marginBottom: 10 }}>
                    Upload up to 5 images/3 videos (max of 90 seconds)
                  </ScreenTitle>
                </View>
              </Pressable>
              <View style={styles.imgContainer}>
                <DragSortableView
                  dataSource={mediaList}
                  childrenHeight={72}
                  childrenWidth={72}
                  marginChildrenLeft={5}
                  marginChildrenRight={5}
                  marginChildrenBottom={5}
                  marginChildrenTop={5}
                  onDataChange={data => {
                    setMediaList(data);
                  }}
                  parentWidth={width - 24}
                  // style={{paddingHorizontal: 20}}
                  renderItem={(item, index) => {
                    return (
                      <View
                        style={styles.item}
                        key={index.toString() + '-file'}>
                        <Image
                          resizeMode="cover"
                          style={styles.itemImg}
                          source={{
                            // uri: source != 'edit' ? item?.path : item?.file,
                            uri: item.file,
                          }}
                        />
                        <Pressable
                          disabled={item?.isUploading}
                          style={styles.deleteBtn}
                          onPress={() => deleteMedia(item.id)}>
                          <Image source={deleteIcon} style={styles.btnIcon} />
                        </Pressable>
                        <ActivityIndicator
                          animating={item?.isUploading || false}
                          style={{ position: 'absolute' }}
                          color={COLORS.white}
                        />
                      </View>
                    );
                  }}
                />
              </View>
              <Input
                title="Horse Name *"
                onChangeText={x => setTitle(x)}
                value={title}
              />

              <DropDown
                title="Breed *"
                value={breed.breed}
                onPress={() => breedSheetRef.current.snapToIndex(0)}
              />
              <Input
                title="Year of birth *"
                onChangeText={x => setYear(x)}
                value={year.toString()}
              />
              <Input
                title="Height (hands) *"
                value={height.toString()}
                onChangeText={e => setHeight(e)}
              />

              <View style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>

                <DropDown
                  title="Currency *"
                  value={currency}
                  onPress={() => currencySheetRef.current.snapToIndex(0)}
                  style={{
                    width: '23%'
                  }}
                />
                <Input
                  title="Price *"
                  onChangeText={x => setPrice(x.replace(',', ''))}
                  value={price.toString()}
                  style={{
                    width: '75%'
                  }}
                />
              </View>

              <DropDown
                title="Discipline *"
                value={discipline.discipline}
                onPress={() => disciplineSheetRef.current.snapToIndex(0)}
              />
              <RadioList
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                title={'Gender *'}
                list={genderList}
                direction={'row'}
                onChange={data => {
                  setGender(data);
                }}
              />
              <DropDown
                title="Color *"
                value={color.color}
                onPress={() => colorSheetRef.current.snapToIndex(0)}
              />
              <DropDown
                title="Temperament *"
                onChangeText={e => setTemperament(e)}
                value={temperament.temperament}
                onPress={() => temperamentSheetRef.current.snapToIndex(0)}
              />
              <TextField
                title="Describe your Horse *"
                onChangeText={e => setDescription(e)}
                value={description}
              />
              <MultipleInput
                title="Input keyword *"
                onChange={list => {
                  setKeywords(list);
                }}
                list={keyList}></MultipleInput>

              {/* <DropDown
                title="Location *"
                style={{marginVertical: 0}}
                value={location?.name}
                onPress={() => {
                  getAllCountries();
                  locationSheetRef.current.snapToIndex(0);
                }}
              /> */}
              <View style={{ paddingLeft: 10 }}>
                {/* <View style={[styles.row, {marginTop: 10}]}>
                  <View style={[styles.line, {height: 50}]}></View>
                  <Text style={styles.label}>City</Text> */}

                {/* <DropDown
                    // title="Location *"
                    style={{
                      marginVertical: 0,
                      width: '75%',
                      height: 50,
                      flex: 1,
                      justifyContent: 'center',
                      marginBottom: 30,
                    }}
                    // style={styles.input}
                    value={cityy?.name}
                    onPress={() => {
                      if (location?.isoCode) {
                        setCitiesitems(
                          City?.getCitiesOfCountry(location.isoCode),
                        );
                        setFilterCitiesitems(
                          City?.getCitiesOfCountry(location.isoCode),
                        );
                      } else {
                        setCitiesitems(City?.getAllCities());
                        setFilterCitiesitems(City?.getAllCities());
                      }
                      citySheetRef.current.snapToIndex(0);
                    }}
                  /> */}

                {/* <TextInput
                    style={styles.input}
                    onChangeText={e => setCity(e)}
                    value={city}></TextInput> */}
                {/* </View> */}
                {/* <View style={[styles.row, {marginTop: 30}]}>
                  <View style={[styles.line, {marginTop: -85}]}></View>
                  <Text style={styles.label}>Zip</Text>

                  <TextInput
                    style={styles.input}
                    onChangeText={e => setZipCode(e)}
                    value={zipCode}></TextInput>
                </View> */}
                {/* <View style={[styles.row, {marginTop: 0, marginBottom: 15}]}>
                  <View
                    style={[
                      styles.line,
                      {marginTop: -118, height: 120},
                    ]}></View>
                  <Text style={styles.label}>State</Text> */}

                {/* <TextInput
                    style={styles.input}
                    onChangeText={e => setState(e)}
                    value={state}></TextInput> */}

                {/* <DropDown
                    // title="Location *"
                    style={{
                      marginVertical: 0,
                      width: '75%',
                      height: 50,
                      flex: 1,
                      justifyContent: 'center',
                      marginBottom: 30,
                    }}
                    value={statee?.name}
                    onPress={() => {
                      if (location?.isoCode) {
                        setStatesitems(
                          State?.getStatesOfCountry(location.isoCode),
                        );
                        setFilterStatesitems(
                          State?.getStatesOfCountry(location.isoCode),
                        );
                      } else {
                        setStatesitems(State?.getAllStates());
                        setFilterStatesitems(State?.getAllStates());
                      }
                      stateSheetRef.current.snapToIndex(0);
                    }}
                  /> */}
                {/* </View> */}
              </View>

              <Text
                style={{
                  fontSize: 12,
                  fontFamily: fonts.medium,
                  fontWeight: '600',
                  color: COLORS.color10,
                }}>
                Select your location *
              </Text>

              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <MapView
                  // provider={PROVIDER_GOOGLE}
                  followsUserLocation={true}
                  userLocationCalloutEnabled={true}
                  showsMyLocationButton={true}
                  // onPress={e => {
                  //   setFromEditLat(e.nativeEvent.coordinate.latitude);
                  //   setFromEditLng(e.nativeEvent.coordinate.longitude);
                  //   setMarkerLat(e.nativeEvent.coordinate.latitude);
                  //   setMarkerLng(e.nativeEvent.coordinate.longitude);
                  // }}
                  style={{
                    marginTop: 20,
                    borderRadius: 20,
                    height: 320,
                    width: '97%',
                    alignSelf: 'center',
                  }}
                  // onRegionChange={(data) => {
                  //   // console.log({ onRegionChange: data });
                  //   setMarkerLat(data.latitude)
                  //   setMarkerLng(data.longitude)
                  // }}
                  initialRegion={{
                    latitude: markerLat ?? 37.78825,
                    longitude: markerLng ?? -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}>
                  <Marker
                    draggable={true}
                    coordinate={{
                      latitude: markerLat,
                      longitude: markerLng,
                    }}
                    onDragEnd={e => {
                      setMarkerLat(e.nativeEvent.coordinate.latitude);
                      setMarkerLng(e.nativeEvent.coordinate.longitude);
                    }}
                  />
                </MapView>
              </View>

              {source != 'edit' && (
                <>
                  <RoundBtn
                    loading={addOtherLoading}
                    onPress={addOtherPress}
                    style={{
                      marginTop: 21,
                      backgroundColor: COLORS.color15,
                      borderWidth: 1,
                      borderColor: COLORS.color16,
                    }}
                    color={COLORS.color10}>
                    Add other
                  </RoundBtn>
                  <Text style={styles.description}>
                    Available for premium users (up to 10 horses)
                  </Text>
                </>
              )}

              <RoundBtn
                style={{ marginTop: 21 }}
                onPress={sendDataToSerever}
                disabled={loading ? true : false}
                loading={loading}>
                {source == 'edit' ? 'Save' : 'Create'}
              </RoundBtn>

            </ScrollView>
          </View>
        </KeyboardAvoidingView>
        <CustomTab navigation={props.navigation} />
      </SafeAreaView>


      <Sheet ref={mediaSheetRef} index={-1} pressBehavior={'close'}>
        <View style={{ alignItems: 'center', paddingBottom: 32, paddingTop: 18 }}>
          <ScreenTitle size={18}>Choose Media</ScreenTitle>

          <TextButton onPress={() => openPicker('photo')}>Image</TextButton>
          <TextButton onPress={() => openPicker('video')}>Video</TextButton>
        </View>
      </Sheet>
      {/* location */}
      <Sheet ref={locationSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            height: '95%',
          }}>
          <ScreenTitle size={18}>Select country</ScreenTitle>
          <TextInput
            onChangeText={e => handleChangeCountry(e)}
            placeholder="search your country"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              width: '80%',
              fontSize: 18,
            }}></TextInput>
          <BottomSheetView style={styles.listContainer}>
            <FlatList
              data={filterLocations}
              extraData={filterLocations}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => {
                      setLocation(item);
                      // setLocationID(item.id);
                      locationSheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem, { textAlign: 'left' }]}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </Sheet>

      {/* state */}

      <Sheet ref={stateSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            height: '95%',
          }}>
          <ScreenTitle size={18}>Select state</ScreenTitle>
          <TextInput
            onChangeText={e => handleChangeState(e)}
            placeholder="search your state"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              width: '80%',
              fontSize: 18,
            }}></TextInput>
          <BottomSheetView style={styles.listContainer}>
            <FlatList
              data={filterStatesitems}
              extraData={filterStatesitems}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => {
                      setStatee(item);
                      // setLocation(item);
                      // setLocationID(item.id);
                      stateSheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem, { textAlign: 'left' }]}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </Sheet>

      {/* city */}

      <Sheet ref={citySheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            height: '95%',
          }}>
          <ScreenTitle size={18}>Select city</ScreenTitle>

          <TextInput
            onChangeText={e => handleChangeCity(e)}
            placeholder="search your state"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 10,
              width: '80%',
              fontSize: 18,
            }}></TextInput>
          <BottomSheetView style={styles.listContainer}>
            <FlatList
              data={filterCitiesitems}
              extraData={filterCitiesitems}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => {
                      setCityy(item);
                      // setLocation(item);
                      // setLocationID(item.id);
                      citySheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem, { textAlign: 'left' }]}>
                      {item?.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </Sheet>
      {/* breeds */}

      <Sheet ref={breedSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            // height: '95%',
          }}>
          <ScreenTitle size={18}>Select breed</ScreenTitle>
          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>
            <FlatList
              data={breedList}
              extraData={breedList}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => {
                      setBreed(item);

                      breedSheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem]}>{item.breed}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </Sheet>

      {/* Currency */}

      <Sheet ref={currencySheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            // height: '95%',
          }}>
          <ScreenTitle size={18}>Select Currency</ScreenTitle>

          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>
            <FlatList
              data={currencyList}
              extraData={currencyList}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => {
                      setCurrency(item);
                      currencySheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem]}>{item}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </Sheet>

      {/* discipline */}
      <Sheet ref={disciplineSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            height: Platform.OS == 'android' ? 600 : 600,
          }}>
          <ScreenTitle size={18}>Select discipline</ScreenTitle>
          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>
            <FlatList
              data={disciploneList}
              extraData={disciploneList}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.listItem, { marginBottom: 5 }]}
                    onPress={() => {
                      setDiscipline(item);
                      disciplineSheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem]}>{item.discipline}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </Sheet>
      {/* color */}
      <Sheet ref={colorSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            // height: height * 0.8,
            height: Platform.OS == 'android' ? 600 : 600,
          }}>
          <ScreenTitle size={18}>Select color</ScreenTitle>
          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>
            <FlatList
              data={colorList}
              extraData={colorList}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => {
                      setColor(item);
                      colorSheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem]}>{item.color}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </Sheet>
      {/* temperament */}
      <Sheet ref={temperamentSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            // height: height * 0.8,
            height: Platform.OS == 'android' ? 600 : 600,
          }}>
          <ScreenTitle size={18}>Select temperament</ScreenTitle>
          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>
            <FlatList
              data={temperamentList}
              extraData={temperamentList}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => {
                      setTemperament(item);
                      temperamentSheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem]}>{item.temperament}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </BottomSheetView>
        </BottomSheetView>
      </Sheet>
    </Background>
  );
};

export default Seller;

const styles = StyleSheet.create({
  selection: {
    width: '100%',
    height: height * 0.25,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.color17,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addIcon: {
    width: 30,
    height: 30,
  },
  iconContainer: {
    width: 73,
    height: 73,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.color17,
    marginVertical: 12,
  },
  imgContainer: {
    paddingTop: 21,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  item: {
    width: 72,
    height: 72,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.color17,
    marginRight: 16,
    borderStyle: 'dashed',
    position: 'relative',
    marginBottom: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemImg: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  deleteBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.color10,
    position: 'absolute',
    top: -13,
    right: -13,
  },
  btnIcon: {
    width: 15,
    height: 15,
  },
  line: {
    width: 20,
    height: 95,
    borderLeftColor: COLORS.color10,
    borderBottomLeftRadius: 15,
    borderBottomColor: COLORS.color10,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    marginTop: -45,
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 12,
    color: COLORS.color10,
    fontFamily: fonts.medium,
    // marginRight: 20,
    fontWeight: '600',
    width: 45,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: COLORS.white,
    borderRadius: 15,
    // marginTop: 25,
    flex: 1,
    paddingHorizontal: 16,
  },
  description: {
    fontFamily: fonts.light,
    fontSize: 12,
    fontWeight: '400',
    marginTop: 8,
    color: COLORS.color10,
    marginBottom: 20,
  },
  listItem: {
    marginBottom: 18,
    width: '100%',
    paddingHorizontal: 21,
  },
  textItem: {
    fontFamily: fonts.medium,
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.color10,
  },
  listContainer: { flex: 1, height: 600, width },
});
