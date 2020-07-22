import React, {Component} from "react";
import {TextInput, TouchableHighlight, Picker, Alert} from "react-native";
import { Container, Title, Content, Button,  Form } from "native-base";
import {Col, Row} from "react-native-easy-grid";
import styles from "./styles";
import Header from "../Common/Header";
import {DetailHeader} from "../Common/Detail";
import {storeItem, retrieveItem} from "../../Storage";
import moment from "moment/moment";
import { toEthiopian, toGregorian } from "../../Calendar";
import { Notifications } from 'expo';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

const PickerItem = Picker.Item;

class ReminderEditor extends Component {
    constructor(props) {
        super(props);

        let [y, m, d] = toEthiopian(moment().year(), moment().month()+1, moment().date());
        this.state = {
            text: "",
            date: new Date(),
            items: [],
            id: 1,
            mode: 'add',
            months : ['መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
                'መጋቢት', 'ሚያዚያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'],
            days: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            years: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
            hours: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10',
                '11', '12'],
            minutes: ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09','10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
                '31', '32', '33', '34', '35', '36', '37', '38', '39','40',
                '41', '42', '43', '44', '45', '46', '47', '48', '49', '50',
                '51', '52', '53', '54', '55', '56', '57', '58', '59'],
            ampm:['ቀን', 'ሌሊት'],
            selectedMonth: 'መስከረም',
            selectedDay: '1',
            selectedYear: '2009',
            selectedHour: '1',
            selectedMinute: '00',
            selectedAMPM: 'ቀን',
        };

        this.state.selectedDay = d.toString();
        this.state.selectedMonth = this.state.months[m-1];
        this.state.selectedYear = y.toString();

        this._initiateMode();
    }

    _initiateMode()
    {
        const navigation = this.props.navigation;
        this.state.mode = navigation.getParam('mode', 'add');
        if (this.state.mode == 'add') {
            retrieveItem('maxReminderId').then((id) => {
                if (id == null || id == undefined) {
                    id = 1;
                }
                else {
                    id = id + 1;
                }
                this.state.id = id;
            }).catch(function (error) {
                console.error(error);
            });

            this.state.text = '';
        }
        else if (this.state.mode == 'edit') {
            this.state.id = navigation.getParam('id', 1);
            this.state.text = navigation.getParam('text', '');
            this.state.selectedYear = navigation.getParam('year', '');
            this.state.selectedMonth = this.state.months[navigation.getParam('month', 0)];
            this.state.selectedDay = navigation.getParam('day', '');
            this.state.selectedHour = navigation.getParam('hour', 1);
            this.state.selectedMinute = navigation.getParam('minute', '');
            this.state.selectedAMPM = this.state.ampm[navigation.getParam('ampm', 0)];
        }
        retrieveItem('reminders').then((items) => {
            if (items == null) {
                items = [];
            }
            this.state.items = items;
        }).catch(function (error) {
        });
    }

    hourChange(value) {
        this.setState({selectedHour: value});
    }

    minuteChange(value) {
        this.setState({selectedMinute: value});
    }

    ampmChange(value) {
        this.setState({selectedAMPM: value});
    }

    dayChange(value) {
        this.setState({selectedDay: value});
    }

    monthChange(value, index) {
        this.setState({selectedMonth:value});
        if(index === 12){
            if(this.state.selectedYear % 4 === 3){
                this.setState({
                    days: ['1', '2', '3', '4', '5', '6'],
                });
            }else {
                this.setState({
                    days: ['1', '2', '3', '4', '5'],
                });
            }
        }
        else {
            this.setState({
                days: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10',
                    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            });
        }
    }

    yearChange(value) {
        this.setState({selectedYear:value});
        if(this.state.selectedMonth === 'ጳጉሜ'){
            if(value % 4 === 3){
                this.setState({
                    days: ['1', '2', '3', '4', '5', '6'],
                });
            }else {
                this.setState({
                    days: ['1', '2', '3', '4', '5'],
                });
            }
        }
    }

    saveReminder() {
        const item = {
            id: this.state.id,
            text: this.state.text,
            year: this.state.selectedYear,
            month: this.state.months.indexOf(this.state.selectedMonth),
            day: this.state.selectedDay,
            hour: this.state.selectedHour,
            minute: this.state.selectedMinute,
            ampm: this.state.ampm.indexOf(this.state.selectedAMPM),
        };
        if (this.state.mode == 'edit') {
            for (let i = 0; i < this.state.items.length; i++) {
                if (item.id == this.state.items[i].id) {
                    const localNotification = {
                        title: 'ማስታወሻ',
                        body: this.state.text
                    };

                    let [y, m, d] = toGregorian(Number(this.state.selectedYear), this.state.months.indexOf(this.state.selectedMonth) + 1, Number(this.state.selectedDay));
                    //
                    const date = new Date(y, m - 1, d, (this.state.selectedHour % 12) + this.state.ampm.indexOf(this.state.selectedAMPM) * 12, Number(this.state.selectedMinute), 0, 0);

                    const schedulingOptions = {
                        time: date.getTime() + 1,
                    };

                    Permissions.getAsync(
                        Permissions.NOTIFICATIONS
                    ).then((permission) => {
                        const { status: existingStatus } = permission;
                        let finalStatus = existingStatus;

                        // only ask if permissions have not already been determined, because
                        // iOS won't necessarily prompt the user a second time.
                        if (existingStatus !== 'granted') {
                            // Android remote notification permissions are granted during the app
                            // install, so this will only ask on iOS
                            Permissions.askAsync(Permissions.NOTIFICATIONS).then((response) => {
                                const {status} = response;
                                finalStatus = status;

                                if (finalStatus !== 'granted')
                                {
                                    return;
                                }
                                if (this.state.items[i].localNotificationId != undefined)
                                {
                                    Notifications.cancelScheduledNotificationAsync(this.state.items[i].localNotificationId);
                                }
                                Notifications.scheduleLocalNotificationAsync(
                                    localNotification, schedulingOptions
                                ).then((localNotificationId) => {
                                    item.localNotificationId = localNotificationId;
                                    this.state.items[i] = item;
                                    storeItem('reminders', this.state.items).then(() => {
                                        console.log("Updated item!");
                                        this.props.navigation.navigate('Reminder');
                                    });
                                });
                            });
                            finalStatus = status;
                        }
                        else {
                            if (this.state.items[i].localNotificationId != undefined)
                            {
                                Notifications.cancelScheduledNotificationAsync(this.state.items[i].localNotificationId);
                            }
                            Notifications.scheduleLocalNotificationAsync(
                                localNotification, schedulingOptions
                            ).then((localNotificationId) => {
                                item.localNotificationId = localNotificationId;
                                this.state.items[i] = item;
                                storeItem('reminders', this.state.items).then(() => {
                                    console.log("Updated item!");
                                    this.props.navigation.navigate('Reminder');
                                });
                            });
                        }

                    });
                    break;
                }
            }
        }
        else if (this.state.mode == 'add') {
            const localNotification = {
                title: 'ማስታወሻ',
                body: this.state.text
            };

            let [y, m, d] = toGregorian(Number(this.state.selectedYear), this.state.months.indexOf(this.state.selectedMonth) + 1, Number(this.state.selectedDay));
            //
            const date = new Date(y, m - 1, d, (this.state.selectedHour % 12) + this.state.ampm.indexOf(this.state.selectedAMPM) * 12, Number(this.state.selectedMinute), 0, 0);

            const schedulingOptions = {
                time: date.getTime() + 1,
            };

            Permissions.getAsync(
                Permissions.NOTIFICATIONS
            ).then((permission) => {
                const { status: existingStatus } = permission;
                let finalStatus = existingStatus;

                // only ask if permissions have not already been determined, because
                // iOS won't necessarily prompt the user a second time.
                if (existingStatus !== 'granted') {
                    // Android remote notification permissions are granted during the app
                    // install, so this will only ask on iOS
                    Permissions.askAsync(Permissions.NOTIFICATIONS).then((response) => {
                        const {status} = response;
                        finalStatus = status;

                        if (finalStatus !== 'granted')
                        {
                            return;
                        }

                        Notifications.scheduleLocalNotificationAsync(
                            localNotification, schedulingOptions
                        ).then((localNotificationId) => {
                            item.localNotificationId = localNotificationId;
                            this.state.items.push(item);
                            storeItem('reminders', this.state.items).then(() => {
                                console.log("Stored item!");
                                this.props.navigation.navigate('Reminder');
                            });
                            storeItem('maxReminderId', item.id).then(() => {
                                console.log("Stored max reminder!");
                            });
                        });
                    });
                }
                else {
                    Notifications.scheduleLocalNotificationAsync(
                        localNotification, schedulingOptions
                    ).then((localNotificationId) => {
                        item.localNotificationId = localNotificationId;
                        this.state.items.push(item);
                        storeItem('reminders', this.state.items).then(() => {
                            console.log("Stored item!");
                            this.props.navigation.navigate('Reminder');
                        });
                        storeItem('maxReminderId', item.id).then(() => {
                            console.log("Stored max reminder!");
                        });
                    });
                }
            });
        }
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Header />
                <DetailHeader text='የሀኪም ቀጠሮ ማስታወሻ' onPress={() => navigation.navigate('Reminder')}/>
                <Content padder>
                    <Form>

                        <Row style={styles.pickerContainer}>

                            <Col size={1}>
                                <Picker
                                    selectedValue={this.state.selectedMonth}
                                    onValueChange={
                                        (itemValue, itemIndex) => this.monthChange(itemValue, itemIndex)}>
                                    {this.state.months.map((month, index) => {
                                        return (<PickerItem key={index} label={month} value={month} />)
                                    })}
                                </Picker>
                            </Col>

                            <Col size={1}>
                                <Picker
                                    selectedValue={this.state.selectedDay}
                                    onValueChange={value => this.dayChange(value)}
                                >
                                    {this.state.days.map((day, index) => {
                                        return (<PickerItem key={index} label={day} value={day} />)
                                    })}

                                </Picker>
                            </Col>

                            <Col size={1}>
                                <Picker
                                    selectedValue={this.state.selectedYear}
                                    onValueChange={value => this.yearChange(value)}
                                >
                                    {this.state.years.map((year, index) => {
                                        return (<PickerItem key={index} label={year} value={year} />)
                                    })}
                                </Picker>
                            </Col>
                        </Row>

                        <Row style={styles.pickerContainer}>

                            <Col size={1}>
                                <Picker
                                    selectedValue={this.state.selectedHour}
                                    onValueChange={
                                        (itemValue, itemIndex) => this.hourChange(itemValue, itemIndex)}>
                                    {this.state.hours.map((hour, index) => {
                                        return (<PickerItem key={index} label={hour} value={hour} />)
                                    })}
                                </Picker>
                            </Col>

                            <Col size={1}>
                                <Picker
                                    selectedValue={this.state.selectedMinute}
                                    onValueChange={value => this.minuteChange(value)}
                                >
                                    {this.state.minutes.map((minute, index) => {
                                        return (<PickerItem key={index} label={minute} value={minute} />)
                                    })}

                                </Picker>
                            </Col>

                            <Col size={1}>
                                <Picker
                                    selectedValue={this.state.selectedAMPM}
                                    onValueChange={value => this.ampmChange(value)}
                                >
                                    {this.state.ampm.map((ampm, index) => {
                                        return (<PickerItem key={index} label={ampm} value={ampm} />)
                                    })}
                                </Picker>
                            </Col>
                        </Row>


                        <TouchableHighlight>
                            <TextInput numberOfLines={4} bordered placeholder="ማስታወሻ"
                                       style={{
                                           paddingLeft: 5,
                                           justifyContent: 'flex-start',
                                           color:'rgb(88, 88, 88)',
                                           paddingBottom: 10
                                       }}
                                       multiline={true}
                                       onChangeText={(text) => this.state.text = text} defaultValue={this.state.text}/>
                        </TouchableHighlight>
                        <Button title="አስታውስ"
                                style={{
                                    alignSelf: 'center',
                                    marginTop: 15,
                                    height: 50,
                                    paddingLeft: 30,
                                    paddingRight: 30,
                                    borderRadius: 25,
                                }}
                                onPress={() => {
                                    this.saveReminder()
                                }}>
                            <Title>መዝግብ</Title>
                        </Button>
                    </Form>
                </Content>
            </Container>
        );
    }
}

export default ReminderEditor;
