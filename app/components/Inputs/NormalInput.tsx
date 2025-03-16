import { forwardRef } from 'react';
import { TextInput, TextStyle } from 'react-native';
import { MaskInputProps } from 'react-native-mask-input';
import { useTheme } from 'styled-components/native';

import { MainContainer, ErrorText, InputLabel, RadiusWrapper, StyledTextInput } from './styles';

export interface NormalInputProps extends MaskInputProps {
  errorMessage?: string;
  labelText?: string;
  containerStyle?: TextStyle;
}

export const NormalInput = forwardRef<TextInput, NormalInputProps>(function (props, ref) {
  const { colors } = useTheme();
  const { errorMessage, labelText, containerStyle } = props;
  return (
    <MainContainer style={containerStyle}>
      <RadiusWrapper>
        {labelText && <InputLabel>{labelText}</InputLabel>}
        <StyledTextInput {...props} ref={ref} placeholderTextColor={colors.placeholderColor} />
      </RadiusWrapper>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </MainContainer>
  );
});
