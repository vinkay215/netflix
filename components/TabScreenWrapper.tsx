import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Animated, {
    useAnimatedStyle,
    withTiming,
    useSharedValue,
    withSpring,
    runOnJS
} from 'react-native-reanimated';
import { usePathname, useNavigation } from 'expo-router';

interface Props {
    children: React.ReactNode;
    isActive: boolean;
    slideDirection: 'left' | 'right';
}

export function TabScreenWrapper({ children, isActive, slideDirection }: Props) {
    const navigation = useNavigation();
    const [hasInitialized, setHasInitialized] = useState(false);

    // Only animate if it's a tab navigation
    var shouldAnimate = false;
    const state = navigation.getState();
    const currentRoute = state.routes[state.index].name;
    const previousRoute = state.index > 0 ? state.routes[state.index - 1].name : null;
    // console.log('Current route:', currentRoute);
    // console.log('Previous route:', previousRoute);
    const possibleRoutes = ['new', 'index', '(profile)/profile', null];
    if (possibleRoutes.includes(currentRoute) && possibleRoutes.includes(previousRoute)) {
        shouldAnimate = true;
    }


    // return <>{children}</>


    //This is no longer needed because of the expo-router 4, so return just children for upcoming react navigation 

    if (!shouldAnimate) {
        return <>{children}</>;
    }

    const translateX = useSharedValue(isActive ? 0 : (slideDirection === 'left' ? -25 : 25));
    const opacity = useSharedValue(isActive ? 1 : 0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        // Trigger initial animation
        if (!hasInitialized && isActive) {
            translateX.value = slideDirection === 'left' ? -25 : 25;
            opacity.value = 0;
            setHasInitialized(true);
        }

        setIsAnimating(true);
        if (isActive) {
            translateX.value = withSpring(0, {
                damping: 25,
                stiffness: 120,
                mass: 0.4
            }, () => {
                runOnJS(setIsAnimating)(false);
            });
            opacity.value = withTiming(1, { duration: 100 });
        } else {
            translateX.value = withSpring(slideDirection === 'left' ? -25 : 25, {
                damping: 25,
                stiffness: 120,
                mass: 0.4
            });
            opacity.value = withTiming(0, { duration: 100 }, () => {
                runOnJS(setIsAnimating)(false);
            });
        }
    }, [isActive, slideDirection]);

    const animatedStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        width: '100%',
        height: '100%',
        transform: [{ translateX: translateX.value }],
        opacity: opacity.value,
    }));

    return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
            <Animated.View style={[{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
            }, isAnimating ? animatedStyle : null]}>
                {children}
            </Animated.View>
        </View>
    );
} 