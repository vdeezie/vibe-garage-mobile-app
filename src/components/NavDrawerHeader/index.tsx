import React, {useContext} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './navDrawerHeaderStyle';
import NavIcon from '../../assets/icons/menu-icon.png';
import Logo from '../../assets/images/logo-modified.png';
import {AuthContext} from '../../context';
import {getScreenParent} from '../../utils/navigationHelper';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {signOutOfFacebook} from '../../utils/helpers';

export default function NavDrawerHeader({navigation}: any) {
  const {state, dispatch}: any = useContext(AuthContext);
  const {user} = state;

  const handleToggleNavDrawer = () => {
    navigation?.openDrawer();
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      await dispatch({
        type: 'populateUser',
        payload: {user: {}, isLoggedIn: false},
      });
      signOutOfFacebook();
      handleNavigation('Discover');
    } catch (error) {
      console.error(error);
    }
  };

  const handleNavigation = (route: String) => {
    navigateToNestedRoute(getScreenParent(route), route);
  };

  return (
    <View style={styles.navHeader}>
      <TouchableOpacity onPress={() => handleToggleNavDrawer()}>
        <Image source={NavIcon} style={styles.navIconImage} />
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image source={Logo} style={styles.logoImage} />
      </View>
      <View style={styles.controlIcons}>
        <Ionicons name="search" size={23} color="#ebebeb" />
        <Menu>
          <MenuTrigger>
            <MaterialCommunityIcons
              name="account-circle"
              size={23}
              color="#ebebeb"
              style={{marginLeft: 15}}
            />
          </MenuTrigger>
          <MenuOptions>
            {state?.isLoggedIn ? (
              <>
                <MenuOption onSelect={() => handleNavigation('GetCredit')}>
                  <Text style={styles.menuOptionText}>Get credit</Text>
                </MenuOption>
                {user?.artist != 1 ? (
                  <>
                    <MenuOption
                      onSelect={() => handleNavigation('BecomeAnArtist')}>
                      <Text style={styles.menuOptionText}>
                        Become an artist
                      </Text>
                    </MenuOption>
                  </>
                ) : user?.artist == 1 ? (
                  <>
                    <MenuOption onSelect={() => handleNavigation('MyPlatform')}>
                      <Text style={styles.menuOptionText}>My Platform</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => handleNavigation('Upload')}>
                      <Text style={styles.menuOptionText}>Upload</Text>
                    </MenuOption>
                  </>
                ) : null}
                {user?.is_subscribed === '0' ? (
                  <MenuOption
                    onSelect={() => handleNavigation('SubscribeToPremium')}>
                    <Text style={styles.menuOptionText}>
                      Subscribe to Premium
                    </Text>
                  </MenuOption>
                ) : null}
                {/* <MenuOption onSelect={() => handleNavigation('Profile')}>
                  <Text style={styles.menuOptionText}>Profile</Text>
                </MenuOption> */}
                <MenuOption onSelect={() => handleLogout()}>
                  <Text style={styles.menuOptionText}>Logout</Text>
                </MenuOption>
              </>
            ) : (
              <>
                <MenuOption onSelect={() => handleNavigation('Login')}>
                  <Text style={styles.menuOptionText}>Login</Text>
                </MenuOption>
                <MenuOption onSelect={() => handleNavigation('SignUp')}>
                  <Text style={styles.menuOptionText}>Register</Text>
                </MenuOption>
              </>
            )}
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
