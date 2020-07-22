import {AppLoading} from "expo";
import * as Font from 'expo-font';
import React, {Component} from "react";
import {StyleProvider} from "native-base";

import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/variables";

export default class Setup extends Component {
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    componentWillMount() {
        this.loadFonts();
    }

    async loadFonts() {
        await Font.loadAsync({
            Ebrima: require('../../assets/fonts/ebrima.ttf'),
            Icomoon: require('../../assets/fonts/icomoon.ttf'),
        });
        this.setState({isReady: true});

    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        return (
            <StyleProvider style={getTheme(variables)}>
                <App />
            </StyleProvider>
        )
    }
}
