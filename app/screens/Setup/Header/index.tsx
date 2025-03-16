import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { TopHeader, RowContainer } from "./styles";
import { observer } from "mobx-react-lite";
import { useNavigation } from "@react-navigation/native";
import { SetupScreenNavigationProp } from "@/@types/navigation";
import { Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const Header = observer(function () {
    const navigation = useNavigation<SetupScreenNavigationProp>();
    const insets = useSafeAreaInsets();
    return (
        <>
            <TopHeader height={insets.top} />
            <RowContainer>
                <Pressable onPress={navigation.goBack}>
                    <Icon name="arrow-left" size={22} color="#fff" />
                </Pressable>
            </RowContainer>
        </>
    );
});
