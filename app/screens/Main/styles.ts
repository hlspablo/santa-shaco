import { ImageBackground } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  background-color: #f4f8fb;
`;
export const TopHeader = styled.View<{ height: number }>`
  height: ${(props) => props.height}px;
  background-color: #ba261a;
`;
export const AccountAreaView = styled(ImageBackground)`
  padding-top: 16px;
  height: 135px;
`;
export const ScrollContainer = styled.View`
  top: -20px;
`;
export const ImageWrapper = styled.Pressable`
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  margin-right: 18px;
`;
export const PixRowContainer = styled.ScrollView``;
export const Spacer = styled.View`
  height: 60px;
`;
export const AccountUserText = styled.Text`
  color: #fff;
  font-size: 19px;
  margin-left: 16px;
  margin-top: 16px;
`;
export const AccountNumberText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  margin-left: 16px;
  margin-top: 8px;
`;
export const CardNumberText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  margin-left: 16px;
`;
export const CardNumberContainer = styled.View`
  position: relative;
  bottom: -25.3%;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 35%;
  width: 100%;
  z-index: 1;
`;
export const ImagesContainer = styled.View`
  top: -52px;
  padding: 0px 2px;
`;
