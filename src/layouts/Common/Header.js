import React, {Component} from "react";
import {Text, View} from "react-native";
import {Header, Button, Icon, Left, Right, Body} from "native-base";
import CustomIcon from "./Icons";
import {withNavigation} from "react-navigation";
import styles from "../../styles";

class HeaderBar extends Component {
    render() {
        return (
            <Header style={styles.headerHeight}>
                <Left>
                    <Button
                        transparent
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                        <Icon name="menu"/>
                    </Button>
                </Left>
                <View style={styles.headerLogo}>
                    <CustomIcon name="logoIcon" />
                    <Text style={styles.headerTitle}>እናት</Text>
                </View>
                <Right>
                    <Button transparent
                            onPress={() => this.props.navigation.navigate("Home")}>
                        <CustomIcon name="clock" color="white"/>
                    </Button>
                </Right>
            </Header>
        );
    }
}

export default withNavigation(HeaderBar);
