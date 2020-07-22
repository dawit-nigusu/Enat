import React, {Component} from "react";
import {
    Container, Content, Right, List, ListItem,
    Text, Button, Body, View, Icon
} from "native-base";
import {Alert} from "react-native";
import {Row, Col} from "react-native-easy-grid";
import styles from "./styles";
import {ImageJumbotron} from "../Common/Detail";
import Header from "../Common/Header";
import {FlatList} from "react-native";
import {retrieveItem, storeItem, removeItem} from "../../Storage";
const cover = require('../../../assets/sidemenu/alarm.jpg');

const ampm = ['ቀን', 'ሌሊት'];

const ReminderHeader = (props) => {
    return (
        <View style={[styles.mainHeader]}>
            <Button transparent
                    style={{
                        borderWidth: 0,
                        height: 40
                    }}
                    onPress={() => {
                        props.navigation.goBack()
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
                                height: 40,
                            }}
                            onPress={() => {
                                props.navigation.navigate('ReminderEditor', {
                                    mode:'add',
                                    id:-1,
                                    title:'',
                                    text:'',
                                })
                            }}
                    >
                        <Icon size={25} style={{color: "#fff"}} name="plus" type='Entypo'/>
                    </Button>
                    <Button transparent
                            style={{
                                borderWidth: 0,
                                height: 40
                            }}
                            onPress={() => {props.deleteAll()}}
                    >
                        <Icon style={{color: "#fff"}} name="trash" type='Entypo'/>
                    </Button>
                </Row>
            </Right>
        </View>
    )
};

class Reminder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            months: ['መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
                'መጋቢት', 'ሚያዚያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ']
        };
    }

    _getReminders() {
        retrieveItem('reminders').then((items) => {
            if (items != undefined && items != null) {
                this.setState({
                    data: items
                });
            }
        }).catch(function (error) {
        });
    }

    deleteAll = () => {
        Alert.alert(
            'ማስጠንቀቂያ',
            "ሁሉም የተመዘገቡ የሃኪም ቀጠሮ ቀን ማስታወሻዎች ይጠፋሉ፡፡ ",
            [
                {text: 'ሰርዝ', onPress: () => this.remove()},
                {
                    text: 'ተው', onPress: () => {
                }
                },
            ]
        );
    };

    remove = () => {
        removeItem('reminders').then(() => {
            this.setState({
                data: []
            });
        });
    };

    componentDidMount() {
        this._getReminders();
    }

    deleteRow(index) {
        const newData = this.state.data;
        newData.splice(index, 1);
        storeItem('reminders', newData).then(() => {
        });
        this.setState({
            data: newData
        });
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Header />
                <ReminderHeader
                    text='የሃኪም ቀጠሮ ቀን ማስታወሻ'
                    navigation={navigation}
                    deleteAll={this.deleteAll}/>
                <Content>
                    <Col style={{flex:1}}>
                        <ImageJumbotron image={cover}/>
                        <Row style={{padding:10}}>
                            <Text>ከሃኪምሽ ጋር በቀጣይ ያሉሽን ቀጠሮዎች ለማስታወስ ይረዳሻል።</Text>
                        </Row>
                        <Row style={{flex:1}}>
                            <FlatList
                                data={this.state.data} style={{
                                    marginLeft: 0,
                                    paddingLeft: 0
                                }}
                                keyExtractor={(item, index) => index.toString()}
                                extraData={this.state}
                                renderItem={({item, index}) => (
                            <ListItem thumbnail style={{
                                    marginLeft: 0,
                                    paddingLeft: 0
                                }}>
                                <Body>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{
                                            color: 'rgb(50, 24, 21)'
                                        }}>
                                            {item.text}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text numberOfLines={1} style={{
                                                color: 'rgb(94, 24, 91)'
                                            }}>
                                            {this.state.months[item.month] + " " + item.day + " ፣ "  + item.year}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text numberOfLines={1} style={{
                                                color: 'rgb(94, 24, 91)'
                                            }}>
                                            {item.hour + ":" + item.minute + " " + ampm[item.ampm]}
                                        </Text>
                                    </View>
                                </Body>
                                <Right>
                                    <Button bordered warning onPress={() => this.props.navigation.navigate("ReminderEditor", {
                                        mode: 'edit',
                                        id: item.id,
                                        text: item.text,
                                        year: item.year,
                                        month: item.month,
                                        day: item.day,
                                        hour: item.hour,
                                        minute: item.minute,
                                        ampm: item.ampm,
                                    })}>
                                        <Icon size={20} name="pencil" type='Entypo'/>
                                    </Button>
                                </Right>
                                <Right>
                                    <Button bordered danger onPress={() => this.deleteRow(index)}>
                                        <Icon size={20} name="trash" type='Entypo'/>
                                    </Button>
                                </Right>
                            </ListItem>
                            )}/>
                        </Row>
                    </Col>
                </Content>
            </Container>
        );
    }
}

export default Reminder;
