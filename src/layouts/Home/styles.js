const React = require("react-native");
const {Dimensions} = React;
const deviceHeight = Dimensions.get("window").height;


export default {
    container: {
        backgroundColor: "#FFF"
    },
    mb10: {
        marginBottom: 10
    },
    text: {
        color: "#D8D8D8",
        bottom: 6,
        marginTop: 5
    },
    homeImage: {
        width: null,
        //height: deviceHeight * 0.45,
        flex: 1,
    },
    mr10: {
        marginRight: 10
    },
    tile: {
        backgroundColor: "rgba(245, 58, 124, 0.5)",
        marginLeft: 10
    },
    mediumText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 22,
        alignSelf: "center",
        padding: 5
    },
    largeText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 'bold',
        alignSelf: "center"
    },
    bottom: {
        justifyContent: 'flex-end'
    },
    subTitleText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 16,
        alignSelf: "center",
        padding: 5,
    },
    titleText: {
        color: "#ffffff",
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: "center"
    },

};
