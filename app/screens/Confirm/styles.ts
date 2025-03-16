import styled from "styled-components/native";

export const TopHeader = styled.View<{ height: number }>`
    height: ${props => props.height}px;
    background-color: #ba261a;
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
export const ButtonContainer = styled.View`
    flex: 1;
    justify-content: flex-end;
    padding: 0px 25px;
    padding-bottom: 40px;
`;
export const SquareContainer = styled.View`
    padding: 20px 20px;
    justify-content: center;
`;
export const Square = styled.View`
    width: 95%;
    height: 120px;
    border: 1px solid gray;
    border-radius: 5px;
    justify-content: center;
    padding: 0 15px;
`;
export const RowContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;
export const RoundContainer = styled.View`
    width: 35px;
    height: 35px;
    border-radius: 50px;
    background-color: #fefefe;
    justify-content: center;
    align-items: center;
`;
export const OuterRoundContainer = styled.View`
    width: 45px;
    height: 45px;
    border-radius: 50px;
    background-color: #9b9b9b;
    justify-content: center;
    align-items: center;
`;
export const LabelTextContainer = styled.View`
    flex: 1;
    margin-left: 15px;
`;
export const LabelText2 = styled.Text`
    font-size: 16px;
    color: gray;
`;
export const LabelText = styled.Text`
    font-size: 16px;
    color: gray;
`;
export const RowWrapper = styled.View`
    margin-top: 15px;
`;

export const ValueText = styled.Text`
    font-size: 25px;
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
