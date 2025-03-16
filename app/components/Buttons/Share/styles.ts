import styled from "styled-components/native";

export const ButtonText = styled.Text<{ disabled?: boolean }>`
    font-size: 20px;
    color: #ec0200;
`;
export const MainContainer = styled.Pressable`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 55px;
    background-color: #fefefe;
    border: 1px solid #ec0200;
    border-radius: 5px;
`;
