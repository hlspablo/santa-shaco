import React from "react";
import { useScreen, BreakpointValues, rem, getNearestBreakpointValue, validateMediaQuery } from "responsive-native";
import { DefaultTheme, ThemeProvider as StyledThemeProvider } from "styled-components";
import { scale, moderateScale, verticalScale, moderateVerticalScale } from "react-native-size-matters";
import { Query } from "@/@interfaces/themes";
import { FlocThemeLight } from "@/theme/light";

interface ThemeProviderProps {
    children: React.ReactNode;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function ThemeProvider({ children }: ThemeProviderProps) {
    const { breakpoint, padding, baseFontSize, fontScaleFactor } = useScreen();

    const theme = React.useMemo<DefaultTheme>((): DefaultTheme => {
        return {
            ...FlocThemeLight,
            scale: {
                s: (size: number) => {
                    return scale(size);
                },
                ms: (size: number, factor?: number) => {
                    return moderateScale(size, factor);
                },
                vs: (size: number) => {
                    return verticalScale(size);
                },
                mvs: (size: number, factor?: number) => {
                    return moderateVerticalScale(size, factor);
                },
            },
            screen: {
                breakpoint,
                padding,
                rem: (size: number, shouldScale?: boolean) => {
                    return rem({
                        size,
                        shouldScale,
                        baseFontSize,
                        fontScaleFactor,
                    });
                },
                breakpointValue: (values: BreakpointValues) => {
                    return getNearestBreakpointValue({
                        breakpoint: breakpoint.size,
                        values,
                    });
                },
                mediaQuery: ({ minBreakpoint, maxBreakpoint, platform }: Query) => {
                    return validateMediaQuery({
                        minBreakpoint,
                        maxBreakpoint,
                        platform,
                        currentBreakpoint: breakpoint.size,
                    });
                },
            },
        };
    }, [breakpoint, padding, baseFontSize, fontScaleFactor]);

    return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
