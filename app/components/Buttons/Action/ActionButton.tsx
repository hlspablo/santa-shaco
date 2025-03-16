import { MainContainer, ButtonText } from './styles';

interface ActionButtonProps {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
}

export const ActionButton = function ({ text, disabled, onPress }: ActionButtonProps) {
  return (
    <MainContainer onPress={onPress} disabled={disabled}>
      <ButtonText disabled={disabled}>{text}</ButtonText>
    </MainContainer>
  );
};
