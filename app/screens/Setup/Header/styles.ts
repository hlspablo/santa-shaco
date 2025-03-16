import styled from "styled-components/native";

export const RowContainer = styled.View`
    flex-direction: row;
    align-items: center;
    padding-vertical: 16px;
    background-color: #f0f1f5;
`;
export const TopHeader = styled.View<{ height: number }>`
    height: ${props => props.height}px;
    background-color: #ba261a;
`;
