import styled from "styled-components/native";
import MaskInput from "react-native-mask-input";
import CurrencyInput from "react-native-currency-input";

export const MainContainer = styled.View``;
export const StyledTextInput = styled(MaskInput)`
    font-family: "SFUIText-SemiBold";
    width: 100%;
    height: ${({ theme }) => theme.scale.mvs(40, 0.25)}px;
    font-size: ${({ theme }) => theme.screen.rem(1)}px;
    background-color: ${({ theme }) => theme.colors.whiteBgColor};
    color: ${({ theme }) => theme.colors.inputTextColor};
    padding-left: 20px;
`;
export const StyledCurrencyTextInput = styled(CurrencyInput)`
    font-family: "SFUIText-SemiBold";
    width: 100%;
    height: ${({ theme }) => theme.scale.mvs(40, 0.25)}px;
    font-size: ${({ theme }) => theme.screen.rem(1)}px;
    background-color: ${({ theme }) => theme.colors.whiteBgColor};
    color: ${({ theme }) => theme.colors.inputTextColor};
    padding-left: 20px;
`;
export const InputError = styled.Text`
    font-family: "SFUIText-SemiBold";
    font-size: ${({ theme }) => theme.screen.rem(theme.fontSizes.inputError)}px;
    color: ${({ theme }) => theme.colors.inputErrorColor};
    margin-top: 6px;
    margin-right: 10px;
    text-align: right;
`;

export const ErrorText = styled.Text`
    font-family: "SFUIText-SemiBold";
    font-size: ${({ theme }) => theme.screen.rem(theme.fontSizes.inputError)}px;
    color: ${({ theme }) => theme.colors.inputErrorColor};
    margin-top: 8px;
    margin-left: 10px;
`;
export const InputLabel = styled.Text`
    font-family: "SFUIText-SemiBold";
    font-size: ${({ theme }) => theme.screen.rem(theme.fontSizes.inputLabel)}px;
    color: ${({ theme }) => theme.colors.inputTextColor};
    background-color: ${({ theme }) => theme.colors.whiteBgColor};
    padding-left: 20px;
    padding-top: 8px;
`;
export const RadiusWrapper = styled.View`
    border-radius: ${({ theme }) => theme.sizes.borderRadius}px;
    overflow: hidden;
`;
