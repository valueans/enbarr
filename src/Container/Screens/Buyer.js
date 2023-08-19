import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  // ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  // FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {
  ScrollView,
  FlatList
} from 'react-native-gesture-handler';
import React, { useState, useRef, useEffect } from 'react';
import Background from '../../components/Layout/Background';
import HomeHeader from '../../components/Common/HomeHeader';
import { profile_img } from '../../utils/data';
import { globalStyle } from '../../utils/GlobalStyle';
import ScreenTitle from '../../components/Text/ScreenTitle';
import DropDown from '../../components/Button/DropDown';
import RangeInput from '../../components/Input/RangeInput';
import RadioListBuyer from '../../components/Input/RadioListBuyer';
import MultipleInput from '../../components/Input/MultipleInput';
import RoundBtn from '../../components/Button/RoundBtn';

import editIcon from '../../assets/images/edit.png';

import COLORS from '../../utils/colors';
import CustomTab from '../../components/Layout/CustomTab';
import {
  getAllBreeds,
  getAllColors,
  getAllDisciplines,
  getAlltemperaments,
  getAllLocations,
  userSaveSearchBuyer,
  getSavedSearchDetal,
  resultUserSearchBuyer,
  getMyDetail,
  getAllHorseLatandLong,
} from '../../APIs/api';
import fonts from '../../utils/fonts';
import { BarIndicator } from 'react-native-indicators';
import Sheet from '../../components/Common/Sheet';
import TextButton from '../../components/Button/TextButton';
import { BottomSheetFlatList, BottomSheetView } from '@gorhom/bottom-sheet';
const { width, height } = Dimensions.get('screen');
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Country, State, City } from 'country-state-city';

global.firstTime = true;

