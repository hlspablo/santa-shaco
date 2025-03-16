import React from "react";
import { MainContainer, ButtonText } from "./styles";
import { observer } from "mobx-react-lite";

interface ActionButtonProps {
    text: string;
    disabled?: boolean;
    onPress?: () => void;
}

export const ActionButton = observer(function ({ text, disabled, onPress }: ActionButtonProps) {
    return (
        <MainContainer onPress={onPress} disabled={disabled}>
            <ButtonText disabled={disabled}>{text}</ButtonText>
        </MainContainer>
    );
});
