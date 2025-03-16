import styled from "styled-components/native";

export const TopHeader = styled.View<{ height: number }>`
    height: ${props => props.height}px;
    background-color: #ba261a;
`;
export const OuterContainer = styled.ScrollView`
    background-color: #ffffff;
    flex: 1;
`;
export const MiddleContainer = styled.View``;
export const BaseText = styled.Text`
    font-size: 20px;
    color: #000;
`;
export const BaseTextContainer = styled.View`
    padding: 32px 20px;
`;
export const ButtonContainer = styled.View`
    flex: 1;
    justify-content: flex-end;
    padding-bottom: 40px;
    padding-horizontal: 25px;
`;
