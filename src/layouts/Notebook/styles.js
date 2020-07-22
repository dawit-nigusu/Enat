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
    mainHeader: {
        backgroundColor: '#eb3a7c',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        height: 50,
        flexDirection: 'row',
        width:'100%'
    },
    mainHeaderText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 22,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        lineHeight: 40,
    }
};
