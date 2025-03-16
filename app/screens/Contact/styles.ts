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
    padding: 15px;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    padding-bottom: 250px;
`;
export const ContactText = styled.Text`
    font-size: 17px;
    color: #000;
`;
export const PayContactText = styled.Text`
    font-size: 18px;
    color: #ba261a;
    margin-top: 10px;
    text-decoration-line: underline;
`;
