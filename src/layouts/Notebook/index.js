import React, {Component} from "react";
import {
    Container, Content, Right, Left, ListItem,
    Text, Button, Body, View, Icon
} from "native-base";
import {Alert} from "react-native";
import {Row, Col} from "react-native-easy-grid";
import styles from "./styles";
import Header from "../Common/Header";
import {FlatList} from "react-native";
import {retrieveItem, removeItem, storeItem} from "../../Storage";
import {ImageJumbotron} from "../Common/Detail";

const cover = require('../../../assets/sidemenu/mastawesha.jpg');

const NotebookHeader = (props) => {
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
                                props.navigation.navigate('NoteEditor', {
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

class Notebook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };
    }

    _getNotes() {
        retrieveItem('notes').then((items) => {
            if (items != undefined && items != null) {
                this.setState({
                    data: items
                });
            }
        }).catch(function (error) {
        });
    }

    componentDidMount() {
        this._getNotes();
    }

    deleteRow(index) {
        const newData = this.state.data;
        newData.splice(index, 1);
        storeItem('notes', newData).then(() => {
        });
        this.setState({
            data: newData
        });
    }

    deleteAll = () => {
        Alert.alert(
            'ማስጠንቀቂያ',
            "ሁሉም የተመዘገቡ ማስታወሻዎች ይጠፋሉ፡፡ ",
            [
                {text: 'ሰርዝ', onPress: () => this.remove()},
                {
                    text: 'ተው', onPress: () => {
                    this.remove();
                }
                },
            ]
        );
    };

    remove = () => {
        removeItem('notes').then(() => {
            this.setState({
                data: []
            });
        });
    };

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Header />
                <NotebookHeader
                    text='ማስታወሻ'
                    navigation={navigation}
                    deleteAll={this.deleteAll}/>
                <Content>
                    <Col style={{flex:1}}>
                        <ImageJumbotron image={cover}/>
                        <Row style={{paddingRight:10, paddingLeft: 10, alignSelf:'flex-start'}}>
                            <Text>በእርግዝና ጊዜ የሚታዩ ምልክቶችንና ማስታወሻዎችን መዝግቦ ያስቀምጥልሻል ።</Text>
                        </Row>
                        <Row>
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
                                                    {item.title}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text numberOfLines={1} style={{
                                                        color: 'rgb(88, 88, 88)'
                                                    }}>
                                                    {item.date}
                                                </Text>
                                            </View>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text numberOfLines={1} note style={{
                                                        color: 'rgb(94, 24, 91)'
                                                    }}>
                                                    {item.text}
                                                </Text>
                                            </View>
                                        </Body>
                                        <Right>
                                            <Button bordered warning onPress={() => this.props.navigation.navigate("NoteEditor", {
                                                mode: 'edit',
                                                id: item.id,
                                                title: item.title,
                                                text: item.text
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
                               )}
                            />
                        </Row>
                    </Col>
                </Content>
            </Container>
        );
    }
}

export default Notebook;
