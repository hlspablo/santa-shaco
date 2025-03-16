import { MainContainer, ButtonText } from './styles';

interface ShareButtonProps {
  text: string;
  disabled?: boolean;
  onPress?: () => void;
}

export const ShareButton = function ({ text, disabled, onPress }: ShareButtonProps) {
  return (
    <MainContainer onPress={onPress} disabled={disabled}>
      <ButtonText disabled={disabled}>{text}</ButtonText>
    </MainContainer>
  );
};
