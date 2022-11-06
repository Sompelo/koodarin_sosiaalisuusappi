import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingTop: Constants.statusBarHeight,
    },
    mainViewContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        // padding: 10,
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'space-between'
    },
    textField: {
        fontSize: 16,
        color: '#555',
    },
    profileTextField: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20
    },
    heading2: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#aaa'
    },
    mainViewTopContainer: {
        flex: 1,
        width: '87%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: 100
    },
    mainViewTitle: {
        fontWeight: 'bold',
        fontSize: 24,
    },
    mainViewNamePointsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'baseline',
        maxHeight: 50,
        width: '100%',
        paddingHorizontal: 27
    },
    mainViewActivityTitleContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxHeight: 50,
        width: '100%',
        paddingHorizontal: 27
    },
    mainViewActivityBrowser: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    mainViewActivityItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        margin: 15,
        maxWidth: '100%',
        maxHeight: 100,
        borderWidth: 2,
        borderColor: '#aaa',
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#eee'
        
    },
    bottomNavBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        maxHeight: 80,
        
    },
    bottomNavBarItem: {
        height: '100%',
        width: '47%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderWidth: 2,
        borderColor: '#aaa',
        borderRadius: 20
    },
    signoutButton: {
        // height: '100%',
        // width: '10%',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ccc',
        borderWidth: 2,
        borderColor: '#aaa',
        borderRadius: 7,
        padding: 2
    },
    loginViewButton: {
        height: 39,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ccc',
        borderWidth: 2,
        borderColor: '#aaa',
        borderRadius: 15,
        padding: 5
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    buttonItem: {
        padding: 10
    }
});

export default styles;