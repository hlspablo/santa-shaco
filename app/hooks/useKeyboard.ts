import { useEffect, useState } from "react";
import { KeyboardEventListener, KeyboardEvent, Keyboard, Platform } from "react-native";
import Animated, { useSharedValue, withTiming } from "react-native-reanimated";
//import AndroidKeyboardAdjust from "react-native-android-keyboard-adjust";

type KeyboardHookResult = {
    paddingBottom: Animated.SharedValue<number>;
    opacity: Animated.SharedValue<number>;
    keyboardWillShown: boolean;
};

export function useKeyboard(): KeyboardHookResult {
    const [willShown, setWillShown] = useState(false);
    const opacity = useSharedValue(1);
    const paddingBottom = useSharedValue(0);

    const keyboardWillShow: KeyboardEventListener = (event: KeyboardEvent) => {
        setWillShown(true);
        paddingBottom.value = withTiming(event.endCoordinates.height, {
            duration: Platform.select({
                ios: event.duration,
                android: 250,
            }),
        });
    };
    const keyboardWillHide: KeyboardEventListener = (event: KeyboardEvent) => {
        setWillShown(false);
        paddingBottom.value = withTiming(0, {
            duration: Platform.select({
                ios: event.duration,
                android: 250,
            }),
        });
    };

    const keyboardDidShow: KeyboardEventListener = (event: KeyboardEvent) => {
        opacity.value = withTiming(0, {
            duration: Platform.select({
                ios: event.duration,
                android: 250,
            }),
        });
    };

    const keyboardDidHide: KeyboardEventListener = (event: KeyboardEvent) => {
        opacity.value = withTiming(1, {
            duration: Platform.select({
                ios: event.duration,
                android: 250,
            }),
        });
    };

    useEffect(() => {
        const keyboardWillShowEvent = Keyboard.addListener("keyboardWillShow", keyboardWillShow);
        const keyboardWillHideEvent = Keyboard.addListener("keyboardWillHide", keyboardWillHide);
        const keyboardDidShowEvent = Keyboard.addListener("keyboardDidShow", keyboardDidShow);
        const keyboardDidHideEvent = Keyboard.addListener("keyboardDidHide", keyboardDidHide);
        return () => {
            keyboardWillShowEvent.remove();
            keyboardWillHideEvent.remove();
            keyboardDidShowEvent.remove();
            keyboardDidHideEvent.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return {
        keyboardWillShown: willShown,
        opacity,
        paddingBottom,
    };
}

export function useKeyboardDisplayNothing(): void {
    // TODO Solve keyboard problem
    // useEffect(() => {
    //     if (Platform.OS === "android") AndroidKeyboardAdjust.setAdjustNothing();
    //     return () => {
    //         if (Platform.OS === "android") AndroidKeyboardAdjust.setAdjustResize();
    //     };
    // }, []);
}
