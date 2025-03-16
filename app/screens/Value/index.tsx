import React from "react";
import Image from "react-native-fast-image";
import {
    AGText,
    AddInfoText,
    BalaceLabelText,
    BalanceRowContainer,
    BalanceValueText,
    BaseText,
    BaseText2,
    BaseText3,
    BaseTextContainer,
    BookRowContainer,
    BookText,
    BottomContainer,
    CCText,
    ClientNameText,
    DividerPadding,
    DotContainer,
    GrayText,
    LogoRowContainer,
    LogoTextContainer,
    MiddleContainer,
    OuterContainer,
    OuterSquareContainer,
    PaymentContainer,
    RoundRedRot,
    RowContainer,
    Square,
    SquareBottomContainer,
    SquareContainer,
    SwitchContainer,
    TopHeader,
} from "./styles";
import { observer } from "mobx-react-lite";
import Header from "@/components/Header";
import { ActionButton } from "@/components/Buttons/Action/ActionButton";
import { SantaInputMoney } from "@/components/SantaInput-Money";
import Divider from "@/components/Divider";
import { useStores } from "@/models";
import { addDashBeforeLast, detectAndMask, formatCurrency, maskCPF } from "@/utils/format";
import { useNavigation } from "@react-navigation/native";
import { ValueScreenNavigationProp } from "@/@types/navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ValueScreen = observer(function () {
    const [value, setValue] = React.useState(0);
    const [isValid, setIsValid] = React.useState(false);
    const {
        setup: { clientName, clientCPF, clientBank, clientPix, ownerAgency, ownerAccount, balance, setTransferValue },
    } = useStores();

    const navigation = useNavigation<ValueScreenNavigationProp>();
    const insets = useSafeAreaInsets();

    function goToConfirm() {
        setTransferValue(value);
        navigation.navigate("ConfirmScreen");
    }

    return (
        <OuterContainer bounces={false}>
            <TopHeader height={insets.top} />
            <Header title="Pagar" onPress={navigation.goBack} />
            <BaseTextContainer>
                <BaseText>Você vai pagar para</BaseText>
                <ClientNameText>{clientName.toUpperCase()}</ClientNameText>
                <GrayText>
                    CPF: {maskCPF(clientCPF)} - {clientBank.toUpperCase()}
                </GrayText>
                <GrayText>Chave: {detectAndMask(clientPix)}</GrayText>
            </BaseTextContainer>
            <RowContainer>
                <Image
                    resizeMode={Image.resizeMode.cover}
                    source={require("@assets/pages/value/ic_check_off.png")}
                    style={{ width: 25, height: 25 }}
                />
                <BaseText2>Salvar contato</BaseText2>
            </RowContainer>
            <MiddleContainer>
                <SantaInputMoney label="Valor a pagar" value={value} setValue={setValue} onValidation={setIsValid} />
            </MiddleContainer>
            <BottomContainer>
                <AddInfoText>Adicionar informações</AddInfoText>
            </BottomContainer>
            <OuterSquareContainer>
                <BaseText3>Forma de Pagamento</BaseText3>
                <SquareContainer>
                    <Square>
                        <LogoRowContainer>
                            <Image
                                resizeMode={Image.resizeMode.cover}
                                source={require("@assets/pages/value/ic_bullet_santander.png")}
                                style={{ width: 45, height: 45 }}
                            />
                            <LogoTextContainer>
                                <CCText>Conta corrente</CCText>
                                <AGText>
                                    Ag {ownerAgency} - Cc {addDashBeforeLast(ownerAccount)}
                                </AGText>
                            </LogoTextContainer>
                        </LogoRowContainer>
                        <DividerPadding>
                            <Divider />
                        </DividerPadding>
                        <SquareBottomContainer>
                            <BalanceRowContainer>
                                <BalaceLabelText>Saldo</BalaceLabelText>
                                <BalanceValueText>{formatCurrency(balance)}</BalanceValueText>
                            </BalanceRowContainer>
                            <BalanceRowContainer>
                                <BalaceLabelText>Saldo + limite</BalaceLabelText>
                                <BalanceValueText>{formatCurrency(balance)}</BalanceValueText>
                            </BalanceRowContainer>
                        </SquareBottomContainer>
                    </Square>
                </SquareContainer>
                <DotContainer>
                    <RoundRedRot />
                </DotContainer>
            </OuterSquareContainer>
            <PaymentContainer>
                <BookRowContainer>
                    <BookText>Agendar pagamento</BookText>
                    <SwitchContainer>
                        <Image
                            resizeMode={Image.resizeMode.cover}
                            source={require("@assets/pages/value/switch_off.png")}
                            style={{ width: 30, height: 30 }}
                        />
                    </SwitchContainer>
                </BookRowContainer>
                <ActionButton onPress={goToConfirm} text="Continuar" disabled={!isValid} />
            </PaymentContainer>
        </OuterContainer>
    );
});
