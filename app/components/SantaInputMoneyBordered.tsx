import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import CurrencyInput from 'react-native-currency-input';
import AntIcon from 'react-native-vector-icons/AntDesign';

interface SantaInputBorderedProps {
  label: string;
  clearable?: boolean;
  value: number;
  setValue: (text: number) => void;
  onValidation?: (valid: boolean) => void;
}

const isValidValue = (value: number): boolean => {
  return value > 0;
};

export const SantaInputMoneyBordered = ({
  label = '',
  clearable = true,
  value = 0,
  setValue,
  onValidation,
}: SantaInputBorderedProps) => {
  const textInputRef = React.useRef<any>(null);

  React.useEffect(() => {
    let validationStatus = false;
    validationStatus = isValidValue(value);
    if (onValidation) onValidation(validationStatus);
  }, [value]);

  const clearInput = () => {
    setValue(0);
    if (textInputRef.current) {
      textInputRef.current.clear();
    }
  };

  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={styles.inputContainer}
        onPress={() => {
          if (textInputRef.current) {
            textInputRef.current.focus();
          }
        }}>
        <CurrencyInput
          ref={textInputRef}
          value={value}
          onChangeValue={setValue}
          prefix="R$ "
          delimiter="."
          separator=","
          precision={2}
          style={styles.textInput}
          keyboardAppearance="light"
          returnKeyType="done"
          minValue={0}
          placeholder={label}
        />
        {value > 0 && clearable && (
          <Pressable style={styles.clearIcon} onPress={clearInput}>
            <AntIcon name="close" size={24} color="#ec0200" />
          </Pressable>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    height: 55,
    backgroundColor: '#fff',
  },
  textInput: {
    fontSize: 20,
    color: '#000',
    flex: 1,
    padding: 0,
  },
  clearIcon: {
    padding: 5,
  },
});
