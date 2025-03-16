import React from "react";
import { BaseText, BaseTextContainer, ButtonContainer, MiddleContainer, OuterContainer, TopHeader } from "./styles";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import { SantaInputCPF } from "@/components/SantaInput-Cpf";
import { ActionButton } from "@/components/Buttons/Action/ActionButton";
import { useStores } from "@/models";
import { useNavigation } from "@react-navigation/native";
import { CPFScreenNavigationProp } from "@/@types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const CPFScreen = observer(function () {
    const [text, setText] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);
    const { setup } = useStores();
    const navigation = useNavigation<CPFScreenNavigationProp>();
    const insets = useSafeAreaInsets();

    function setPix() {
        if (isValid) {
            setup.setSetupData({ ...setup, clientPix: text });
            navigation.navigate("ValueScreen");
        }
    }

    return (
        <OuterContainer
            contentContainerStyle={{
                flex: 1,
            }}>
            <TopHeader height={insets.top} />
            <Header title="Pagar" onPress={navigation.goBack} />
            <MiddleContainer>
                <BaseTextContainer>
                    <BaseText>Qual o CPF ou CNPJ de quem vai receber?</BaseText>
                </BaseTextContainer>
                <SantaInputCPF label="CPF ou CNPJ" text={text} setText={setText} onValidation={setIsValid} />
            </MiddleContainer>
            <ButtonContainer>
                <ActionButton onPress={setPix} text="Continuar" disabled={!isValid} />
            </ButtonContainer>
        </OuterContainer>
    );
});
