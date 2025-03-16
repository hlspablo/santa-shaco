import { ScreenContextData, MediaQuery, BreakpointValues } from "responsive-native";

type ScaleHelpers = {
    s(size: number): number;
    ms(size: number, factor?: number): number;
    vs(size: number): number;
    mvs(size: number, factor?: number): number;
};
export type Query = Omit<MediaQuery, "currentBreakpoint">;
type ResponsiveScreen = Pick<ScreenContextData, "breakpoint" | "padding"> & {
    breakpointValue<T = unknown>(values: BreakpointValues): T | undefined;
    mediaQuery(query: Query): boolean;
    rem(size: number, shouldScale?: boolean): number;
};

export interface ResponsiveTheme {
    screen: ResponsiveScreen;
    scale: ScaleHelpers;
}
