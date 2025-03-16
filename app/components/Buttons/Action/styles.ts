import styled from "styled-components/native";

export const ButtonText = styled.Text<{ disabled?: boolean }>`
    font-size: 19px;
    color: ${props => (props.disabled ? "#1d1d1d" : "#fff")};
`;
export const MainContainer = styled.Pressable<{ disabled?: boolean }>`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 55px;
    background-color: #ec0200;
    background-color: ${props => (props.disabled ? "#888b88" : "#ec0200")};
    opacity: ${props => (props.disabled ? 0.5 : 1)};
    border-radius: 5px;
`;
