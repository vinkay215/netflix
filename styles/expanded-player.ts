import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const expandedPlayerStyles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',

    },
    scrollView: {
        flex: 1,
        width: '100%',

    },
    videoContainer: {
        width: '100%',
        height: 238, // 16:9 aspect ratio
        position: 'relative',
        zIndex: 1,

    },
    video: {
        width: '100%',
        height: '100%',
    },
    videoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        // padding: 16,
    },
    muteOverlay: {
        position: 'absolute',
        bottom: 16,
        right: 16,
    },
    closeButton: {
        // padding: 8,
        backgroundColor: '#000000bb',
        width: 36,
        height: 36,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        right: 10,
        top: 10
    },
    soundButton: {
        backgroundColor: '#000000bb',
        width: 28,
        height: 28,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 6,
    },
    contentContainer: {
        padding: 16,
    },
    title: {
        marginTop: -8,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#fff'
    },
    metaInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },
    year: {
        fontSize: 14,
        color: '#999',
    },
    duration: {
        fontSize: 14,
        color: '#999',
    },
    rating: {
        fontSize: 14,
        color: '#999',
        backgroundColor: '#333',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    quality: {
        fontSize: 14,
        color: '#999',
        backgroundColor: '#333',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
    },
    buttonContainer: {
        flexDirection: 'column',
        gap: 12,
        marginBottom: 16,
    },
    playButton: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 4,
        gap: 8,
    },
    playButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    downloadButton: {
        flex: 1,
        backgroundColor: '#333',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        borderRadius: 4,
        gap: 8,
    },
    downloadButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
        color: '#fff',
    },
    castInfo: {
        flexDirection: 'row',
        marginBottom: 0,
    },
    castLabel: {
        color: '#999',
        fontSize: 14,
    },
    castText: {
        flex: 1,
        color: '#999',
        fontSize: 14,
    },
    directorInfo: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    directorLabel: {
        color: '#999',
        fontSize: 14,
    },
    directorText: {
        flex: 1,
        color: '#999',
        fontSize: 14,
    },
    actionButtons: {
        flexDirection: 'row',

        borderTopColor: '#333',
        gap: 80,
        height: 60,

    },
    actionButton: {
        alignItems: 'center',
        gap: 1,
        marginTop: -4
    },
    actionButtonText: {
        fontSize: 11,
        color: '#fff',
    },
    moreLikeThis: {
        padding: 16,
        paddingTop: 0,
    },
    moreLikeThisTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#fff',
    },
    movieGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    moviePoster: {
        width: '31%',
        aspectRatio: 2 / 3,
        borderRadius: 4,
    },
    sliderContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -2,
        height: 3,
        // paddingHorizontal: 16,
        justifyContent: 'center',
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    slider: {
        width: '100%',
    },
    sliderInner: {
        backgroundColor: '#ffffff4a',
        borderWidth: 0,
    },

});
