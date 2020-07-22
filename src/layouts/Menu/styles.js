const React = require("react-native");
const { Dimensions } = React;
const deviceWidth = Dimensions.get("window").width;

export default {
    container: {
        backgroundColor: "#FFF"
    },
    mb10: {
        marginBottom: 10,
    },
    cardColumn :{
        width: (deviceWidth / 2) - 15,
        backgroundColor: "#c31e5c",
    },
    imageContainer: {
        width:null,
        height: 115,
        flex: 1
    },
    text: {
        padding: 5,
        color: "#FFFFFF",
        alignSelf: "center",
        fontSize: 13,

    },
    m10: {
        marginRight: 5,
        marginLeft: 5,
    },
    card: {
        backgroundColor: "#c31e5c"
    }
};
