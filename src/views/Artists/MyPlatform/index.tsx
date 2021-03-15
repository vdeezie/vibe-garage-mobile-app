import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  TouchableWithoutFeedback,
} from 'react-native';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './myPlatformStyle';
import {AuthContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import BannerImage from '../../../assets/images/d-cover.jpg';
import ArtisteImage from '../../../assets/images/d-avatar.jpg';
import {combineData, getFromOldUrl} from '../../../utils/helpers';
import {getSpotlight} from '../../../services/songService';

export function MyPlatform({navigation}: DrawerScreenProps<{}>) {
  const {state, dispatch}: any = useContext(AuthContext);
  const user = state?.user;

  const [data, setData] = useState({
    tab: 'My Songs',
    mySongs: [] as any,
    myAlbums: [] as any,
  });

  useEffect(() => {
    handleSpotlight();
  }, []);

  const handleSpotlight = async () => {
    try {
      await getSpotlight()
        .then((response: any) => {
          let mySongs = [];
          if (response && response?.spotlight) {
            mySongs = response?.spotlight;
          }
          setData(combineData(data, {mySongs}));
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTab = (tab: any) => {
    setData(combineData(data, {tab}));
  };

  return (
    <View style={styles.myPlatformContainer}>
      <NavDrawerHeader navigation={navigation} />
      <View style={styles.myPlatformContent}>
        <ImageBackground
          source={BannerImage}
          style={styles.bannerImage}
          imageStyle={styles.bannerImageBackground}></ImageBackground>
        <View style={styles.artisteImageContainer}>
          <Image source={ArtisteImage} style={styles.artisteImage} />
        </View>
        <View style={styles.myPlatformWrapper}>
          <View style={styles.artisteInfoWrapper}>
            <View style={styles.checkRow}>
              <CustomText
                type={1}
                text={user?.name}
                style={styles.artisteNameText}
              />
              {user?.verified ? (
                <View style={styles.checkBg}>
                  <Feather name="check-circle" size={20} color="#fff" />
                </View>
              ) : null}
            </View>
            <CustomText
              text={`@${user?.username}`}
              style={styles.artisteUsername}
            />
            <View style={styles.artisteFollowWrapper}>
              <CustomText
                type={2}
                text="0 Followers"
                style={styles.artisteFollowText}
              />
              <CustomText
                type={2}
                text="."
                style={styles.artisteFollowBullet}
              />
              <CustomText
                type={2}
                text="0 Following"
                style={styles.artisteFollowText}
              />
            </View>
            <TouchableOpacity style={styles.editProfileWrapper}>
              <MaterialCommunityIcons
                name="account-edit"
                size={20}
                color="#fff"
              />
              <CustomText
                type={1}
                text="Edit Profile"
                style={styles.editProfileText}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.tabHeader}>
            <TouchableWithoutFeedback onPress={() => handleTab('My Songs')}>
              <View
                style={[
                  styles.tabTextWrapper,
                  data.tab === 'My Songs' && styles.activeTabTextWrapper,
                ]}>
                <CustomText
                  type={1}
                  text="My Songs"
                  style={[
                    styles.tabText,
                    data.tab === 'My Songs' && styles.activeTabText,
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => handleTab('My Albums')}>
              <View
                style={[
                  styles.tabTextWrapper,
                  data.tab === 'My Albums' && styles.activeTabTextWrapper,
                ]}>
                <CustomText
                  type={1}
                  text="My Albums"
                  style={[
                    styles.tabText,
                    data.tab === 'My Albums' && styles.activeTabText,
                  ]}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
          {data?.tab === 'My Songs' ? (
            <View style={styles.scrollViewContent}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                {data?.mySongs?.map((spotlightItem: any) => (
                  <View
                    style={styles.singleSpotlightWrapper}
                    key={shortid.generate()}>
                    <View style={styles.spotlightRowOne}>
                      <Image
                        source={{
                          uri: getFromOldUrl(
                            spotlightItem?.artist_data?.avatar,
                          ),
                        }}
                        style={styles.artistImage}
                      />
                      <View style={styles.artistInfo}>
                        <CustomText
                          style={styles.artistName}
                          type={1}
                          text={spotlightItem?.artist_data?.name}
                        />
                        <View style={styles.flexRow}>
                          <CustomText
                            type={2}
                            text={spotlightItem.uploadInfo}
                            style={{fontSize: 12}}
                          />
                          <CustomText
                            type={2}
                            text={spotlightItem.uploadTime}
                            style={{fontSize: 12}}
                          />
                        </View>
                      </View>
                      <Feather
                        name="more-horizontal"
                        color="#c3c3c6"
                        size={22}
                        style={styles.moreIcon}
                      />
                    </View>
                    <View style={styles.spotlightRowTwo}>
                      <Image
                        source={{
                          uri: getFromOldUrl(spotlightItem?.thumbnail),
                        }}
                        style={styles.albumImage}
                      />
                      <CustomText
                        type={1}
                        text={spotlightItem.title}
                        size={17}
                        style={styles.albumName}
                      />
                      <View style={styles.songDuration}>
                        <MaterialIcons
                          name="history"
                          color="#919191"
                          size={18}
                        />
                        <CustomText
                          type={2}
                          text={spotlightItem?.duration}
                          style={styles.historyIcon}
                        />
                      </View>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
}
