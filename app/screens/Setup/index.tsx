import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Masks } from 'react-native-mask-input';
import * as z from 'zod';

import { Header } from './Header';
import { ButtonContainer, Container, FormContainer, InputItem, SectionText } from './styles';

import { SetupScreenNavigationProp } from '@/@types/navigation';
import { ActionButton } from '@/components/Buttons/Action/ActionButton';
import { NormalInput } from '@/components/Inputs';
import { MoneyInput } from '@/components/Inputs/MoneyInput';
import { useSetup } from '@/store/hooks';

type PhoneNumberForm = {
  ownerName: string;
  ownerAgency: string;
  ownerAccount: string;
  ownerCPF: string;
  ownerBank: string;
  ownerCard: string;
  balance: number;
  clientName: string;
  clientPix: string;
  clientCPF: string;
  clientBank: string;
};
const schema = z.object({
  ownerName: z.string({
    required_error: 'Informe o nome do titular',
  }),
  ownerAgency: z
    .string({
      required_error: 'Agência obrigatória',
    })
    .min(4, 'Informe a agência'),
  ownerAccount: z
    .string({
      required_error: 'Conta obrigatória',
    })
    .min(8, 'Informe a conta'),
  ownerCPF: z
    .string({
      required_error: 'CPF obrigatório',
    })
    .min(14, 'Informe o CPF completo'),
  ownerBank: z.string({
    required_error: 'Informe o nome do titular',
  }),
  ownerCard: z
    .string({
      required_error: 'Informe os 4 dígitos do cartão',
    })
    .min(4, 'Informe os 4 dígitos do cartão'),
  balance: z
    .number({
      required_error: 'Informe o saldo',
    })
    .min(1, 'Informe o saldo em conta'),
  clientName: z.string({
    required_error: 'Informe o nome do recebedor',
  }),
  clientPix: z.string({
    required_error: 'Informe a chave Pix',
  }),
  clientCPF: z
    .string({
      required_error: 'Informe o CPF do recebedor',
    })
    .min(14, 'Informe o CPF completo'),
  clientBank: z.string({
    required_error: 'Informe o banco do recebedor',
  }),
});

const agencyMask = [/\d/, /\d/, /\d/, /\d/];
const accountMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
const cardMask = [/\d/, /\d/, /\d/, /\d/];

export const SetupScreen = function () {
  const { setup } = useSetup();
  const navigation = useNavigation<SetupScreenNavigationProp>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneNumberForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      ownerName: setup.ownerName,
      ownerAgency: setup.ownerAgency,
      ownerAccount: setup.ownerAccount,
      ownerCPF: setup.ownerCPF,
      ownerBank: setup.ownerBank,
      ownerCard: setup.ownerCard,
      balance: setup.balance,
      clientName: setup.clientName,
      clientPix: setup.clientPix,
      clientCPF: setup.clientCPF,
      clientBank: setup.clientBank,
    },
  });

  const onSubmit = (data: PhoneNumberForm) => {
    setup.setSetupData(data);
    navigation.navigate('StartupScreen');
  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }} enabled={Platform.OS === 'ios'}>
      <Container bounces={false}>
        <Header />
        <SectionText>Dados do Pagador</SectionText>
        <FormContainer>
          <InputItem>
            <Controller
              name="ownerName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="Nome Completo"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="default"
                  onChangeText={onChange}
                  placeholder="Nome Completo"
                  errorMessage={errors.ownerName?.message}
                />
              )}
            />
          </InputItem>
          <InputItem>
            <Controller
              name="ownerAgency"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="Agência"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  placeholder="Agência"
                  errorMessage={errors.ownerAgency?.message}
                  mask={agencyMask}
                />
              )}
            />
          </InputItem>
          <InputItem>
            <Controller
              name="ownerAccount"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="Conta"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  placeholder="Conta"
                  errorMessage={errors.ownerAccount?.message}
                  mask={accountMask}
                />
              )}
            />
          </InputItem>
          <InputItem>
            <Controller
              name="ownerCPF"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="CPF"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  placeholder="CPF"
                  errorMessage={errors.ownerCPF?.message}
                  mask={Masks.BRL_CPF}
                />
              )}
            />
          </InputItem>
          <InputItem>
            <Controller
              name="ownerBank"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="Instituição Bancária"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="default"
                  onChangeText={onChange}
                  placeholder="Instituição Bancária"
                  errorMessage={errors.ownerBank?.message}
                />
              )}
            />
          </InputItem>
          <InputItem>
            <Controller
              name="ownerCard"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="4 Digitos do Cartão"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  placeholder="4 Digitos do Cartão"
                  errorMessage={errors.ownerCard?.message}
                  mask={cardMask}
                />
              )}
            />
          </InputItem>
          <InputItem>
            <Controller
              name="balance"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <MoneyInput
                  labelText="Saldo em Conta"
                  prefix="R$ "
                  delimiter="."
                  separator=","
                  precision={2}
                  minValue={0}
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="number-pad"
                  onChangeValue={onChange}
                  placeholder="Saldo em Conta"
                  errorMessage={errors.balance?.message}
                />
              )}
            />
          </InputItem>
          <SectionText>Dados do Recebedor</SectionText>
          <InputItem>
            <Controller
              name="clientName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="Nome Completo"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="default"
                  onChangeText={onChange}
                  placeholder="Nome Completo"
                  errorMessage={errors.clientName?.message}
                />
              )}
            />
          </InputItem>
          <InputItem>
            <Controller
              name="clientCPF"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="CPF"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="number-pad"
                  onChangeText={onChange}
                  placeholder="CPF"
                  errorMessage={errors.clientCPF?.message}
                  mask={Masks.BRL_CPF}
                />
              )}
            />
          </InputItem>
          <InputItem>
            <Controller
              name="clientBank"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <NormalInput
                  labelText="Instituição Bancária"
                  value={value}
                  onBlur={onBlur}
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoComplete="off"
                  keyboardType="default"
                  onChangeText={onChange}
                  placeholder="Instituição Bancária"
                  errorMessage={errors.clientBank?.message}
                />
              )}
            />
          </InputItem>
        </FormContainer>
      </Container>
      <ButtonContainer>
        <ActionButton text="Salvar" onPress={handleSubmit(onSubmit)} />
      </ButtonContainer>
    </KeyboardAvoidingView>
  );
};
