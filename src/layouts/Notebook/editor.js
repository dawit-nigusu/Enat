import React, {Component} from "react";
import {TextInput, TouchableHighlight} from "react-native";
import {Container, Title, Content, Button, Form} from "native-base";
import styles from "./styles";
import Header from "../Common/Header";
import {DetailHeader} from "../Common/Detail";
import {storeItem, retrieveItem} from "../../Storage";
import {toEthiopian} from "../../Calendar";
import moment from 'moment/moment';

class NoteEditor extends Component {
    constructor(props) {
        super(props);
        const navigation = this.props.navigation;
        this.state = {
            title: "",
            text: "",
            items: [],
            id: 1,
            mode: navigation.getParam('mode', 'add'),
            months: ['መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
                'መጋቢት', 'ሚያዚያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ']
        };
    }

    componentDidMount() {
        const navigation = this.props.navigation;
        if (this.state.mode == 'add') {
            retrieveItem('maxNoteId').then(function (id) {
                if (id == null || id == undefined) {
                    id = 1;
                }
                else {
                    id = id + 1;
                }
                this.setState({
                    id: id
                });
            }).catch(function (error) {
            });
        }
        else if (this.state.mode == 'edit') {
            this.setState({
                id: navigation.getParam('id', 1),
                title: navigation.getParam('title', ""),
                text: navigation.getParam('text', ""),
            });
        }
        retrieveItem('notes').then((items) => {
            if (items == null) {
                items = [];
            }
            this.setState({
                items: items
            });
        }).catch(function (error) {
        });
    }

    saveNote() {
        this.props.navigation.navigate('Notebook');
        const date = new Date();
        const gregorian_date = moment(date);
        const time = moment(date).format("hh:mm");
        let [y, m, d] = toEthiopian(
            gregorian_date.year(),
            gregorian_date.month() + 1,
            gregorian_date.date()
        );
        const item = {
            id: this.state.id,
            title: this.state.title,
            text: this.state.text,
            date: this.state.months[m - 1] + " " + d + " ፣ " + y + " " + time
        };
        if (this.state.mode == 'edit') {
            const items = this.state.items;
            for (let i = 0; i < items.length; i++) {
                if (item.id == items[i].id) {
                    items[i] = item;
                    storeItem('notes', items).then(() => {
                        console.log("Updated item!");
                        this.props.navigation.navigate('Notebook');
                    });
                    break;
                }
            }
        }
        else if (this.state.mode == 'add') {
            this.state.items.push(item);
            storeItem('notes', this.state.items).then(() => {
                console.log("Stored item!");
                this.props.navigation.navigate('Notebook');
            });
            storeItem('maxNoteId', item.id).then(() => {
                console.log("Stored max note!");
                this.props.navigation.navigate('Notebook');
            });
        }
    }

    render() {
        const navigation = this.props.navigation;

        return (
            <Container style={styles.container}>
                <Header />
                <DetailHeader text='መዝገብ አርታኢ' onPress={() => navigation.navigate('Notebook')}/>
                <Content padder>
                    <Form>
                        <TouchableHighlight>
                            <TextInput placeholder={'ርዕስ'}
                                       onChangeText={(title) => this.state.title = title}
                                       defaultValue={this.state.title}
                                       style={{
                                           lineHeight:40,
                                           fontSize:15,
                                           color:'rgb(88, 88, 88)',
                                           paddingLeft: 5,
                                           paddingBottom: 10
                                       }}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight>
                            <TextInput numberOfLines={8} bordered placeholder="ማስታወሻ"
                                       style={{
                                           paddingLeft: 5,
                                           justifyContent: 'flex-start',
                                           color:'rgb(88, 88, 88)',
                                           paddingBottom: 10
                                       }}
                                       multiline={true}
                                       onChangeText={(text) => this.state.text = text} defaultValue={this.state.text}/>
                        </TouchableHighlight>
                        <Button title="መዝግብ"
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 15,
                                    height: 50,
                                    paddingLeft: 30,
                                    paddingRight: 30,
                                    borderRadius: 25,
                                }}
                                onPress={() => {
                                    this.saveNote()
                                }}>
                            <Title>መዝግብ</Title>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default NoteEditor;
