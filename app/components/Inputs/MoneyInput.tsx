import { forwardRef } from 'react';
import { TextInput, TextStyle } from 'react-native';
import { CurrencyInputProps } from 'react-native-currency-input';
import { useTheme } from 'styled-components/native';

import {
  MainContainer,
  ErrorText,
  InputLabel,
  RadiusWrapper,
  StyledCurrencyTextInput,
} from './styles';

export interface MoneyInputProps extends CurrencyInputProps {
  errorMessage?: string;
  labelText?: string;
  containerStyle?: TextStyle;
}

export const MoneyInput = forwardRef<TextInput, MoneyInputProps>(function (props, ref) {
  const { colors } = useTheme();
  const { errorMessage, labelText, containerStyle } = props;
  return (
    <MainContainer style={containerStyle}>
      <RadiusWrapper>
        {labelText && <InputLabel>{labelText}</InputLabel>}
        <StyledCurrencyTextInput
          {...props}
          ref={ref}
          placeholderTextColor={colors.placeholderColor}
        />
      </RadiusWrapper>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </MainContainer>
  );
});
