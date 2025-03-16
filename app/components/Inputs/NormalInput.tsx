import React, { forwardRef } from "react";
import { MainContainer, ErrorText, InputLabel, RadiusWrapper, StyledTextInput } from "./styles";
import { TextInput, TextStyle } from "react-native";
import { useTheme } from "styled-components/native";
import { observer } from "mobx-react-lite";
import { MaskInputProps } from "react-native-mask-input";

export interface NormalInputProps extends MaskInputProps {
    errorMessage?: string;
    labelText?: string;
    containerStyle?: TextStyle;
}

export const NormalInput = observer(
    forwardRef<TextInput, NormalInputProps>(function (props, ref) {
        const { colors } = useTheme();
        const { errorMessage, labelText, containerStyle } = props;
        return (
            <MainContainer style={containerStyle}>
                <RadiusWrapper>
                    {labelText && <InputLabel>{labelText}</InputLabel>}
                    <StyledTextInput {...props} ref={ref} placeholderTextColor={colors.placeholderColor} />
                </RadiusWrapper>
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            </MainContainer>
        );
    }),
);
