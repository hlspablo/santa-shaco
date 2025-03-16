import React from "react";
import { observer } from "mobx-react-lite";
import LottieView from "lottie-react-native";
import { ms } from "react-native-size-matters";
import { AnimationContainer } from "./styles";

export const LoadingComponent = observer(function () {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const randomTime = Math.random() * 1000 + 1000;

        const timerId = setTimeout(() => {
            setLoading(false);
        }, randomTime);

        return () => clearTimeout(timerId);
    }, []);

    return (
        <>
            {loading ? (
                <AnimationContainer>
                    <LottieView
                        style={{
                            height: ms(120),
                            width: ms(120),
                        }}
                        source={require("@assets/animations/loading.json")}
                        autoPlay
                        loop={true}
                    />
                </AnimationContainer>
            ) : (
                <></>
            )}
        </>
    );
});
