import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {Button, Text, Icon,  Footer, FooterTab,} from "native-base";
import CustomIcon from "./Icons";

class footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            props : props
        };
    }

    render() {
        const active = this.state.props.active;
        const navigation = this.state.props.navigation;
        return (
            <Footer style={{
                position: 'absolute', left: 0, right: 0, bottom: 0
            }}>
                <FooterTab>
                    <Button onPress={() => {navigation.navigate("YebetesebEkid")}}>
                        <CustomIcon name="familyPlanning" color="#fff" size={27} style={(active !== undefined && active === 'yebeteseb_ekid') ? styles.active : {}}/>
                        <Text style={[styles.small, styles.center]}>የቤተሰብ ዕቅድ</Text>
                    </Button>
                    <Button onPress={() => {navigation.navigate("Lanchi")}}>
                        <CustomIcon name="logoIcon" color="#fff" style={(active !== undefined && active === 'lanchi') ? styles.active : {}}/>
                        <Text style={[styles.small, styles.center]}>ላንቺ</Text>
                    </Button>
                    <Button onPress={() => {navigation.navigate("Lelijish")}}>
                        <CustomIcon name="babyEmbryo" color="#fff" style={(active !== undefined && active === 'lelijish') ? styles.active : {}}/>
                        <Text style={[styles.small, styles.center]}>ለልጅሽ</Text>
                    </Button>
                    <Button onPress={() => {navigation.navigate("Lagarsh")}}>
                        <CustomIcon name="man" color="#fff" style={(active !== undefined && active === 'lagarsh') ? styles.active : {}}/>
                        <Text style={[styles.small, styles.center]}>ላጋርሽ</Text>
                    </Button>
                    <Button onPress={() => {navigation.navigate("Mereja")}}>
                        <CustomIcon name="book" color="#fff" style={(active !== undefined && active === 'mereja') ? styles.active : {}}/>
                        <Text style={[styles.small, styles.center]}>ብታውቂው</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }
}

export default footer;

const ReactNative = require("react-native");
const {Dimensions} = ReactNative;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    active: {
        color: '#4e4e4e',
    },
    button: {
        width: deviceWidth * 0.2,
    },
    small: {
        fontSize: 10
    },
    center: {
        textAlign: 'center',
        paddingLeft:0,
        paddingRight:0,
    }
});
