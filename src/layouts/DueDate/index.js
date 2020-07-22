import React, {Component} from "react";
import {Container, Content, Text, View, Button } from "native-base";
import {Col, Row} from "react-native-easy-grid";
import styles from "./styles";
import Banner from "../Common/Banner";
import Header from "../Common/Header";
import { ImageJumbotron } from "../Common/Detail";
import { Picker, Alert } from 'react-native';
import {storeItem, retrieveItem} from "../../Storage";
import moment from "moment/moment";
import { toEthiopian } from "../../Calendar";
const PickerItem = Picker.Item;
const cover = require('../../../assets/sidemenu/duedate.jpg');

const DUE_DATE = 'dueDate';

class DueDate extends Component {
    constructor(props) {
        super(props);
        this.state = {
          months : ['መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
            'መጋቢት', 'ሚያዚያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'],
          days: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
            '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
          years: ['2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'],
          selectedMonth: '',
          selectedDay: '',
          selectedYear: ''
        };

        this.dayChange = this.dayChange.bind(this);
        this.monthChange = this.monthChange.bind(this);
        this.yearChange = this.yearChange.bind(this);
        this._gotoDueDateFromPeriodScreen = this._gotoDueDateFromPeriodScreen.bind(this);
        this._saveDueDate = this._saveDueDate.bind(this);
        this._getDueDate = this._getDueDate.bind(this);

    }

    componentWillMount() {
        this._getDueDate();
    }

    /**
     * get due date if already store or set due date to today
     * on the date picker
     * @private
     */
    _getDueDate() {
        let [y, m, d] = toEthiopian(moment().year(), moment().month()+1, moment().date());

        retrieveItem(DUE_DATE).then((item) => {
            if (item !== undefined && item != null) {
                this.setState({
                    selectedDay: item.date.toString(),
                    selectedMonth: this.state.months[item.month],
                    selectedYear: item.year.toString(),
                });
            } else {
                this.setState({
                    selectedDay: d.toString(),
                    selectedMonth: this.state.months[m-1],
                    selectedYear: y.toString(),
                });
            }
        }).catch(function (error) {
            console.error(error.message);
        });

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

        }else {
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

    /**
     * update due date, show alert message and navigate to home screen
     * @private
     */
    _saveDueDate() {
        let data = {
            date: this.state.selectedDay,
            month: this.state.months.indexOf(this.state.selectedMonth),
            year: this.state.selectedYear,
        };

        storeItem(DUE_DATE, data).then(() => {
            Alert.alert(
                'ተሳክቷል',
                'የመውለጃ ቀንሽ አዲስ ባስገባሽው ቀን ዘምኗል፡፡',
                [
                    {text: 'አሺ', onPress: () => this.props.navigation.navigate("Home")},
                ]
            );
        }).catch((error) => {
            console.error(error.message);
            Alert.alert(
                'ስህተት',
                "በተፈጠረ ስህተት ምክንያት የመውለጃ ቀንሽ አዲስ ባስገባሽው አልተቀየረም፡፡ " +
                "ትንሽ ቆይተሽ በድጋሚ ሞክሪ",
                [
                    {text: 'አሺ', onPress: () => this.props.navigation.navigate("Home")},
                ]
            );
        });

    }

    _gotoDueDateFromPeriodScreen() {
        this.props.navigation.navigate("Period");
    }

    render() {

        return (
            <Container style={styles.container}>
                <Header />
                <Content>
                    <ImageJumbotron image={cover}/>
                    <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                        <Row style={{padding:10}}>
                            <Text>ይህ የመውለጃ ቀንሽን እና ምን ያህል ሳምንት እንደቀረሽ ለማወቅ የሚረዳሽ የቀን ማስያ ነው።</Text>
                        </Row>
                        
                        <Row style={styles.welcomeContainer}>
                            <Text style={styles.welcome}>
                                የመውለጃ ቀንሽን ምረጪ
                            </Text>
                        </Row>

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

                        <Col style={styles.buttonContainer}>
                            <Button block primary style={styles.mb15} onPress={this._saveDueDate}>
                                <Text>አስገቢ </Text>
                            </Button>
                            <Button block dark
                                    style={[styles.mb15, {backgroundColor: '#4e4e4e'}]}
                                    onPress={this._gotoDueDateFromPeriodScreen}>
                                <Text>አላውቀውም </Text>
                            </Button>
                        </Col>

                        <Banner />
                    </View>
                </Content>
            </Container>
        );
    }
}

export default DueDate;
