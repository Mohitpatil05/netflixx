import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain'
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconButton: {
        marginRight: 10
    },
    profileIcon: {
        width: 30,
        height: 30,
        borderRadius: 15
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 80
    },
    modalContent: {
        alignItems: 'center',
        width: '100%',
        paddingBottom: 40
    },
    modalLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginBottom: 20
    },
    username: {
        color: '#fff',
        fontSize: 22,
        marginBottom: 40,
        fontWeight: '600'
    },
    menuButton: {
        width: '100%',
        maxWidth: 300,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15
    },
    menuButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },
    confirmModalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    confirmModalBox: {
        backgroundColor: Colors.card,
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center'
    },
    confirmText: {
        color: Colors.text,
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center'
    },
    confirmButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%'
    },
    confirmButton: {
        flex: 1,
        padding: 10,
        borderRadius: 8,
        alignItems: 'center'
    },
    cancelButton: {
        backgroundColor: '#444',
        marginRight: 10
    },
    logoutButton: {
        backgroundColor: Colors.accent,
        marginLeft: 10
    },
    confirmButtonText: {
        color: Colors.text
    }
});