const Buyer = props => {
  // console.log('qwertyu', props.route.params);
  const mediaSheetRef = useRef(null);
  const locationSheetRef = useRef(null);
  const breedSheetRef = useRef(null);
  const disciplineSheetRef = useRef(null);
  const colorSheetRef = useRef(null);
  const temperamentSheetRef = useRef(null);
  const genderSheetRef = useRef();
  const keywordsSheetRef = useRef();
  const stateSheetRef = useRef(null);
  const citySheetRef = useRef(null);
  const radiusSheetRef = useRef(null);

  const [mediaList, setMediaList] = useState([]);
  const [mediaListID, setMediaListID] = useState([]);
  const [render, setRender] = useState(false);
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [breed, setBreed] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [temperament, setTemperament] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [title, setTitle] = useState('');

  const [colorList, setColorList] = useState([]);
  const [breedList, setBreedList] = useState([]);
  const [disciplineList, setDisciplineList] = useState([]);
  const [temperamentList, setTemperamentList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterLocations, setFilterLocations] = useState([]);
  const [locationID, setLocationID] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [loading, setLoading] = useState(false);
  const [myImage, setMyImage] = useState('');

  const [stateitems, setStatesitems] = useState([]);
  const [filterStatesitems, setFilterStatesitems] = useState([]);

  const [citiesitems, setCitiesitems] = useState([]);
  const [filterCitiesitems, setFilterCitiesitems] = useState([]);

  const [cityy, setCityy] = useState('');
  const [statee, setStatee] = useState('');

  const [initialize, setInitialize] = useState(false);

  const [radius, setRadius] = useState(null);
  const [radiusOptions, setRadiusOptions] = useState([
    { value: 20 },
    { value: 50 },
    { value: 100 },
    { value: 150 },
    { value: 200 },
    { value: 250 },
    { value: 300 },
  ]);

  useEffect(() => {

    // getAllCountries();
    // getColors();
    // getBreeds();
    // getDisciplines();
    // getTemperaments();
    // console.log('qwer', props.route.params.pubnub);
    getInitialSerachDetail();
    // getAllHorseLatituteandLongitute();


    return () => {
      setColorList([]);
      setBreedList([]);
      setDisciplineList([]);
      setTemperamentList([]);
    };
  }, []);

  useEffect(() => {
    // console.log(City.getCitiesOfCountry('location.isoCode'));
    // console.log(State.getStatesOfCountry('location.isoCode'));

    setStatesitems(State?.getStatesOfCountry(location.isoCode));
    setFilterStatesitems(State?.getStatesOfCountry(location.isoCode));
    // setCitiesitems(City?.getCitiesOfCountry(location.isoCode));
  }, [location]);

  const getInitialSerachDetail = async () => {

    // const INITIAL_REGION = {
    //   latitude: 52.5,
    //   longitude: 19.2,
    //   latitudeDelta: 8.5,
    //   longitudeDelta: 8.5,
    // };
    setLoading(true);

    const myData = await getMyDetail();
    setMyImage(myData?.profile_photo);

    // const myBase64ProfileImage = await AsyncStorage.getItem('myProfilePicture');
    // setMyImage(myBase64ProfileImage);

    const data = await getSavedSearchDetal();
    if (data[1]?.length !== 0 && data.length !== 0) {
      console.log('qqqqqq', data[1][0]);
      setCityy({ name: data[1][0].city });
      // setLocation({name: data[1][0].country});
      setStatee({ name: data[1][0].state });

      setMaxAge(data[1][0].max_age);
      setMinAge(data[1][0].min_age);
      setMinHeight(data[1][0].min_height);
      setMaxHeight(data[1][0].max_height);
      setMinPrice(data[1][0].min_price);
      setMaxPrice(data[1][0].max_price);

      setLocation({ name: data[1][0].country });

      setRadius(data[1][0].radius);
      // setSelectedIndex(
      //   data[1][0].gender === 'Gelding'
      //     ? 0
      //     : data[1][0].gender === 'Mare'
      //     ? 1
      //     : 2,
      // );

      /////////locations///////
      // const locationss = await getAllLocations();
      // if (data[1].length > 0) {
      //   setLocations(locationss[1]);
      //   setLocation(locationss[1][data[1][0].location_id - 1].location);
      //   setLocationID(locationss[1][data[1][0].location_id - 1].id);
      //   // console.log('asdfasdf', locationss[1][data[1][0].location_id - 1]);
      // } else {
      //   setLocations([]);
      // }

      /////////breed///////
      const getBreeds = await getAllBreeds();
      setBreedList(getBreeds);
      setBreed(
        getBreeds[data[1][0].breed_id - 1]
          ? getBreeds[data[1][0].breed_id - 1]
          : '',
      );

      /////colors////

      const colors = await getAllColors();
      setColor(colors[[data[1][0].color_id] - 1]);
      setColorList(colors);

      /////deciplions////
      const deciplions = await getAllDisciplines();
      setDiscipline(deciplions[data[1][0].discipline_id - 1]);
      setDisciplineList(deciplions);

      ////Temperaments////

      const temperaments = await getAlltemperaments();
      setTemperament(temperaments[data[1][0].temperament_id - 1]);
      setTemperamentList(temperaments);
    } else {
      // getAllCountries();
      getColors();
      getBreeds();
      getDisciplines();
      getTemperaments();
    }
    setLoading(false);
  };

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

    setDisciplineList(data);
  };
  const getTemperaments = async () => {
    const data = await getAlltemperaments();

    setTemperamentList(data);
  };

  const clearFields = () => {
    setLocation('');
    setCityy('');
    setStatee('');
    setBreed('');
    setMinAge('');
    setRadius(null);
    setMaxAge('');
    setMinHeight('');
    setMaxHeight('');
    setMinPrice('');
    setMaxPrice('');
    setDiscipline('');
    setGender([]);
    setColor('');
    setTemperament('');
    setKeywords([]);
    keywordsSheetRef.current.clear();
    genderSheetRef.current.clear();
  };
  const showResult = async () => {
    //at first check for save changes in fields
    console.log(gender);
    arr = [];
    keywords.map((item, id) => {
      arr.push(item.id);
    });

    const data = await userSaveSearchBuyer(
      location?.isoCode ? location?.isoCode : location?.name,
      statee?.isoCode ? statee?.isoCode : statee?.name,
      cityy?.name,
      breed?.id, //ok
      minAge, //ok
      maxAge, //ok
      minHeight, //ok
      maxHeight, //ok
      minPrice, //ok
      maxPrice, //ok
      discipline?.id, //ok
      gender, //ok
      color?.id, //ok
      temperament?.id, //ok
      arr, //ok
      radius,
    );

    if (data[0].code == 200) {
      if (data[1].id) {

        console.log('RESP FROM SERVER --=== ', data, " AND THIS IS LAT LONG ", props.route.params.myLat, props.route.params.myLong)

        props.navigation.navigate('SwipingPage', {
          pubnub: props.route.params.pubnub,
          myLat: props.route.params.myLat,
          myLong: props.route.params.myLong,
        });

      } else {
        Alert.alert('Error', 'Please Try Again');
      }
    } else {
      Alert.alert('Error', 'Please Try Again');
    }
  };
  const savedBtnPress = async () => {
    // userSaveSearchBuyer(
    //   location_id,//ok
    //   breed_id,//ok
    //   min_age,//ok
    //   max_age,//ok
    //   min_height,//ok
    //   max_height,//ok
    //   min_price,//ok
    //   max_price,//ok
    //   discipline_id,//ok
    //   gender,//ok
    //   color_id,//ok
    //   temperament_id,
    //   keywords_id,
    // )

    arr = [];
    keywords.map((item, id) => {
      arr.push(item.id);
    });
    const data = await userSaveSearchBuyer(
      location?.isoCode,
      statee?.isoCode,
      cityy?.name,
      breed?.id, //ok
      minAge, //ok
      maxAge, //ok
      minHeight, //ok
      maxHeight, //ok
      minPrice, //ok
      maxPrice, //ok
      discipline?.id, //ok
      gender, //ok
      color?.id, //ok
      temperament?.id, //ok
      arr, //ok
      radius,
    );
    console.log('fuuucjjj', data);
    if (data[0]?.code == 200) {
      if (data[1].id) {
        Alert.alert('Saved successfully');
      } else {
        Alert.alert('Error', 'Please Try Again');
      }
    } else {
      Alert.alert('Error', 'Please Try Again');
    }
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
        <KeyboardAvoidingView
          style={{ flex: 1, marginBottom: 90 }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={10}>
          <View style={globalStyle.innerContainer}>
            {loading ? (
              <BarIndicator color={COLORS.color3} size={22}></BarIndicator>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}>
                <HomeHeader
                  avatar={myImage}
                  navigation={props.navigation}
                  isBuyer={true}
                  showLine3={false}
                />
                {/* {loading? null :( */}

                <ScreenTitle size={15}>My preferences</ScreenTitle>

                <DropDown
                  title={'Breed'}
                  value={breed.breed}
                  onPress={() => breedSheetRef.current.snapToIndex(0)}
                />
                <RangeInput
                  title={'Age'}
                  onMaximumChange={e => {
                    setMaxAge(e);
                  }}
                  onMinimumChange={e => {
                    setMinAge(e);
                  }}
                  minValue={minAge}
                  maxValue={maxAge}
                  minPlaceholder={minAge?.toString()}
                  maxPlaceholder={maxAge?.toString()}
                />
                <RangeInput
                  title={'Height (hands)'}
                  onMaximumChange={e => {
                    setMaxHeight(e);
                  }}
                  onMinimumChange={e => {
                    setMinHeight(e);
                  }}
                  minValue={minHeight}
                  maxValue={maxHeight}
                  minPlaceholder={minHeight?.toString()}
                  maxPlaceholder={maxHeight?.toString()}
                />
                <RangeInput
                  title={'Price'}
                  onMaximumChange={e => {
                    setMaxPrice(e);
                  }}
                  onMinimumChange={e => {
                    setMinPrice(e);
                  }}
                  minValue={minPrice}
                  maxValue={maxPrice}
                  minPlaceholder={minPrice?.toString()}
                  maxPlaceholder={maxPrice?.toString()}
                />
                <DropDown
                  title={'Discipline'}
                  value={discipline?.discipline}
                  onPress={() => disciplineSheetRef.current.snapToIndex(0)}
                />
                <RadioListBuyer
                  ref={genderSheetRef}
                  title={'Gender (select all that apply)'}
                  list={['Gelding', 'Mare', 'Stallion']}
                  direction={'row'}
                  data={gender}
                  onChange={data => {
                    console.log(data);
                    setGender(data);
                  }}
                />
                <DropDown
                  title="Color"
                  value={color?.color}
                  onPress={() => colorSheetRef.current.snapToIndex(0)}
                />
                <DropDown
                  title="Temperament"
                  value={temperament?.temperament}
                  onPress={() => temperamentSheetRef.current.snapToIndex(0)}
                />
                <MultipleInput
                  ref={keywordsSheetRef}
                  title="Input keyword"
                  list={keywords}
                  onChange={list => {
                    console.log(list);
                    setKeywords(list);
                  }}></MultipleInput>

                <DropDown
                  title={'Location'}
                  value={location?.name}
                  onPress={() => {
                    getAllCountries();
                    locationSheetRef.current.snapToIndex(0);
                  }}
                />
                <DropDown
                  title={'State'}
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
                />
                <DropDown
                  title={'City'}
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
                />
                <DropDown
                  title={'Radius'}
                  value={radius ? radius : 0}
                  onPress={() => {
                    radiusSheetRef.current.snapToIndex(0);
                  }}
                />

                {/* Buttons */}

                <View style={styles.btnContainer}>
                  <View style={styles.row}>
                    <RoundBtn style={{ flex: 1 }} onPress={() => savedBtnPress()}>
                      Save
                    </RoundBtn>

                    {/* <RoundBtn
                      style={styles.editIcon}
                      RenderIcon={
                        <Image
                          source={editIcon}
                          resizeMode="contain"
                          style={styles.editImg}
                        />
                      }></RoundBtn> */}
                  </View>
                  <View style={styles.row}>
                    <RoundBtn
                      style={styles.clearBtn}
                      color={COLORS.color10}
                      onPress={clearFields}>
                      Clear
                    </RoundBtn>

                    <RoundBtn
                      style={{ flex: 1, marginLeft: 4 }}
                      onPress={showResult}>
                      Result
                    </RoundBtn>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </KeyboardAvoidingView>
        <CustomTab navigation={props.navigation} />
      </SafeAreaView>

      {/* location */}
      <Sheet ref={locationSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            height: height * 0.8,
          }}>
          <ScreenTitle size={18}>Select country</ScreenTitle>
          <TextInput
            onChangeText={e => handleChangeCountry(e)}
            placeholder="search your country"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              color: '#000',
              borderRadius: 5,
              padding: 10,
              width: '80%',
              color: COLORS.black,
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
                      setCityy({});
                      setStatee({});
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
            height: height * 0.8,
          }}>
          <ScreenTitle size={18}>Select state</ScreenTitle>
          <TextInput
            onChangeText={e => handleChangeState(e)}
            placeholder="search your state"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              color: '#000',
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

      <Sheet ref={radiusSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            height: height * 0.8,
          }}>
          <ScreenTitle size={18}>Select radius</ScreenTitle>

          <BottomSheetView style={styles.listContainer}>
            <FlatList
              data={radiusOptions}
              extraData={radiusOptions}
              keyExtractor={(item, index) => index}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={styles.listItem}
                    onPress={() => {
                      setRadius(item.value);
                      // setLocation(item);
                      // setLocationID(item.id);
                      radiusSheetRef.current.close();
                    }}>
                    <Text style={[styles.textItem, { textAlign: 'left' }]}>
                      {item?.value} {' Miles'}
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
            height: height * 0.8,
          }}>
          <ScreenTitle size={18}>Select city</ScreenTitle>
          <TextInput
            onChangeText={e => handleChangeCity(e)}
            placeholder="search your state"
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              color: '#000',
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
                      console.log('mmmmmm', item);
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
          enableOverDrag={false}
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            height: height * 0.8,
          }}>
          <ScreenTitle size={18}>Select breed</ScreenTitle>
          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>

            <FlatList
              data={breedList}
              scrollEnabled
              extraData={breedList}
              keyExtractor={(item, index) => item.breed}
              contentContainerStyle={{ paddingTop: 32, zIndex: 200 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
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
      {/* discipline */}
      <Sheet ref={disciplineSheetRef} index={-1} pressBehavior={'close'}>
        <BottomSheetView
          style={{
            alignItems: 'center',
            paddingBottom: 32,
            paddingTop: 18,
            height: height * 0.8,
          }}>
          <ScreenTitle size={18}>Select discipline</ScreenTitle>
          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>
            <FlatList
              data={disciplineList}
              extraData={disciplineList}
              keyExtractor={(item, index) => item.breed}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={styles.listItem}
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
            height: height * 0.8,
          }}>
          <ScreenTitle size={18}>Select Color</ScreenTitle>
          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>
            <FlatList
              data={colorList}
              extraData={colorList}
              keyExtractor={(item, index) => item.breed}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
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
            height: height * 0.8,
          }}>
          <ScreenTitle size={18}>Select temperament</ScreenTitle>
          <BottomSheetView style={[styles.listContainer, { height: 200 }]}>
            <FlatList
              data={temperamentList}
              extraData={temperamentList}
              keyExtractor={(item, index) => item.temperament}
              contentContainerStyle={{ paddingTop: 32 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
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

export default Buyer;

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 48,
  },

  row: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  editIcon: {
    width: 80,
    marginLeft: 8,
    backgroundColor: COLORS.white,
  },
  editImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  clearBtn: {
    flex: 1,
    marginRight: 4,
    backgroundColor: COLORS.color15,
    borderWidth: 1,
    borderColor: COLORS.color16,
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
