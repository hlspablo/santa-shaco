import styled from "styled-components/native";

export const SectionText = styled.Text`
    font-family: "SFUIText-SemiBold";
    font-size: ${({ theme }) => theme.screen.rem(1)}px;
    color: #0a0b0d;
    margin-bottom: 10px;
    text-align: center;
`;
export const InputItem = styled.View`
    margin-bottom: 14px;
`;
export const FormContainer = styled.View`
    padding: 30px;
`;
export const Container = styled.ScrollView`
    background-color: #f0f1f5;
    flex: 1;
`;
export const ButtonContainer = styled.View`
    padding-bottom: 30px;
    padding-horizontal: 30px;
`;
