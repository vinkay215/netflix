import React from 'react';
import { View, Text, Pressable, Image, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { styles } from '@/styles';
import { Movie, MovieRow } from '@/types/movie';

const GameItem = ({ item, router }: { item: Movie; router: any }) => (
    <Pressable
        onPress={() => router.push({
            pathname: '/movie/[id]',
            params: { id: item.id }
        })}
        style={styles.contentItem}
    >
        <Image source={{ uri: item.imageUrl }} style={[styles.thumbnail, { width: 120, aspectRatio: 1 }]} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.type}>{item.type}</Text>
    </Pressable>
);

export function GameList({ rowTitle, movies }: MovieRow) {
    const router = useRouter();

    return (
        <View style={styles.movieRow}>
            <Text style={styles.sectionTitle}>{rowTitle}</Text>
            <FlatList
                horizontal

                data={movies}
                renderItem={(props) => <GameItem {...props} router={router} />}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentList}
            />
        </View>
    );
} 