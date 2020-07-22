import React, {Component} from "react";
import {  Alert, Image } from "react-native";
import {
    Container, Button, Text, View, Icon, Right
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./styles";
import Header from "../Common/Header";
import { retrieveItem, storeItem } from "../../Storage";

const ReactNative = require("react-native");
const {Dimensions} = ReactNative;
const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const DetailHeader = (props) => {
    return (
        <View style={[styles.mainHeader]}>
            <Button transparent
                    style={{
                        borderWidth: 0,
                        height: 40
                    }}
                    onPress={() => {
                        props.navigation.navigate('Gallery')
                    }}
            >
                <Icon style={{color: "#fff"}} name="chevron-thin-left" type='Entypo'/>
            </Button>
            <Text style={[styles.mainHeaderText, {
                lineHeight: 20,
                height: 40,
                alignItems: 'center',
                fontSize: 18,
                fontWeight: 'normal',
                textAlignVertical: 'center',
                flexWrap: 'wrap',
            }]}>{props.text}</Text>
            <Right>
                <Row>
                    <Button transparent
                            style={{
                                borderWidth: 0,
                                height: 40
                            }}
                            onPress={() => {props.onDelete()}}
                    >
                        <Icon style={{color: "#fff"}} name="trash" type='Entypo'/>
                    </Button>
                </Row>
            </Right>
        </View>
    )
};

class Gallery extends Component {

    constructor(props) {
        super(props);
        this._onDelete = this._onDelete.bind(this);
    }

    _onDelete(index) {
        // console.log(' delete pressed');

        Alert.alert(
            'ማስጠንቀቂያ',
            "ይህ ፎቶ ይጠፋል፡፡ ",
            [
                {text: 'ሰርዝ', onPress: () => this._remove(index)},
                {text: 'ተው', onPress: () => {}},
            ]
        );
    }

    _remove(index) {
        retrieveItem('photoList').then((data) => {
            if (data !== undefined && data != null) {
                // console.log(data[index]);
                data.splice(index, 1);
                storeItem('photoList', data);
                this.props.navigation.navigate('Gallery');
            }else {
                Alert.alert(
                    'ስህተት',
                    "ይህ ፎቶ ሊጠፋ አልቻለም፡፡ ",
                    [
                        {text: 'እሽ', onPress: () => {}},
                    ]
                );
            }
        });
    }

    render() {
        const data = this.props.navigation.getParam('data');
        const index = this.props.navigation.getParam('index');
        const week = data.week;
        const description = data.description;
        const photouri = data.uri;
        return (
            <Container style={styles.container}>
                <Header/>
                <DetailHeader
                    navigation={this.props.navigation}
                    text={week + "ተኛ ሳምንት"}
                    onDelete={()=>{this._onDelete(index)}}
                />
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <Image style={{
                        flex:1,
                        marginBottom: 10,
                        marginTop: 10,
                        width: deviceWidth,
                    }} source={{uri:photouri}}/>
                    <View style={{
                        margin: 10
                    }}>
                        <Text>{description}</Text>
                    </View>
                </View>
            </Container>
        );
    }

}

export default Gallery;
