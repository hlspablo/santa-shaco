import styled from 'styled-components/native';

export const TopHeader = styled.View<{ height: number }>`
  height: ${(props: { height: number }) => props.height}px;
  background-color: #ba261a;
`;
export const OuterContainer = styled.ScrollView`
  background-color: #fefefe;
  flex: 1;
`;
export const MiddleContainer = styled.View`
  padding: 0px 20px;
`;
export const ButtonContainer = styled.View`
  padding: 0px 25px;
  padding-bottom: 40px;
  margin-top: 20px;
`;
export const SquareContainer = styled.View`
  padding: 20px 20px;
  justify-content: center;
`;
export const Square = styled.View`
  width: 95%;
  height: 90px;
  border: 1px solid gray;
  border-radius: 5px;
  justify-content: center;
  padding: 0 15px;
`;
export const RowContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const LabelTextContainer = styled.View`
  flex: 1;
  margin-left: 15px;
`;
export const LabelText2 = styled.Text`
  font-size: 16px;
  color: gray;
`;
export const LabelText = styled.Text`
  font-size: 16px;
  color: gray;
`;
export const RowWrapper = styled.View`
  margin-top: 15px;
`;

export const ValueText = styled.Text`
  font-size: 19px;
  font-weight: bold;
  color: #000;
`;
export const SimpleText = styled.Text`
  font-size: 18px;
  color: #000;
`;
export const DividerPadding = styled.View`
  padding-top: 12px;
`;
export const SeeVoucher = styled.Text`
  font-size: 18px;
  color: #e00000;
  margin-top: 15px;
  margin-bottom: 15px;
  text-decoration-line: underline;
  text-align: center;
`;

export const PixTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #000;
`;

export const PixSubtitle = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 15px;
`;

export const NewPixButton = styled.TouchableOpacity`
  height: 55px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  border: 1px solid #e00000;
  margin-top: 15px;
`;

export const NewPixText = styled.Text`
  font-size: 18px;
  color: #e00000;
`;
