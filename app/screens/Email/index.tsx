import React from "react";
import { BaseText, BaseTextContainer, ButtonContainer, MiddleContainer, OuterContainer, TopHeader } from "./styles";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import { ActionButton } from "@/components/Buttons/Action/ActionButton";
import { SantaInputEmail } from "@/components/SantaInput-Email";
import { useStores } from "@/models";
import { useNavigation } from "@react-navigation/native";
import { EmailScreenNavigationProp } from "@/@types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const EmailScreen = observer(function () {
    const [text, setText] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);

    const { setup } = useStores();
    const navigation = useNavigation<EmailScreenNavigationProp>();
    const insets = useSafeAreaInsets();

    function setPix() {
        if (isValid) {
            setup.setSetupData({ ...setup, clientPix: text });
            navigation.navigate("ValueScreen");
        }
    }
    return (
        <OuterContainer
            bounces={false}
            contentContainerStyle={{
                flex: 1,
            }}>
            <TopHeader height={insets.top} />
            <Header title="Pagar" onPress={navigation.goBack} />
            <MiddleContainer>
                <BaseTextContainer>
                    <BaseText>Qual o e-mail de quem vai receber?</BaseText>
                </BaseTextContainer>
                <SantaInputEmail label="E-mail" text={text} setText={setText} onValidation={setIsValid} />
            </MiddleContainer>
            <ButtonContainer>
                <ActionButton onPress={setPix} text="Continuar" disabled={!isValid} />
            </ButtonContainer>
        </OuterContainer>
    );
});
