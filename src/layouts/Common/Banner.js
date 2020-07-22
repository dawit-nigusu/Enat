import React, {Component} from "react";
import {Image } from "react-native";

const cover = require("../../../assets/drawer-cover.png");

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Image
                source={{
                    uri: 'http://enat.hlmikhatech.com/banners/banner.jpg',
                    cache: 'force-cache',
                }}
                style={[{
                    flex: 1,
                    width: null,
                    height: 90,
                    marginTop: 5,
                }, this.props.style]}/>
        );
    }
}

export default Banner;
