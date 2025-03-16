import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ScreenProvider } from "responsive-native";
import { ThemeProvider } from "@/context";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationRef } from "./navigationUtilities";
import { observer } from "mobx-react-lite";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "@/@types/navigation";
import { StartupScreen } from "@/screens/Startup";
import { LoginScreen } from "@/screens/Login";
import { MainScreen } from "@/screens/Main";
import { MethodScreen } from "@/screens/Method";
import { ContactScreen } from "@/screens/Contact";
import { SelectScreen } from "@/screens/Select";
import { CPFScreen } from "@/screens/Cpf";
import { PhoneScreen } from "@/screens/Phone";
import { EmailScreen } from "@/screens/Email";
import { ValueScreen } from "@/screens/Value";
import { ConfirmScreen } from "@/screens/Confirm";
import { SuccessScreen } from "@/screens/Success";
import { VoucherScreen } from "@/screens/Voucher";
import { PrintScreen } from "@/screens/Print";
import { SetupScreen } from "@/screens/Setup";

const InStack = createStackNavigator<RootStackParamList>();

type NavigationProps = Partial<React.ComponentProps<typeof NavigationContainer>>;

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
    return (
        <SafeAreaProvider>
            <ScreenProvider baseFontSize={16}>
                <ThemeProvider>
                    <NavigationContainer ref={navigationRef} {...props}>
                        <InStack.Navigator
                            initialRouteName="StartupScreen"
                            screenOptions={{
                                headerShown: false,
                            }}>
                            <InStack.Screen name="StartupScreen" component={StartupScreen} />
                            <InStack.Screen name="LoginScreen" component={LoginScreen} />
                            <InStack.Screen name="MainScreen" component={MainScreen} />
                            <InStack.Screen name="MethodScreen" component={MethodScreen} />
                            <InStack.Screen name="ContactScreen" component={ContactScreen} />
                            <InStack.Screen name="SelectScreen" component={SelectScreen} />
                            <InStack.Screen name="CPFScreen" component={CPFScreen} />
                            <InStack.Screen name="PhoneScreen" component={PhoneScreen} />
                            <InStack.Screen name="EmailScreen" component={EmailScreen} />
                            <InStack.Screen name="ValueScreen" component={ValueScreen} />
                            <InStack.Screen name="ConfirmScreen" component={ConfirmScreen} />
                            <InStack.Screen name="SuccessScreen" component={SuccessScreen} />
                            <InStack.Screen name="VoucherScreen" component={VoucherScreen} />
                            <InStack.Screen name="PrintScreen" component={PrintScreen} />
                            <InStack.Screen name="SetupScreen" component={SetupScreen} />
                        </InStack.Navigator>
                    </NavigationContainer>
                </ThemeProvider>
            </ScreenProvider>
        </SafeAreaProvider>
    );
});
