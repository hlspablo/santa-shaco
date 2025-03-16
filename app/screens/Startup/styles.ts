import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
    background-color: #e6eaed;
`;
export const TopHeader = styled.View<{ height: number }>`
    height: ${props => props.height}px;
    background-color: #ba261a;
`;
