import styled from "styled-components/native";

export const TopHeader = styled.View<{ height: number }>`
    height: ${props => props.height}px;
    background-color: #ba261a;
`;
export const OuterContainer = styled.View`
    background-color: #fff;
    flex: 1;
`;
export const MiddleContainer = styled.View`
    flex: 1;
`;
export const BaseText = styled.Text`
    font-size: 20px;
    color: #000;
`;
export const RowContainer = styled.Pressable`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
`;
export const RowText = styled.Text`
    font-size: 18px;
    color: #000;
    margin-left: 12px;
`;
export const LeftContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const HintText = styled.Text`
    font-size: 16px;
    color: gray;
    margin-left: 59px;
    top: -10px;
`;
export const BaseTextContainer = styled.View`
    padding: 32px 20px;
`;
