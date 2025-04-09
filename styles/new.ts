import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const newStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: '#000',
        paddingBottom: 8,
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 52,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    scrollContent: {
        flexGrow: 1,
    },
    categoryTabs: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 6,
        gap: 8,
    },
    categoryTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#ffffff63',
    },
    activeTab: {
        backgroundColor: '#fff',
    },
    tabIcon: {
        width: 28,
        height: 22,
        marginRight: 6,
    },
    categoryTabText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
    },
    activeTabText: {
        color: '#000',
    },
    comingSoonList: {
        // paddingTop: 8,
    },
    comingSoonItem: {
        marginBottom: 32,
        flexDirection: 'row',
    },
    dateContainer: {
        width: 60,
        paddingLeft: 16,
    },
    contentContainer: {
        flex: 1,
        marginHorizontal: 8,
        borderWidth: 1,
        borderColor: '#ffffff36',
        borderRadius: 8,
    },
    dateMonth: {
        color: '#ffffffcc',
        fontSize: 13,
        // fontWeight: 'bold',
    },
    dateDay: {
        color: '#fff',
        fontSize: 25,
        fontWeight: '800',
        lineHeight: 28,
        marginTop: 4,
    },
    previewCard: {
        width: '100%',
        aspectRatio: 16 / 9,
        marginBottom: 12,
        borderRadius: 8,
        overflow: 'hidden',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        position: 'relative',

    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    rated: {
        color: '#ffffffcc',
        fontSize: 12,
        fontWeight: '600',

    },
    soundButton: {
        position: 'absolute',
        top: 190,
        right: 12,
        zIndex: 100,
        backgroundColor: '#000000b7',
        width: 32,
        height: 32,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ratedContainer: {
        position: 'absolute',
        top: 12,
        right: 12,
        zIndex: 100,
        backgroundColor: '#00000092',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
    },
    dateText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    activeTabContainer: {
        // paddingTop: 30,
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 10,
        marginBottom: 6,
    },
    activeTabTitle: {
        color: '#fff',
        fontSize: 19,
        fontWeight: 'bold',
    },
    activeTabIcon: {
        width: 24,
        height: 24,
        marginRight: 6,
    },
    featuredLogo: {
        width: 120,
        height: 64,
    },
    featuredContainer: {
        paddingTop: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    eventDate: {
        color: '#ffffffd4',
        fontSize: 15,
        marginBottom: 8,
        marginTop: 8,
    },
    description: {
        color: '#999',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 16,
        overflow: 'hidden',
    },
    tags: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 4,
        marginTop: 8
    },
    tag: {
        color: '#71767c',
        fontSize: 13
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 48,
        marginTop: 0,
        marginHorizontal: 8,
        marginBottom: 16
    },
    actionButton: {
        alignItems: 'center',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 8,
        borderRadius: 4,
        paddingHorizontal: 16

    },
    actionButtonText: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '600',

    },
    titleContainer: {
        paddingTop: 12,
        paddingHorizontal: 12,
        gap: 4
    },

    netflixTag: {
        color: '#ffffffcf',
        fontSize: 12,
        fontWeight: '500',
        marginLeft: 24,
        letterSpacing: 2.5,
    },
    trendingTag: {
        fontSize: 17,
        color: '#fff',
        fontWeight: 'bold',
    }
});
