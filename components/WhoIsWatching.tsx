import React, { useState, useRef, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Image, StatusBar, LayoutRectangle, LayoutChangeEvent } from 'react-native';
import { SafeAreaView, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    withTiming,
    Easing,
    useSharedValue,
    runOnJS,
    FadeIn,
    withSequence,
    withDelay,
    withRepeat,
    withSpring,
} from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { Ionicons } from '@expo/vector-icons';
import { useUser } from '@/contexts/UserContext';
import { Audio } from 'expo-av';
import Svg, { Circle } from 'react-native-svg';
import { styles } from '@/styles/who-is-watching';


const { width, height } = Dimensions.get('window');
const PROFILE_ICON_SIZE = 24; // Size of the profile icon in the top-right corner
const PROFILE_ICON_MARGIN = 16; // Margin from the top and right edges
const FINAL_PROFILE_SIZE = width * 0.45;
const CENTER_Y = height / 2 - FINAL_PROFILE_SIZE / 2 - 50;
const CENTER_X = (width - FINAL_PROFILE_SIZE) / 2;

interface Profile {
    id: string;
    name: string;
    avatar: string;
}

interface Props {
    onProfileSelect: (profileId: string) => void;
}

export function WhoIsWatching({ onProfileSelect }: Props) {
    const { profiles } = useUser();
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [initialLayout, setInitialLayout] = useState<LayoutRectangle | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const [isMinimizing, setIsMinimizing] = useState(false);
    const profileRefs = useRef<{ [key: string]: LayoutRectangle | null }>({});
    const spinnerRotation = useSharedValue(0);
    const [profileLayouts, setProfileLayouts] = useState<{ [key: string]: LayoutRectangle }>({});

    const containerStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withTiming(isAnimating ? 0.9 : 1, {
                    duration: 800,
                    easing: Easing.bezier(0.33, 0, 0.67, 1),
                }),
            },
        ],
        opacity: withTiming(isAnimating ? 0 : 1, {
            duration: 500,
            easing: Easing.bezier(0.33, 0, 0.67, 1),
        }),
        backgroundColor: withTiming(selectedId ? 'transparent' : '#000', {
            duration: 300,
            easing: Easing.bezier(0.33, 0, 0.67, 1),
        }),
    }));

    const spinnerStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: `${spinnerRotation.value}deg` }],
            opacity: withTiming(isMinimizing ? 0 : 1, {
                duration: 300,
                easing: Easing.bezier(0.33, 0, 0.67, 1),
            }),
        };
    });

    const handleProfileSelect = async (profile: Profile) => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/audio/profile-selected.mp3')
            );
            await sound.playAsync();

            const layout = profileLayouts[profile.id];
            if (layout) {
                setSelectedId(profile.id);
                setSelectedProfile(profile);
                setIsAnimating(true);
            }

            setTimeout(() => {
                setShowSpinner(true);
                spinnerRotation.value = withRepeat(
                    withTiming(360, {
                        duration: 1000,
                        easing: Easing.linear,
                    }),
                    -1,
                    false
                );
            }, 800);

            setTimeout(() => {
                setIsMinimizing(true);
                setTimeout(() => {
                    runOnJS(onProfileSelect)(profile.id);
                }, 500);
            }, 2000);
        } catch (error) {
            console.log('Error playing sound:', error);
        }
    };

    const handleProfileLayout = (profile: Profile, event: LayoutChangeEvent) => {
        event.target.measure((x, y, width, height, pageX, pageY) => {
            const imageSize = width * 0.8;
            setProfileLayouts(prev => ({
                ...prev,
                [profile.id]: {
                    x: pageX + (width - imageSize) / 2,
                    y: pageY + (width - imageSize) / 2,
                    width: imageSize,
                    height: imageSize,
                    originalX: pageX,
                    originalY: pageY,
                    originalWidth: width,
                    originalHeight: height
                }
            }));
        });
    };

    // Create a shared value for each profile's animation state
    const profileAnimations = useRef(
        profiles.map((profile) => ({
            scale: useSharedValue(1),
            opacity: useSharedValue(0),
            top: useSharedValue(0),
            left: useSharedValue(0),
            borderRadius: useSharedValue(8),
        }))
    ).current;

    // Create animated styles outside the render loop
    const profileAnimatedStyles = profileAnimations.map((animation, index) =>
        useAnimatedStyle(() => {
            const layout = profileLayouts[profiles[index].id];
            if (!layout) return {};

            return {
                opacity: animation.opacity.value,
                transform: [{
                    scale: animation.scale.value
                }],
                position: 'absolute',
                width: layout.width,
                height: layout.height,
                top: animation.top.value,
                left: animation.left.value,
                borderRadius: animation.borderRadius.value,
                zIndex: selectedId === profiles[index].id ? 100 : 1,
            };
        })
    );

    // Update animations when selection changes
    useEffect(() => {
        profiles.forEach((profile, index) => {
            const layout = profileLayouts[profile.id];
            if (!layout) return;

            const animation = profileAnimations[index];

            if (selectedId === profile.id) {
                // Start from exact position
                animation.opacity.value = 1;
                animation.top.value = layout.y;
                animation.left.value = layout.x;
                animation.scale.value = 1;
                animation.borderRadius.value = 8;

                // Calculate center position with offset adjustment
                const scaleFactor = isMinimizing ?
                    PROFILE_ICON_SIZE / layout.width :
                    FINAL_PROFILE_SIZE / layout.width;

                // Animate to center or corner
                animation.scale.value = withSpring(scaleFactor, {
                    damping: 12,
                    stiffness: 100
                });

                // Adjust final position to account for the scaled size
                animation.top.value = withSpring(
                    isMinimizing ?
                        height - 120 :
                        CENTER_Y + (FINAL_PROFILE_SIZE - layout.height) / 2, // Adjust for scaled height
                    { damping: 12, stiffness: 100 }
                );

                animation.left.value = withSpring(
                    isMinimizing ?
                        width - 123 :
                        CENTER_X + (FINAL_PROFILE_SIZE - layout.width) / 2, // Adjust for scaled width
                    { damping: 12, stiffness: 100 }
                );

                animation.borderRadius.value = withSpring(
                    isMinimizing ? 4 : 12,
                    { damping: 12, stiffness: 100 }
                );

                //add opacity to 0 wwith animation after animation ends in 500ms
                // setTimeout(() => {
                //     animation.opacity.value = withTiming(0, {
                //         duration: 300,
                //         easing: Easing.bezier(0.33, 0, 0.67, 1),
                //     });
                // }, 500);
            } else {
                // Keep rest of the code same for non-selected profiles
                animation.opacity.value = withTiming(0, {
                    duration: 300,
                    easing: Easing.bezier(0.33, 0, 0.67, 1),
                });
                animation.top.value = layout.y;
                animation.left.value = layout.x;
                animation.scale.value = 1;
                animation.borderRadius.value = 8;
            }
        });
    }, [selectedId, isMinimizing, profileLayouts]);

    // Add this near other animated styles
    const headerStyle = useAnimatedStyle(() => ({
        opacity: withTiming(isMinimizing ? 0 : 1, {
            duration: 300,
            easing: Easing.bezier(0.33, 0, 0.67, 1),
        }),
    }));

    return (
        <SafeAreaView style={[
            styles.container,
            { backgroundColor: isMinimizing ? 'transparent' : '#000' }
        ]}>
            <StatusBar barStyle="light-content" />
            <Animated.View style={[styles.header, headerStyle]}>
                <View style={styles.headerTitle}>
                    <ThemedText style={styles.title}>Who's Watching?</ThemedText>
                </View>
                <TouchableOpacity>
                    <ThemedText style={styles.editButton}>Edit</ThemedText>
                </TouchableOpacity>
            </Animated.View>

            <View style={styles.content}>
                <Animated.View style={[styles.gridContainer, containerStyle]}>
                    {profiles.map((profile, index) => (
                        <Animated.View
                            key={profile.id}
                            entering={FadeIn.delay(index * 100)}
                            style={styles.profileWrapper}
                        >
                            <TouchableOpacity
                                onPress={() => handleProfileSelect(profile)}
                                style={styles.profileButton}
                                onLayout={(event) => handleProfileLayout(profile, event)}
                            >
                                <Animated.View style={styles.profileContainer}>
                                    <Animated.Image
                                        source={{ uri: profile.avatar }}
                                        style={styles.avatar}
                                    />
                                    <ThemedText style={styles.profileName}>{profile.name}</ThemedText>
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}

                    <TouchableOpacity style={styles.profileButton}>
                        <View style={styles.addProfileContainer}>
                            <Ionicons name="add" size={44} color="#fff" />
                        </View>
                        <ThemedText style={styles.addProfileText}>Add Profile</ThemedText>
                    </TouchableOpacity>
                </Animated.View>
            </View>

            {profiles.map((profile, index) => {
                const layout = profileLayouts[profile.id];
                if (!layout) return null;

                return (
                    <Animated.Image
                        key={`floating-${profile.id}`}
                        source={{ uri: profile.avatar }}
                        style={[
                            styles.floatingAvatar,
                            {
                                width: layout.width,
                                height: layout.height,
                            },
                            profileAnimatedStyles[index]
                        ]}
                    />
                );
            })}

            {showSpinner && (
                <Animated.View style={[styles.spinnerContainer, spinnerStyle]}>
                    <Svg height="100" width="100" viewBox="0 0 100 100">
                        <Circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="#E50914"
                            strokeWidth="8"
                            fill="transparent"
                            strokeLinecap="round"
                            strokeDasharray="283"
                            strokeDashoffset="200"
                        />
                    </Svg>
                </Animated.View>
            )}
        </SafeAreaView>
    );
}
