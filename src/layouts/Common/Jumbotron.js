import React, {Component} from "react";
import {ImageBackground, StyleSheet} from "react-native";
import {View} from "native-base";

const ReactNative = require("react-native");
const {Dimensions} = ReactNative;
const deviceHeight = Dimensions.get("window").height;

const cover = require('../../../assets/baby1.jpeg');

class jumbotron extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={{marginBottom: 15}}>
                <ImageBackground
                    source={cover}
                    style={{
                        flex: 1,
                        width: null,
                        height: deviceHeight * 0.2,
                    }}
                >
                    <View style={inStyle.overlay}/>
                </ImageBackground>
            </View>
        )
    }
}
export default jumbotron;

const inStyle = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(89, 85, 107, 0.4)',
    }
});
