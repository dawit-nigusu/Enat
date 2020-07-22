const React = require("react-native");
const {Dimensions, Platform} = React;
const deviceHeight = Dimensions.get("window").height;

export default {
    imageContainer: {
        flex: 1,
        width: null,
        height: null
    },
    logoContainer: {
        flex: 1,
        marginTop: deviceHeight / 8,
        marginBottom: 30
    },
    logo: {
        position: "absolute",
        left: Platform.OS === "android" ? 40 : 50,
        top: Platform.OS === "android" ? 35 : 60,
        width: 280,
        height: 100
    },
    text: {
        bottom: 6,
        marginTop: 5,
        alignSelf: "center",
        marginBottom: 7
    },
    container: {
        backgroundColor: "#FFF"
    },
    body: {
        marginLeft: 15,
        marginRight: 10,
        marginBottom: 10,
    },
    title: {
        color: "#FFF",
        alignSelf: 'center'
    },
    mb10: {
        marginBottom: 10
    },
    mb35: {
        marginBottom: 35
    },
    mb: {
        marginBottom: 15
    },
    textWrapper: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        marginLeft: 15,
        marginRight: 5,
        marginBottom: 10,
    },
    textBlock: {
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        flexDirection: 'row',
        position: 'absolute',
        left: 10,
        flex: 1,
    },
    boldText: {
        fontWeight: 'bold',
    },
    normalText: {
        flexWrap: 'wrap'
    },
    bullet: {},
    bulletText: {
        marginLeft: 5,
        marginRight: 10,
    },
    header: {
        marginBottom: 10,
        height: 150,
    },
    dotsContainer: {
        width: 20,
        marginBottom: 10,
        marginLeft: 20,
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    dot: {
        width: 20,
        height: 10,
        borderRadius: 5,
        padding: 5,
        marginBottom: 2
    },
    dotActive: {
        backgroundColor: '#FC3768'
    },
    dotInactive: {
        backgroundColor: '#D2D2D4'
    },
    progressRow: {
      justifyContent: 'space-around',
      marginBottom: 10,
    }
};
