import React from "react";
import { BaseText, BaseTextContainer, ButtonContainer, MiddleContainer, OuterContainer, TopHeader } from "./styles";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import { ActionButton } from "@/components/Buttons/Action/ActionButton";
import { SantaInputPhone } from "@/components/SantaInput-Phone";
import { useStores } from "@/models";
import { useNavigation } from "@react-navigation/native";
import { PhoneScreenNavigationProp } from "@/@types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const PhoneScreen = observer(function () {
    const [text, setText] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);

    const { setup } = useStores();
    const navigation = useNavigation<PhoneScreenNavigationProp>();
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
                    <BaseText>Qual o celular de quem vai receber?</BaseText>
                </BaseTextContainer>
                <SantaInputPhone label="Celular" text={text} setText={setText} onValidation={setIsValid} />
            </MiddleContainer>
            <ButtonContainer>
                <ActionButton onPress={setPix} text="Continuar" disabled={!isValid} />
            </ButtonContainer>
        </OuterContainer>
    );
});
