import React, {Component} from "react";
import {Image} from "react-native";
import { Content, Text, List, ListItem, Icon, Container, Left } from "native-base";
import {Row} from "react-native-easy-grid";
import CustomIcon from "../../layouts/Common/Icons";
import styles from "./style";
const ReactNative = require("react-native");
const {Dimensions} = ReactNative;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const drawerCover = require("../../../assets/sidemenu/sidebar.jpg");
const moh_logo = require("../../../assets/sidemenu/moh.jpg");
const hilmika_logo = require("../../../assets/sidemenu/hilmika.jpg");

const datas = [
    {
        name: "የመውለጃ ቀን አስብ",
        route: "DueDate",
        icon: "calendar"
    },
    {
        name: "የልጅሽ አመጋገብ",
        route: "ChildFood",
        icon: "bowl",
        type: "Entypo"
    },
    {
        name: "የልጅሽ እንቅስቃሴ መከታተያ",
        route: "KickCounter",
        icon: "kickCounter",
        type: "Custom"
    },
    {
        name: "ክብደት አስብ",
        route: "Weight",
        icon: "weightScale",
        type: "Custom"
    },
    {
        name: "ክትባት",
        route: "Vaccination",
        icon: "vaccine",
        type: "Custom"
    },
    {
        name: "ምልክቶች",
        route: "Symptoms",
        icon: "symptoms",
        type: "Custom"
    },
    {
        name: "ማስታወሻ",
        route: "Notebook",
        icon: "notebook",
        type: "Custom"
    },
    {
        name: "የሀኪም ቀጠሮ",
        route: "Reminder",
        icon: "reminder",
        type: "Custom"
    },
    {
        name: "የህጻናት ሙዚቃ",
        route: "BabyMusic",
        icon: "music",
        type: "Custom"
    },
    {
        name: "ማዕከለ ስዕላት",
        route: "Gallery",
        icon: "pictureGallery",
        type: "Custom"
    },
    {
        name: "ስለ እኛ",
        route: "AboutUs",
        icon: "users",
        type: "FontAwesome"
    }
];

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowOffsetWidth: 1,
            shadowRadius: 4
        };
    }

    render() {
        return (
            <Container>
                <Content
                    bounces={false}
                    style={{flex: 1, backgroundColor: "#fff", top: -1}}
                >
                    <Image source={drawerCover} style={styles.drawerCover}/>

                    <List
                        dataArray={datas}
                        renderRow={data =>
                            <ListItem
                                button
                                noBorder
                                onPress={() => this.props.navigation.navigate(data.route)}>
                                <Left>
                                    {
                                        data.type === 'Custom' ?
                                            <CustomIcon
                                                active
                                                name={data.icon}
                                                style={{color: "#777", fontSize: 26, width: 30}}/> :
                                            <Icon
                                                active
                                                name={data.icon}
                                                style={{color: "#777", fontSize: 26, width: 30}}
                                                type={data.type}/>
                                    }

                                    <Text style={styles.text}>
                                        {data.name}
                                    </Text>
                                </Left>
                            </ListItem>}/>

                    <Row styles={{justifyContent:'space-around',marginBottom: 5, padding:10}}>
                        <Image source={moh_logo} style={{flex: 0.4, height: 30, width:90, margin: 5}}/>
                        <Image source={hilmika_logo} style={{flex: 0.4, height: 30, width: 90, margin: 5}}/>
                    </Row>
                </Content>
            </Container>
        )
    }
}

export default SideBar;
