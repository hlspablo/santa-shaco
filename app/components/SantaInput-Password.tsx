import React from "react";
import { StyleSheet, Pressable } from "react-native";
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

export const SantaInputPassword = ({
    label = "",
    clearable = true,
    text = "",
    setText,
    onValidation,
}: SantaInputProps) => {
    const labelRef = React.useRef(null);
    const textInputRef = React.useRef(null);

    React.useEffect(() => {
        let validationStatus = false;
        const numbers = text.replace(/\D+/g, "");
        if (numbers.length === 11) {
            validationStatus = true;
        } else if (numbers.length === 14) {
            validationStatus = true;
        }
        if (onValidation) onValidation(validationStatus);
    }, [text]);

    const handleFocus = () => {
        labelRef.current.transitionTo({ translateY: -20, color: "#7b4e4e", fontSize: 15 }, 800);
    };

    const handleBlur = () => {
        if (text.length === 0) {
            labelRef.current.transitionTo({ translateY: 0, color: "grey", fontSize: 17 }, 300);
        }
    };

    const clearInput = () => {
        setText("");
        textInputRef.current.clear();
        labelRef.current.transitionTo({ translateY: 0, color: "grey", fontSize: 17 }, 300);
    };

    return (
        <Pressable
            style={styles.container}
            onPress={() => {
                textInputRef.current.focus();
            }}>
            <Animatable.Text ref={labelRef} style={[styles.label, { color: "grey" }]} animation="fadeIn" duration={300}>
                {label}
            </Animatable.Text>
            <MaskInput
                ref={textInputRef}
                onFocus={handleFocus}
                onBlur={handleBlur}
                style={styles.textInput}
                keyboardType="number-pad"
                returnKeyType="done"
                keyboardAppearance="light"
                secureTextEntry={true}
                autoFocus
                onChangeText={value => setText(value)}
                mask={text => {
                    if (text.replace(/\D+/g, "").length <= 11) {
                        return Masks.BRL_CPF;
                    } else {
                        return Masks.BRL_CNPJ;
                    }
                }}
                value={text}
            />
            {text.length > 0 && clearable && (
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
        bottom: 16,
        fontSize: 17,
    },
    textInput: {
        marginTop: 18,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: "#ec0200",
        color: "#000",
    },
});
