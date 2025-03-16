import styled from "styled-components/native";

export const TopHeader = styled.View<{ height: number }>`
    height: 30px;
    background-color: #fefefe;
`;
export const OuterContainer = styled.ScrollView`
    background-color: #fefefe;
    flex: 1;
`;
export const MiddleContainer = styled.View`
    padding: 0px 20px;
`;
export const BaseText = styled.Text`
    font-size: 20px;
    color: #000;
    margin-top: 15px;
`;
export const HeaderText = styled.Text`
    font-size: 18px;
    color: #000;
    font-weight: bold;
`;
export const HeaderContainer = styled.View`
    align-items: center;
`;

export const ButtonContainer = styled.View`
    align-items: center;
    padding-bottom: 40px;
`;
export const LabelText2 = styled.Text`
    font-size: 18px;
    color: gray;
    margin-top: 15px;
`;
export const LabelText = styled.Text`
    font-size: 16px;
    color: gray;
`;
export const RowWrapper = styled.View`
    margin-top: 15px;
`;

export const ValueText = styled.Text`
    font-size: 19px;
    font-weight: bold;
    color: #000;
`;
export const SimpleText = styled.Text`
    font-size: 18px;
    color: #000;
`;
export const DividerPadding = styled.View`
    padding-top: 12px;
`;