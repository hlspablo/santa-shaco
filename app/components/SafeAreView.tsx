import { SafeAreaView as SafeArea } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Platform } from "react-native";

export const SafeAreaView = styled(SafeArea)`
    flex: 1;
    background-color: #fcfdfd;
`;

export const SafeAreaViewStartup = styled(SafeArea).attrs(props => ({
    edges: Platform.OS === "android" ? ["bottom"] : ["left", "right"],
}))`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.primaryBgColor};
`;
