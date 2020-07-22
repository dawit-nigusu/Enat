const React = require("react-native");
const {Dimensions, Platform} = React;
const deviceHeight = Dimensions.get("window").height;

export default {
    container: {
        backgroundColor: "#FFF"
    },
    mainHeader: {
        backgroundColor: '#eb3a7c',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mainHeaderText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 22,
        paddingLeft: 10,
        paddingRight: 10,
        height: 40,
        lineHeight: 40,
    },
};
