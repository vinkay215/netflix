import * as React from 'react';
import { View, Text, Pressable, ScrollView, Modal, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

interface CategoriesListModalProps {
    visible: boolean;
    onClose: () => void;
}

const categories = [
    'My List',
    'Available for Download',
    'Action',
    'AMC Collection',
    'Anime',
    'Comedies',
    'Crime',
    'Critically Acclaimed',
    'Documentaries',
    'Dramas',
    'Fantasy',
    'Holidays',
    'Horror',
    'Independent',
    'International',
    'Kids & Family',
    'LGBTQ',
    'Music & Musicals',
    'Reality',
    'Romance',
    'Sci-Fi',
    'Sports',
    'Stand-Up',
    'Thrillers',
    'Audio Description in English'
];

export function CategoriesListModal({ visible, onClose }: CategoriesListModalProps) {
    const insets = useSafeAreaInsets();

    const handleCategoryPress = async (category: string) => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const handleClose = async () => {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            statusBarTranslucent
            onRequestClose={handleClose}
        >
            <View style={styles.overlay}>
                <BlurView intensity={96} tint="dark" style={StyleSheet.absoluteFill}>
                    <ScrollView
                        style={[styles.content, { paddingTop: insets.top }]}
                        contentContainerStyle={[
                            styles.scrollContent,

                            { paddingTop: 40, paddingBottom: insets.bottom + 80 }
                        ]}
                    >
                        {categories.map((category) => (
                            <Pressable
                                key={category}
                                style={styles.categoryItem}
                                onPress={() => handleCategoryPress(category)}
                            >
                                <Text style={styles.categoryText}>{category}</Text>
                            </Pressable>
                        ))}
                    </ScrollView>

                    <View style={[styles.bottomContainer, { paddingBottom: insets.bottom + 20 }]}>
                        <Pressable
                            style={styles.closeButton}
                            onPress={handleClose}
                        >
                            <Ionicons name="close" size={26} color="#000" />
                        </Pressable>
                    </View>
                </BlurView>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
    },
    categoryItem: {
        paddingVertical: 18,
    },
    categoryText: {
        color: 'rgba(255, 255, 255, 0.501)',
        fontSize: 18,
        fontWeight: '400',
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingVertical: 20,
        zIndex: 1000,
    },
    closeButton: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
}); 