import React from "react";
import { MainContainer, ButtonText } from "./styles";
import { observer } from "mobx-react-lite";

interface ShareButtonProps {
    text: string;
    disabled?: boolean;
    onPress?: () => void;
}

export const ShareButton = observer(function ({ text, disabled, onPress }: ShareButtonProps) {
    return (
        <MainContainer onPress={onPress} disabled={disabled}>
            <ButtonText disabled={disabled}>{text}</ButtonText>
        </MainContainer>
    );
});
