import { FlatList } from 'react-native';
import styled from 'styled-components/native';

export const TopHeader = styled.View<{ height: number }>`
  height: ${(props: { height: number }) => props.height}px;
  background-color: #ba261a;
`;

export const OuterContainer = styled.ScrollView`
  background-color: #fff;
  flex: 1;
`;

export const BaseText = styled.Text`
  font-size: 22px;
  margin-bottom: 12px;
  color: #000;
  padding: 15px 15px 10px 15px;
`;

export const InputContainer = styled.View`
  margin: 0 15px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  height: 56px;
  flex-direction: row;
  align-items: center;
  overflow: visible;
`;

export const Label = styled.Text`
  font-size: 17px;
  color: grey;
`;

export const SearchInput = styled.TextInput`
  height: 56px;
  font-size: 16px;
  color: #000;
  padding-top: 20px;
  padding-horizontal: 10px;
`;

export const ContactsContainer = styled.View`
  margin-top: 25px;
  padding-vertical: 15px;
  background-color: #f0f8ff;
`;

export const ContactsHeading = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  margin-bottom: 10px;
`;

export const SeeAllButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const SeeAllText = styled.Text`
  color: #000;
  font-size: 14px;
  margin-right: 5px;
`;

export const ContactList = styled(FlatList)`
  padding-vertical: 10px;
` as unknown as typeof FlatList;

export const ContactItem = styled.TouchableOpacity`
  align-items: center;
  width: 80px;
  margin-horizontal: 5px;
`;

export const CircleAvatar = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #d3d3d3;
  align-items: center;
  justify-content: center;
`;

export const InitialsText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export const ContactName = styled.Text`
  font-size: 14px;
  color: #000;
  text-align: center;
  margin-top: 5px;
`;

export const OtherOptionsTitle = styled.Text`
  font-size: 18px;
  color: #000;
  font-weight: bold;
  margin: 20px 15px 10px 15px;
`;

export const OtherOptionsContainer = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 15px;
`;

export const OtherOptionsItem = styled.TouchableOpacity`
  width: 110px;
  height: 110px;
  border-radius: 5px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: #eee;
  elevation: 1;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.18;
  shadow-radius: 1px;
  padding: 10px;
`;

export const Divider = styled.View`
  height: 1px;
  background-color: #eee;
  width: 100%;
`;

export const ButtonContainer = styled.View`
  padding: 20px;
  margin-bottom: 30px;
`;

export const ContactContainer = styled.View`
  padding: 15px;
`;
