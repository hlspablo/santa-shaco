import React from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import EvilIcon from "react-native-vector-icons/EvilIcons";

interface HeaderProps {
    title: string;
    onPress?: () => void;
    showClose?: boolean;
}
const Header = ({ title, showClose, onPress }: HeaderProps) => {
    return (
        <Pressable style={styles.container} onPress={onPress}>
            {showClose ? (
                <EvilIcon style={styles.icon} name="close" size={35} color="#fff" />
            ) : (
                <Icon style={styles.icon} name="arrow-left" size={22} color="#fff" />
            )}
            <Text style={styles.title}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    icon: {
        position: "absolute",
        left: 20,
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#fff",
    },
    container: {
        flexDirection: "row",
        height: 60,
        backgroundColor: "#BA261A",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Header;
