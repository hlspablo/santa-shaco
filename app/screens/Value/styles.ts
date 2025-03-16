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
export const ClientNameText = styled.Text`
    font-size: 20px;
    color: #000;
    font-weight: bold;
    text-transform: uppercase;
    margin-top: 20px;
`;
export const GrayText = styled.Text`
    font-size: 16px;
    color: gray;
    margin-top: 4px;
`;
export const RowContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 0px 20px;
    padding-bottom: 20px;
`;
export const BaseText2 = styled.Text`
    font-size: 18px;
    color: #000;
    margin-left: 12px;
`;
export const AddInfoText = styled.Text`
    font-size: 18px;
    color: #ba261a;
    margin-top: 30px;
    margin-bottom: 40px;
    text-decoration-line: underline;
`;
export const BottomContainer = styled.View`
    padding: 0px 20px;
`;
export const OuterSquareContainer = styled.View`
    padding: 0px 20px;
    padding-bottom: 30px;
    background-color: #f4f4f4;
`;
export const SquareContainer = styled.View`
    justify-content: center;
    align-items: center;
`;
export const Square = styled.View`
    width: 90%;
    height: 210px;
    border: 1.3px solid #ba261a;
    border-radius: 5px;
    background-color: #ffffff;
    padding: 20px 20px;
`;
export const BaseText3 = styled.Text`
    font-size: 20px;
    color: #000;
    margin-top: 12px;
    margin-bottom: 20px;
`;
export const DotContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 20px;
`;
export const RoundRedRot = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 50px;
    background-color: #ba261a;
    margin-right: 5px;
`;
export const LogoRowContainer = styled.View`
    flex-direction: row;
`;
export const LogoTextContainer = styled.View`
    margin-left: 10px;
`;
export const CCText = styled.Text`
    font-size: 19px;
    color: gray;
    margin-bottom: 5px;
`;
export const AGText = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #000;
`;
export const DividerPadding = styled.View`
    padding: 12px 0px;
`;
export const SquareBottomContainer = styled.View`
    flex: 1;
    justify-content: space-around;
`;
export const BalanceRowContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
export const BalaceLabelText = styled.Text`
    font-size: 18px;
    color: gray;
`;
export const BalanceValueText = styled.Text`
    font-size: 18px;
    color: #000;
`;
export const PaymentContainer = styled.View`
    padding: 12px 20px;
    padding-bottom: 40px;
`;
export const BookRowContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`;
export const BookText = styled.Text`
    font-size: 18px;
    color: #ba261a;
`;
export const SwitchContainer = styled.View`
    width: 60px;
    height: 30px;
    background-color: #cecece;
    border-radius: 20px;
    justify-content: center;
`;
