import { View, StyleSheet, Text, Image, Pressable, Dimensions, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ThemedText } from '@/components/ThemedText';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { useEffect, useState, useRef } from 'react';
import { expandedPlayerStyles as styles } from '@/styles/expanded-player';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import movies from '@/data/movies.json';
import { Slider } from 'react-native-awesome-slider';
import { useSharedValue } from 'react-native-reanimated';
import { newStyles } from '@/styles/new';
import { Image as ExpoImage } from 'expo-image';

interface MovieData {
    id: string | number;
    title: string;
    imageUrl: string;
    video_url?: string;
    year?: string;
    duration?: string;
    rating?: string;
    description?: string;
    cast?: string[];
    director?: string;
    ranking_text?: string;
}

interface ExpandedPlayerProps {
    scrollComponent: (props: any) => React.ReactElement;
    movie: MovieData;
}

interface PlaybackStatus {
    isLoaded: boolean;
    positionMillis: number;
    durationMillis: number;
}

interface VideoRef {
    setOnPlaybackStatusUpdate: (callback: (status: PlaybackStatus) => void) => void;
    setPositionAsync: (position: number) => void;
}




export function ExpandedPlayer({ scrollComponent, movie }: ExpandedPlayerProps) {
    const ScrollComponentToUse = scrollComponent || ScrollView;
    const insets = useSafeAreaInsets();
    const videoRef = useRef<Video | null>(null);
    const [isMuted, setIsMuted] = useState(true);
    const progress = useSharedValue(0);
    const min = useSharedValue(0);
    const max = useSharedValue(100);
    const [duration, setDuration] = useState(0);

    const defaultMovieData = {
        video_url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        year: '2024',
        duration: '2h 30m',
        rating: 'PG-13',
        description: 'No description available',
        cast: ['Cast not available'],
        director: 'Unknown Director',
        ranking_text: '#1 in Movies Today',
        title: 'Untitled',
        imageUrl: '',
    };

    const movieData = {
        ...defaultMovieData,
        ...Object.fromEntries(
            Object.entries(movie).filter(([_, value]) =>
                value !== null && value !== undefined && value !== ''
            )
        )
    };

    const onPlaybackStatusUpdate = (status: PlaybackStatus) => {
        if (status.isLoaded) {
            progress.value = status.positionMillis;
            setDuration(status.durationMillis);
            max.value = status.durationMillis;
        }
    };

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        }
    }, []);

    return (
        <BlurView
            intensity={85}
            tint="systemThickMaterialDark"
            style={[styles.rootContainer, { marginTop: insets.top }]}
        >
            <View style={styles.videoContainer}>
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{ uri: movieData.video_url }}
                    useNativeControls={false}
                    resizeMode={ResizeMode.COVER}
                    isLooping
                    isMuted={isMuted}
                    shouldPlay
                />
                <View style={styles.videoOverlay}>
                    <Pressable
                        style={styles.closeButton}
                        onPress={() => {/* handle close */ }}
                    >
                        <Ionicons name="close-outline" size={26} color="white" />
                    </Pressable>
                </View>
                <View style={styles.muteOverlay}>
                    <Pressable
                        style={styles.soundButton}
                        onPress={() => setIsMuted(!isMuted)}
                    >
                        <Ionicons
                            name={isMuted ? "volume-mute" : "volume-medium"}
                            size={18}
                            color="white"
                        />
                    </Pressable>
                </View>
                <View style={styles.sliderContainer}>
                    <Slider
                        style={styles.slider}
                        progress={progress}
                        minimumValue={min}
                        maximumValue={max}
                        onValueChange={(value) => {
                            if (videoRef.current) {
                                videoRef.current.setPositionAsync(value);
                            }
                        }}
                        theme={{
                            minimumTrackTintColor: '#db0000',
                            // maximumTrackTintColor: 'rgba(255, 255, 255, 0.795)',
                            bubbleBackgroundColor: '#db0000',
                        }}
                        thumbWidth={5}
                        sliderHeight={5}
                        containerStyle={styles.sliderInner}
                        disableTrackFollow={false}
                        disableTapEvent={false}
                    />
                </View>
            </View>

            <ScrollComponentToUse
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.contentContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: -4, marginBottom: 8 }}>
                        <ExpoImage
                            source={{ uri: 'https://loodibee.com/wp-content/uploads/Netflix-N-Symbol-logo.png' }}
                            style={{ width: 20, height: 20, top: -4, position: 'absolute', left: 0 }}
                            cachePolicy="memory-disk"
                        />
                        <Text style={newStyles.netflixTag}>FILM</Text>
                    </View>
                    <ThemedText style={styles.title}>{movieData.title}</ThemedText>

                    <View style={styles.metaInfo}>
                        <ThemedText style={styles.year}>{movieData.year}</ThemedText>
                        <ThemedText style={styles.duration}>{movieData.duration}</ThemedText>
                        <ThemedText style={styles.rating}>{movieData.rating}</ThemedText>
                        <ThemedText style={styles.quality}>HD</ThemedText>
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 18 }}>
                        <ExpoImage
                            source={{ uri: 'https://www.netflix.com/tudum/top10/images/top10.png' }}
                            style={{ width: 24, height: 24, left: 0, borderRadius: 4 }}
                            cachePolicy="memory-disk"
                        />
                        <Text style={newStyles.trendingTag}>{movieData.ranking_text}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.playButton}>
                            <Ionicons name="play" size={24} color="black" />
                            <ThemedText style={styles.playButtonText}>Play</ThemedText>
                        </Pressable>

                        <Pressable style={styles.downloadButton}>
                            {/* <Ionicons name="download" size={20} color="white" /> */}
                            <ExpoImage
                                source={require('../../assets/images/replace-these/download-netflix-transparent.png')}
                                style={{ width: 28, height: 28 }}
                                cachePolicy="memory-disk"
                                contentFit="contain"
                            />
                            <ThemedText style={styles.downloadButtonText}>Download</ThemedText>
                        </Pressable>
                    </View>

                    <ThemedText style={styles.description}>
                        {movieData.description}
                    </ThemedText>

                    <View style={styles.castInfo}>
                        <ThemedText style={styles.castLabel}>Cast: </ThemedText>
                        <ThemedText style={styles.castText}>
                            {movieData.cast?.join(', ')}
                        </ThemedText>
                    </View>

                    <View style={styles.directorInfo}>
                        <ThemedText style={styles.directorLabel}>Director: </ThemedText>
                        <ThemedText style={styles.directorText}>
                            {movieData.director}
                        </ThemedText>
                    </View>

                    <View style={styles.actionButtons}>
                        <Pressable style={[styles.actionButton, {
                            // backgroundColor: '#000000bb',
                            width: 100,
                            borderBottomWidth: 4,
                            borderBottomColor: '#db0000',
                        }]}>
                            <Ionicons name="add" size={24} color="white" />
                            <ThemedText style={styles.actionButtonText}>My List</ThemedText>
                        </Pressable>
                        <Pressable style={styles.actionButton}>
                            <Ionicons name="thumbs-up-outline" size={24} color="white" />
                            <ThemedText style={styles.actionButtonText}>Rate</ThemedText>
                        </Pressable>
                        <Pressable style={styles.actionButton}>
                            <Ionicons name="send-outline" size={20} color="white" style={{
                                marginBottom: 4,
                                transform: [{ rotate: '320deg' }]
                            }} />
                            <ThemedText style={styles.actionButtonText}>Share</ThemedText>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.moreLikeThis}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 }}>
                        <ThemedText style={styles.moreLikeThisTitle}>More Like This</ThemedText>
                        <ThemedText style={[styles.moreLikeThisTitle, { opacity: 0.4 }]}>Trailers & More</ThemedText>
                    </View>
                    <View style={styles.movieGrid}>
                        {movies.movies[3].movies.slice(0, 6).map((movie, index) => (
                            <View key={movie.id} style={styles.moviePoster}>
                                <ExpoImage
                                    source={{ uri: movie.imageUrl }}
                                    style={{ width: '100%', height: '100%', borderRadius: 4 }}
                                    cachePolicy="memory-disk"
                                    transition={200}
                                />
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollComponentToUse>
        </BlurView>
    );
}

