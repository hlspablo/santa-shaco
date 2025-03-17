import styled from 'styled-components/native';

export const ButtonText = styled.Text<{ disabled?: boolean }>`
  font-size: 20px;
  color: #ffffff;
`;
export const MainContainer = styled.Pressable`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 55px;
  background-color: #e00000;
  border-radius: 6px;
`;
