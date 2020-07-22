const React = require("react-native");
const {Dimensions, Platform} = React;
const deviceHeight = Dimensions.get("window").height;
/*
 logo: {
 position: "absolute",
 left: Platform.OS === "android" ? 40 : 50,
 top: Platform.OS === "android" ? 35 : 60,
 width: 280,
 height: 100
 },
 */

export default {
    container: {
        backgroundColor: '#fff',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        color: '#b4004e',
    },
    welcomeContainer: {
        justifyContent: 'center'
    },
    picker: {
        flex: 1,
        backgroundColor: '#fff',
    },
    pickerContainer: {
        marginLeft: 15,
        marginRight: 15
    },
    mb15: {
        marginBottom: 15
    },
    buttonContainer: {
        margin: 15
    }
};
