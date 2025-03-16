import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  StartupScreen: undefined;
  LoginScreen: undefined;
  MainScreen: undefined;
  MethodScreen: undefined;
  ContactScreen: undefined;
  SelectScreen: undefined;
  CPFScreen: undefined;
  PhoneScreen: undefined;
  EmailScreen: undefined;
  ValueScreen: undefined;
  ConfirmScreen: undefined;
  SuccessScreen: undefined;
  VoucherScreen: undefined;
  PrintScreen: undefined;
  SetupScreen: undefined;
  PixTransferScreen: undefined;
};

export type SetupScreenProp = RouteProp<RootStackParamList, 'SetupScreen'>;
export type SetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SetupScreen'>;

export type PrintScreenProp = RouteProp<RootStackParamList, 'PrintScreen'>;
export type PrintScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PrintScreen'>;

export type VoucherScreenProp = RouteProp<RootStackParamList, 'VoucherScreen'>;
export type VoucherScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VoucherScreen'>;

export type SuccessScreenProp = RouteProp<RootStackParamList, 'SuccessScreen'>;
export type SuccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SuccessScreen'>;

export type ConfirmScreenProp = RouteProp<RootStackParamList, 'ConfirmScreen'>;
export type ConfirmScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ConfirmScreen'>;

export type ValueScreenProp = RouteProp<RootStackParamList, 'ValueScreen'>;
export type ValueScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ValueScreen'>;

export type EmailScreenProp = RouteProp<RootStackParamList, 'EmailScreen'>;
export type EmailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EmailScreen'>;

export type PhoneScreenProp = RouteProp<RootStackParamList, 'PhoneScreen'>;
export type PhoneScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PhoneScreen'>;

export type CPFScreenProp = RouteProp<RootStackParamList, 'CPFScreen'>;
export type CPFScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CPFScreen'>;

export type ContactScreenProp = RouteProp<RootStackParamList, 'ContactScreen'>;
export type ContactScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ContactScreen'>;

export type LoginScreenProp = RouteProp<RootStackParamList, 'LoginScreen'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

export type StartupScreenProp = RouteProp<RootStackParamList, 'StartupScreen'>;
export type StartupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'StartupScreen'>;

export type MainScreenProp = RouteProp<RootStackParamList, 'MainScreen'>;
export type MainScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainScreen'>;

export type MethodScreenProp = RouteProp<RootStackParamList, 'MethodScreen'>;
export type MethodScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MethodScreen'>;

export type SelectScreenProp = RouteProp<RootStackParamList, 'SelectScreen'>;
export type SelectScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SelectScreen'>;

export type PixTransferScreenProp = RouteProp<RootStackParamList, 'PixTransferScreen'>;
export type PixTransferScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PixTransferScreen'
>;
