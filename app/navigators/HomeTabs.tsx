import React from "react";
import styled from "styled-components/native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ms } from "react-native-size-matters";
import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeTabParamList, TabLabelProps } from "@/@types/navigation";
import { HomeScreen } from "@/screens/HomeOld";
import { observer } from "mobx-react-lite";
import { RouteProp } from "@react-navigation/native";
import { SetupScreen } from "@/screens/Setup";

interface ScreenOptionsProps {
    route: RouteProp<HomeTabParamList, keyof HomeTabParamList>;
}

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTabs = observer(function () {
    return (
        <HomeTab.Navigator screenOptions={getScreenOptions} initialRouteName="MenuScreen">
            <HomeTab.Screen name="HomeScreen" component={SetupScreen} />
            <HomeTab.Screen name="MenuScreen" component={HomeScreen} />
            <HomeTab.Screen name="CartScreen" component={HomeScreen} />
            <HomeTab.Screen
                name="OrdersScreen"
                component={HomeScreen}
                options={{
                    tabBarBadge: 0,
                    tabBarBadgeStyle: {
                        backgroundColor: "#fff220",
                    },
                }}
            />
            <HomeTab.Screen name="ProfileScreen" component={HomeScreen} />
        </HomeTab.Navigator>
    );
});

export const TabLabelText = styled.Text<TabLabelProps>`
    font-family: "SFUIText-Semibold";
    font-size: ${ms(11)}px;
    color: ${props => props.color};
`;

const getScreenOptions = ({ route }: ScreenOptionsProps): BottomTabNavigationOptions => ({
    headerShown: false,
    tabBarActiveTintColor: "#3a58ec",
    tabBarInactiveTintColor: "#8b7777",
    tabBarLabel: function myIcon({ focused, color, position }) {
        switch (route.name) {
            case "HomeScreen":
                return <TabLabelText color={color}>Menu</TabLabelText>;
            case "MenuScreen":
                return <TabLabelText color={color}>Início</TabLabelText>;
            case "CartScreen":
                return <TabLabelText color={color}>Busca</TabLabelText>;
            case "OrdersScreen":
                return <TabLabelText color={color}>Notificações</TabLabelText>;
            case "ProfileScreen":
                return <TabLabelText color={color}>Perfil</TabLabelText>;
            default:
                return <TabLabelText color={color}>Perfil</TabLabelText>;
        }
    },
    tabBarIcon: function myIcon({ focused, color, size }) {
        switch (route.name) {
            case "HomeScreen":
                return <Feather name="menu" size={ms(25)} color={color} />;
            case "MenuScreen":
                return <Entypo name="home" size={ms(18)} color={color} />;
            case "CartScreen":
                return <Fontisto name="search" size={ms(18)} color={color} />;
            case "OrdersScreen":
                return <Ionicons name="ios-notifications" size={ms(18)} color={color} />;
            case "ProfileScreen":
                return <FontAwesome5 name="user-alt" size={ms(16)} color={color} />;
            default:
                return <FontAwesome5 name="user-alt" size={ms(16)} color={color} />;
        }
    },
});
