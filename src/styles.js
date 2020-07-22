const React = require("react-native");
const {Dimensions, Platform} = React;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const android = Platform.OS === "android" ? "android-menu" : "ios-menu"; // Platform specific TODO

export default {

    selfCenter: {alignSelf: "center"},

    //layout/Common

    headerHeight: {height: 70},
    headerLogo: {
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        justifyContent: "center",
        flexGrow: 1,
    },
    headerTitle: {color: "#fff", fontSize: 27, paddingStart: 5},

}
