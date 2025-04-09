import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');


export const styles = StyleSheet.create({
    spinnerContainer: {
        position: 'absolute',
        left: width / 2 - 50,
        top: height / 2 + 100,
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedAvatar: {
        position: 'absolute',
        width: width * 0.3,
        height: width * 0.3,
        borderRadius: 8,
    },

    container: {
        flex: 1,
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        marginTop: -110,
        // opacity: 0.1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    headerTitle: {
        flex: 1,
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    editButton: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
        position: 'absolute',
        right: 0,
        top: -12,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        gap: 4,
        paddingHorizontal: 20,
    },
    profileButton: {
        width: width * 0.30,
        aspectRatio: 1,
        marginBottom: 24,
        alignItems: 'center',
    },
    profileContainer: {
        alignItems: 'center',
        gap: 8,
    },
    avatar: {
        width: '80%',
        height: undefined,
        aspectRatio: 1,
        borderRadius: 6,
    },
    profileName: {
        fontSize: 18,
        fontWeight: '500',
        color: '#e5e5e5',
    },
    addProfileContainer: {
        width: width * (0.30 - 0.06),
        aspectRatio: 1,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#424242',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    addProfileText: {
        fontSize: 18,
        color: '#ffffff',
        marginTop: 8,
        fontWeight: '400',
    },
    floatingAvatar: {
        position: 'absolute',
        borderRadius: 8,
    },
});