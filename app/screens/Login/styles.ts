import styled from "styled-components/native";

export const Container = styled.ScrollView`
    flex: 1;
    background-color: #e6eaed;
`;
export const TopHeader = styled.View<{ height: number }>`
    height: ${props => props.height}px;
    background-color: #ba261a;
`;
export const InputContainer = styled.View`
    flex-direction: column;
    background-color: #fff;
`;
export const BottomContainer = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: #fff;
    padding: 0px 16px;
    padding-bottom: 28px;
    justify-content: flex-end;
`;
