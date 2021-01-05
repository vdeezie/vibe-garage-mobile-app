import React, {useState, createRef, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  FlatList,
  ScrollViewProps,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {DrawerScreenProps} from '@react-navigation/drawer';
import shortid from 'shortid';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import NavDrawerHeader from '../../../components/NavDrawerHeader';
import {CustomText} from '../../../components/Global';
import styles from './discoverStyle';
import {RecentlyPlayed} from '../../Music';
import {combineData} from '../../../utils/helpers';
import {set} from 'react-native-reanimated';

const windowWidth = Dimensions.get('window').width;

export function Discover({navigation}: DrawerScreenProps<{}>) {
  const [data, setData] = useState({
    carouselItems: [
      {
        title: 'October special',
        image:
          'https://musicport.com.ng/upload/photos/2019/10/NuJHxVutEiIgT86CcFqr_06_6dfa801e8668b414c32232e7c8b93426_image.jpg',
      },
      {
        title: 'LABIS BOY_MAN OF THE YEAR.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2019/10/J7qytBWEsADF5zBsC6Os_17_98885479029d3e547509c8e8ea8d1e3b_image.jpg',
      },
      {
        title: 'November TOP 5',
        image:
          'https://musicport.com.ng/upload/photos/2019/11/wbWF1rYguTq8JtKZIaM6_22_a47c1c30c1e7318a49df8de5748a9ea7_image.jpeg',
      },
      {
        title: 'Exhausted (I don tire).mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/01/MUDLnD9cXKhvkVJuUGAK_29_0c0801563af4b03dea742996a6cde2e0_image.png',
      },
    ],
    recentlyPlayed: [
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'LABIS BOY_MAN OF THE YEAR.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/01/BTCHNCgZsQdDhSc3q2Uo_20_166e4ab24c7f858195f3a0c3909f2fe3_image.jpg',
        artiste: 'Itz Labisboy',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'LABIS BOY_MAN OF THE YEAR.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/01/BTCHNCgZsQdDhSc3q2Uo_20_166e4ab24c7f858195f3a0c3909f2fe3_image.jpg',
        artiste: 'Itz Labisboy',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'LABIS BOY_MAN OF THE YEAR.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/01/BTCHNCgZsQdDhSc3q2Uo_20_166e4ab24c7f858195f3a0c3909f2fe3_image.jpg',
        artiste: 'Itz Labisboy',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'LABIS BOY_MAN OF THE YEAR.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/01/BTCHNCgZsQdDhSc3q2Uo_20_166e4ab24c7f858195f3a0c3909f2fe3_image.jpg',
        artiste: 'Itz Labisboy',
      },
    ],
    newReleases: [
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'Follow-Me-Nuels+iPraiz_Prod_Nuels.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/12/QlWlWRCTHgmtUzCaS15V_25_c1388101c2d06d65fc383e0c8f8dae27_image.jpg',
        artiste: 'Nuels',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'Nuels Sunday-Ima-Abisi.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/12/iJodKj89pN23qhg6hDPG_02_9684b0c99e584ce72eae8c74ac1fd243_image.jpeg',
        artiste: 'Nuels',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'Follow-Me-Nuels+iPraiz_Prod_Nuels.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/12/QlWlWRCTHgmtUzCaS15V_25_c1388101c2d06d65fc383e0c8f8dae27_image.jpg',
        artiste: 'Nuels',
      },
      {
        _id: '253tt3s38832absjjkdkk',
        title: 'Nuels Sunday-Ima-Abisi.mp3',
        image:
          'https://musicport.com.ng/upload/photos/2020/12/iJodKj89pN23qhg6hDPG_02_9684b0c99e584ce72eae8c74ac1fd243_image.jpeg',
        artiste: 'Nuels',
      },
    ],
    recentlyPlayedScrollPosition: 0,
    newReleasesScrollPosition: 0,
    mostPopular: [],
    recommended: [
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
      {
        image:
          'https://musicport.com.ng/upload/photos/2020/04/3PdAmcAZOAxYhm75N3hu_01_67c4720aac05022fef9a4ba47653d165_image.jpeg',
        title: 'FRISKY',
        artiste: 'Emmanuel Jackson',
      },
    ],
  });

  let scrollViewRef = createRef<ScrollView>();
  // let scrollRef = useRef<ScrollView>();

  const _renderItem = ({item}: any) => {
    return (
      <View style={styles.carouselContainer}>
        <Image source={{uri: item?.image}} style={styles.carouselImage} />
        <Text style={styles.carouselText}>{item.title}</Text>
      </View>
    );
  };

  // const setScrollViewRef = (element: any) => {
  //   scrollRef = element;
  // };

  const _renderColumn = () => {
    return (
      <View style={{width: '100%', backgroundColor: '#ccc'}}>
        <View style={styles.singleCard}>
          <Image
            source={{
              uri:
                'https://musicport.com.ng/upload/photos/2020/01/BTCHNCgZsQdDhSc3q2Uo_20_166e4ab24c7f858195f3a0c3909f2fe3_image.jpg',
            }}
            style={styles.cardImage}
          />
          <CustomText
            type={1}
            text="LABIS BOY_ROCK THE PARTY.mp3"
            style={styles.cardText}
          />
          <CustomText type={2} text="Itz Labisboy" style={styles.cardText2} />
        </View>
      </View>
    );
  };

  const handleScrollRecentlyPlayed = (direction: string) => {
    let recentlyPlayedScrollPosition = data?.recentlyPlayedScrollPosition;
    const viewWidth = windowWidth;
    if (direction === 'left') {
      recentlyPlayedScrollPosition -= viewWidth;
    } else if (direction === 'right') {
      recentlyPlayedScrollPosition += viewWidth;
    }
    console.log(recentlyPlayedScrollPosition);
    console.log(scrollViewRef?.current);
    scrollViewRef?.current?.scrollTo({
      x: recentlyPlayedScrollPosition,
      animated: true,
    });
    setData(combineData(data, {recentlyPlayedScrollPosition}));
  };

  return (
    <View style={styles.discoverContainer}>
      <NavDrawerHeader navigation={navigation} />
      <ScrollView style={styles.scrollViewContent}>
        <Carousel
          layout={'default'}
          data={data.carouselItems}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          renderItem={_renderItem}
          onSnapToItem={(index: any) => console.log(index)}
          style={styles.carouselContent}
        />
        <View style={styles.contentWrapper}>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.greenBg]}>
                  <MaterialCommunityIcons
                    name="history"
                    size={25}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>Recently Played</Text>
              </View>
              <View style={styles.flexRow}>
                <CustomText
                  type={2}
                  text="Show All"
                  style={styles.showAllText}
                />
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('left')}>
                  <View style={[styles.arrowWrapper, styles.marginRight]}>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('right')}>
                  <View style={styles.arrowWrapper}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={{marginTop: 16}} horizontal ref={scrollViewRef}>
              {data?.recentlyPlayed ? (
                data?.recentlyPlayed.map((recentlyPlayed, index) => (
                  <View
                    style={[
                      styles.singleCard,
                      {width: windowWidth / 2.34},
                      // {marginRight: 20},
                      index !== data?.recentlyPlayed?.length - 1 && {
                        marginRight: 20,
                      },
                    ]}
                    key={shortid.generate()}>
                    <Image
                      source={{
                        uri: recentlyPlayed.image,
                      }}
                      style={styles.cardImage}
                    />
                    <CustomText
                      type={1}
                      text={recentlyPlayed.title}
                      style={styles.cardText}
                    />
                    <CustomText
                      type={2}
                      text={recentlyPlayed.artiste}
                      style={styles.cardText2}
                    />
                  </View>
                ))
              ) : (
                <Text>None found</Text>
              )}
            </ScrollView>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.blueBg]}>
                  <MaterialCommunityIcons
                    name="history"
                    size={25}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>New Releases</Text>
              </View>
              <View style={styles.flexRow}>
                <CustomText
                  type={2}
                  text="Show All"
                  style={styles.showAllText}
                />
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('left')}>
                  <View style={[styles.arrowWrapper, styles.marginRight]}>
                    <MaterialCommunityIcons
                      name="chevron-left"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleScrollRecentlyPlayed('right')}>
                  <View style={styles.arrowWrapper}>
                    <MaterialCommunityIcons
                      name="chevron-right"
                      size={30}
                      color="#000"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <ScrollView style={{marginTop: 16}} horizontal ref={scrollViewRef}>
              {data?.newReleases ? (
                data?.newReleases.map((newRelease, index) => (
                  <View
                    style={[
                      styles.singleCard,
                      {width: windowWidth / 2.34},
                      // {marginRight: 20},
                      index !== data?.newReleases?.length - 1 && {
                        marginRight: 20,
                      },
                    ]}
                    key={shortid.generate()}>
                    <Image
                      source={{
                        uri: newRelease.image,
                      }}
                      style={styles.cardImage}
                    />
                    <CustomText
                      type={1}
                      text={newRelease.title}
                      style={styles.cardText}
                    />
                    <CustomText
                      type={2}
                      text={newRelease.artiste}
                      style={styles.cardText2}
                    />
                  </View>
                ))
              ) : (
                <Text>None found</Text>
              )}
            </ScrollView>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.pinkBg]}>
                  <MaterialCommunityIcons
                    name="history"
                    size={25}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>Most Popular This Week</Text>
              </View>
            </View>
            <View style={styles.topSongsContent}>
              {data?.mostPopular?.length ? (
                <>
                  <View style={styles.topSongsWrapper}>
                    {data.mostPopular.map((music, index) => (
                      <View
                        key={shortid.generate()}
                        style={styles.singleTopSong}>
                        <Image
                          source={{
                            uri: music?.image,
                          }}
                          style={styles.topMusicImage}
                        />
                        <View style={styles.musicTextWrapper}>
                          <Text
                            style={styles.musicTitleText}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {music?.title}
                          </Text>
                          <Text
                            style={styles.musicArtisteText}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {music?.artiste}
                          </Text>
                        </View>
                        <MaterialIcons
                          name="more-horiz"
                          style={styles.musicMoreIcon}
                          color="#919191"
                          size={25}
                        />
                      </View>
                    ))}
                  </View>
                </>
              ) : null}
            </View>
          </View>
          <View style={styles.contentRow}>
            <View style={styles.rowTag}>
              <View style={styles.flexRow}>
                <View style={[styles.graphBg, styles.maroonBg]}>
                  <MaterialCommunityIcons
                    name="history"
                    size={25}
                    color="#fff"
                  />
                </View>
                <Text style={styles.playlistsText}>Recommended</Text>
              </View>
            </View>
            <View style={styles.topSongsContent}>
              {data?.recommended?.length ? (
                <>
                  <View style={styles.topSongsWrapper}>
                    {data.recommended.map((music, index) => (
                      <View
                        key={shortid.generate()}
                        style={styles.singleTopSong}>
                        <Image
                          source={{
                            uri: music.image,
                          }}
                          style={styles.topMusicImage}
                        />
                        <View style={styles.musicTextWrapper}>
                          <Text
                            style={styles.musicTitleText}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {music.title}
                          </Text>
                          <Text
                            style={styles.musicArtisteText}
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {music.artiste}
                          </Text>
                        </View>
                        <MaterialIcons
                          name="more-horiz"
                          style={styles.musicMoreIcon}
                          color="#919191"
                          size={25}
                        />
                      </View>
                    ))}
                  </View>
                </>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
