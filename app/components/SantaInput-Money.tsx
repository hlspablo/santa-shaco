import React from "react";
import { StyleSheet, Pressable, TextInput } from "react-native";
import * as Animatable from "react-native-animatable";
import AntIcon from "react-native-vector-icons/AntDesign";
import CurrencyInput from "react-native-currency-input";

interface SantaInputProps {
    label: string;
    clearable?: boolean;
    value: number;
    setValue: (text: number) => void;
    onValidation?: (valid: boolean) => void;
}

const isValidValue = value => {
    return value > 0;
};

export const SantaInputMoney = ({
    label = "",
    clearable = true,
    value = 0,
    setValue,
    onValidation,
}: SantaInputProps) => {
    const labelRef = React.useRef(null);
    const textInputRef = React.useRef(null);

    React.useEffect(() => {
        let validationStatus = false;
        validationStatus = isValidValue(value);
        if (onValidation) onValidation(validationStatus);
    }, [value]);

    React.useEffect(() => {
        labelRef.current.transitionTo({ translateY: -20, color: "#7b4e4e", fontSize: 15 }, 800);
    }, []);

    const clearInput = () => {
        setValue(0);
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
            <CurrencyInput
                ref={textInputRef}
                value={value}
                onChangeValue={setValue}
                prefix="R$ "
                delimiter="."
                separator=","
                precision={2}
                style={styles.textInput}
                keyboardAppearance="light"
                returnKeyType="done"
                minValue={0}
            />
            {value > 0 && clearable && (
                <Pressable style={styles.clearIcon} onPress={clearInput}>
                    <AntIcon name="close" size={32} color="#ec0200" />
                </Pressable>
            )}
        </Pressable>
    );
};
const styles = StyleSheet.create({
    clearIcon: {
        position: "absolute",
        right: 2,
        bottom: 5,
        transform: [{ translateY: -9 }],
    },
    container: {
        margin: 16,
    },
    label: {
        position: "absolute",
        left: 2,
        bottom: 25,
        fontSize: 17,
    },
    textInput: {
        marginTop: 18,
        fontSize: 25,
        fontWeight: "bold",
        borderBottomWidth: 1,
        borderBottomColor: "#ec0200",
        color: "#000",
    },
});
