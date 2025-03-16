import React from "react";
import Image from "react-native-fast-image";
import { ContactText, MiddleContainer, OuterContainer, PayContactText, TopHeader } from "./styles";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import { useNavigation } from "@react-navigation/native";
import { ContactScreenNavigationProp } from "@/@types/navigation";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ContactScreen = observer(function () {
    const navigation = useNavigation<ContactScreenNavigationProp>();
    const insets = useSafeAreaInsets();

    function goToSelectScreen() {
        navigation.navigate("SelectScreen");
    }

    return (
        <OuterContainer>
            <TopHeader height={insets.top} />
            <Header title="Pix" onPress={navigation.goBack} />
            <MiddleContainer>
                <Image
                    source={require("@assets/pages/contact/mag.png")}
                    resizeMode={Image.resizeMode.cover}
                    style={{ width: 45, height: 45 }}
                />
                <ContactText
                    style={{
                        paddingTop: 16,
                    }}>
                    Nenhum contato
                </ContactText>
                <ContactText>
                    Você não tem nenhum contato. Salve seus contatos e tenha mais agilidade para pagar
                </ContactText>
                <Pressable onPress={goToSelectScreen}>
                    <PayContactText>Pagar novo contato</PayContactText>
                </Pressable>
            </MiddleContainer>
        </OuterContainer>
    );
});
