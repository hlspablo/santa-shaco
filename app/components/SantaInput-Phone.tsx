import React from "react";
import { StyleSheet, Pressable, View, Text } from "react-native";
import * as Animatable from "react-native-animatable";
import AntIcon from "react-native-vector-icons/AntDesign";
import MaskInput, { Masks } from "react-native-mask-input";

interface SantaInputProps {
    label: string;
    clearable?: boolean;
    text: string;
    setText: (text: string) => void;
    onValidation?: (valid: boolean) => void;
}

export const SantaInputPhone = ({
    label = "",
    clearable = true,
    text = "",
    setText,
    onValidation,
}: SantaInputProps) => {
    const labelRef = React.useRef(null);
    const textInputRef = React.useRef(null);

    React.useEffect(() => {
        labelRef.current.transitionTo({ translateY: -20, color: "#7b4e4e", fontSize: 15 }, 10);
    }, []);

    React.useEffect(() => {
        let validationStatus = false;
        const numbers = text.replace(/\D+/g, "");
        if (numbers.length === 11) {
            validationStatus = true;
        }
        if (onValidation) onValidation(validationStatus);
    }, [text]);

    const clearInput = () => {
        setText("");
        textInputRef.current.clear();
    };

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                textInputRef.current.focus();
            }}>
            <Animatable.Text ref={labelRef} style={[styles.label, { color: "grey" }]} animation="fadeIn" duration={10}>
                {label}
            </Animatable.Text>

            <View style={styles.prefixContainer}>
                <Text style={styles.prefixText}>+55 </Text>
                <MaskInput
                    ref={textInputRef}
                    style={styles.textInput}
                    keyboardType="number-pad"
                    returnKeyType="done"
                    keyboardAppearance="light"
                    onChangeText={setText}
                    mask={Masks.BRL_PHONE}
                    value={text}
                />
            </View>
            {text.length > 0 && clearable && (
                <Pressable style={styles.clearIcon} onPress={clearInput}>
                    <AntIcon name="close" size={32} color="#ec0200" />
                </Pressable>
            )}
        </Pressable>
    );
};
const styles = StyleSheet.create({
    prefixContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#ec0200",
    },
    prefixText: {
        fontSize: 18,
        paddingBottom: 5,
        color: "#000",
        bottom: -5,
    },
    clearIcon: {
        position: "absolute",
        right: 2,
        bottom: 5,
    },
    container: {
        margin: 16,
    },
    label: {
        position: "absolute",
        left: 2,
        bottom: 16,
        fontSize: 17,
    },
    textInput: {
        paddingBottom: 5,
        fontSize: 18,
        color: "#000",
    },
});
