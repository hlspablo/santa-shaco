import { Ionicons } from '@expo/vector-icons';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Image from 'react-native-fast-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  AccountAreaView,
  AccountNumberText,
  AccountUserText,
  CardNumberContainer,
  CardNumberText,
  Container,
  ImageWrapper,
  ImagesContainer,
  PixRowContainer,
  ScrollContainer,
  Spacer,
  TopHeader,
} from './styles';
import { CardsScreen } from '../Cards';
import { LoadingComponent } from '../Loading';
import { PixTransferScreen } from '../PixTransfer';

import { MainScreenNavigationProp } from '@/@types/navigation';
import { CollapsibleRectangle } from '@/components/Collapsible';
import { useSetup } from '@/store/hooks';
import { addDashBeforeLast, getFirstName } from '@/utils/format';

// Define type for tab navigator
type TabParamList = {
  Home: undefined;
  Pix: undefined;
  Atendimento: undefined;
  Menu: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

// Main content component (what was previously MainScreen)
const HomeScreen = function HomeScreen() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [shouldAnimate, setShouldAnimate] = React.useState(false);
  const navigation = useNavigation<MainScreenNavigationProp>();
  const insets = useSafeAreaInsets();
  const {
    setup: { ownerAgency, ownerAccount, ownerName, ownerCard, balance },
  } = useSetup();

  const toggleRectangle = () => {
    setShouldAnimate(true);
    setIsOpen(!isOpen);
  };

  function goStartup() {
    navigation.navigate('StartupScreen');
  }

  function goToMethods() {
    navigation.navigate('MethodScreen');
  }

  return (
    <>
      <StatusBar style="auto" backgroundColor="#D74141" />
      <TopHeader height={insets.top} />
      <Pressable onPress={goStartup}>
        <Image
          source={require('@assets/pages/main/header.png')}
          resizeMode={Image.resizeMode.cover}
          style={{ width: '100%', height: 48, backgroundColor: '#BA261A' }}
        />
      </Pressable>
      <Container bounces={false}>
        <AccountAreaView>
          <AccountUserText>Olá, {getFirstName(ownerName)}</AccountUserText>
          <AccountNumberText>
            Ag {ownerAgency} Cc {addDashBeforeLast(ownerAccount)}
          </AccountNumberText>
        </AccountAreaView>
        <Animatable.View
          style={styles.balance}
          animation={
            shouldAnimate
              ? {
                  from: { height: isOpen ? 65 : 225 },
                  to: { height: isOpen ? 225 : 65 },
                }
              : undefined
          }
          duration={350}>
          <CollapsibleRectangle
            toggleRectangle={toggleRectangle}
            isOpen={isOpen}
            shouldAnimate={shouldAnimate}
            balance={balance}
          />
        </Animatable.View>
        <ScrollContainer>
          <PixRowContainer
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={{
              height: 150,
              paddingLeft: 20,
              paddingVertical: 20,
            }}>
            <ImageWrapper style={styles.shadow} onPress={goToMethods}>
              <Image
                resizeMode={Image.resizeMode.cover}
                source={require('@assets/pages/main/pix.png')}
                style={{ width: 120, height: 100 }}
              />
            </ImageWrapper>
            <ImageWrapper style={styles.shadow}>
              <Image
                resizeMode={Image.resizeMode.cover}
                source={require('@assets/pages/main/idsant.png')}
                style={{ width: 120, height: 100 }}
              />
            </ImageWrapper>
            <ImageWrapper style={styles.shadow}>
              <Image
                resizeMode={Image.resizeMode.cover}
                source={require('@assets/pages/main/pay.png')}
                style={{ width: 120, height: 100 }}
              />
            </ImageWrapper>
            <ImageWrapper style={styles.shadow}>
              <Image
                resizeMode={Image.resizeMode.cover}
                source={require('@assets/pages/main/transfer.png')}
                style={{ width: 120, height: 100 }}
              />
            </ImageWrapper>
            <ImageWrapper style={styles.shadow}>
              <Image
                resizeMode={Image.resizeMode.cover}
                source={require('@assets/pages/main/charge.png')}
                style={{ width: 120, height: 100 }}
              />
            </ImageWrapper>
            <ImageWrapper style={styles.shadow}>
              <Image
                resizeMode={Image.resizeMode.cover}
                source={require('@assets/pages/main/comp.png')}
                style={{ width: 120, height: 100 }}
              />
            </ImageWrapper>
            <ImageWrapper style={styles.shadow}>
              <Image
                resizeMode={Image.resizeMode.cover}
                source={require('@assets/pages/main/help.png')}
                style={{ width: 120, height: 100 }}
              />
            </ImageWrapper>
          </PixRowContainer>
        </ScrollContainer>
        <View style={{ width: '100%', height: 230, top: -25, backgroundColor: '#f5f9fb' }}>
          <Image
            resizeMode={Image.resizeMode.contain}
            source={require('@assets/pages/main/fgts.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </View>
        <ImagesContainer>
          <CardsScreen />
          <Image
            resizeMode={Image.resizeMode.cover}
            source={require('@assets/pages/main/poup.png')}
            style={{ width: '100%', height: 620 }}
          />
          <Spacer />
        </ImagesContainer>
      </Container>
      <LoadingComponent />
    </>
  );
};

// Placeholder screens for other tabs
const PixScreen = () => <PixTransferScreen />;

const AtendimentoScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Atendimento Screen</Text>
  </View>
);

const MenuScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Menu Screen</Text>
  </View>
);

// Main component with Tab Navigation
export const MainScreen = function () {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            return (
              <Image
                resizeMode={Image.resizeMode.contain}
                source={require('@assets/icons/home.png')}
                style={{ width: 30, height: 30 }}
              />
            );
          } else if (route.name === 'Pix') {
            return (
              <Image
                resizeMode={Image.resizeMode.contain}
                source={require('@assets/icons/pix.png')}
                style={{ width: 30, height: 30 }}
              />
            );
          } else if (route.name === 'Atendimento') {
            return (
              <Image
                resizeMode={Image.resizeMode.contain}
                source={require('@assets/icons/atend.png')}
                style={{ width: 30, height: 30 }}
              />
            );
          } else if (route.name === 'Menu') {
            iconName = focused ? 'menu' : 'menu-outline';
          } else {
            iconName = 'help-circle';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#D74141',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingTop: 5,
          paddingBottom: insets.bottom,
        },
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontSize: 12,
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Pix" component={PixScreen} />
      <Tab.Screen name="Atendimento" component={AtendimentoScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balance: {
    top: -32,
    borderBottomEndRadius: 5,
    borderBottomStartRadius: 5,
  },
});
