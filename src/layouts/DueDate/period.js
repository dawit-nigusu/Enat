import React, {Component} from "react";
import {Container, Content, Text, View, Button} from "native-base";
import {Col, Row} from "react-native-easy-grid";
import styles from "./styles";
import Banner from "../Common/Banner";
import Header from "../Common/Header";
import { ImageJumbotron } from "../Common/Detail";
import { Alert, Picker } from "react-native";
import {storeItem, retrieveItem} from "../../Storage";
import moment from "moment/moment";
import { toEthiopian, toGregorian } from "../../Calendar";
import { DetailHeader } from "../Common/Detail";
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

        this._getDueDate();

    }

    /**
     * get due date if already store or set due date to today
     * on the date picker
     * @private
     */
    _getDueDate = () => {
        let [y, m, d] = toEthiopian(moment().year(), moment().month()+1, moment().date());

        retrieveItem(DUE_DATE).then((item) => {
            if (item !== undefined && item != null) {
                let data = this._calculatePeriodEndDate(item.year, item.month, item.date);
                this.setState({
                    selectedDay: data.date.toString(),
                    selectedMonth: this.state.months[data.month],
                    selectedYear: data.year.toString(),
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

    };

    dayChange = (value) => {
          this.setState({selectedDay: value});
          // console.log('selected day ' + value);
    };

    monthChange = (value, index) => {
        this.setState({selectedMonth:value});
        // console.log('selected month ' + value);
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
    };

    yearChange = (value) => {
        this.setState({selectedYear:value});
        // console.log('selected year ' + value);
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
    };

    /**
     * update due date, show alert message and navigate to home screen
     * @private
     */
    _calculateDueDate = (year, month, day) => {
        let [y, m, d] = toGregorian(year, month + 1, day);
        // console.log('ethiopian date');
        // console.log({year, month, day});
        // console.log('gregorian date');
        // console.log({y, m, d});
        if( m < 1 ) {
            m  = 11;
        }
        let gregorian_date = moment([y, m - 1, d]).add(40, 'weeks');
        // console.log(gregorian_date);
        let [due_year, due_month, due_date] = toEthiopian(
            gregorian_date.year(),
            gregorian_date.month() + 1,
            gregorian_date.date()
        );
        // console.log('converted gregorian date');
        // console.log({"year":gregorian_date.year(), "month":gregorian_date.month(), "date":gregorian_date.date()});
        // console.log('converted ethiopian date');
        // console.log({due_year, due_month, due_date});
        return {
            date: due_date,
            month: due_month - 1,
            year: due_year,
        };
    };

    _calculatePeriodEndDate = (year, month, date) => {
        let [y, m, d] = toGregorian(year, month + 1, date);
        if( m < 1 ) {
            m  = 11;
        }
        let gregorian_date = moment([y, m - 1, d]).subtract(40, 'weeks');
        let [due_year, due_month, due_date] = toEthiopian(
            gregorian_date.year(),
            gregorian_date.month() + 1,
            gregorian_date.date()
        );
        return {
            date: due_date,
            month: due_month - 1,
            year: due_year,
        };
    };

    _saveDueDate = () => {
        let year = parseInt(this.state.selectedYear);
        let month = parseInt(this.state.months.indexOf(this.state.selectedMonth));
        let day = parseInt(this.state.selectedDay);

        const data = this._calculateDueDate(year, month, day);

        // console.log('Ethiopian due date');
        // console.log(data);

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
    };

    render() {
        return (
            <Container style={styles.container}>
                <Header />
                <DetailHeader text='የመውለጃ ቀንሽን አስቢ' onPress={() => this.props.navigation.navigate('DueDate')}/>
                <Content>
                    <ImageJumbotron image={cover}/>
                    <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                        <Row style={styles.welcomeContainer}>
                            <Text style={styles.welcome}>
                                የመጨረሻ የወር አበባ ቀን ምረጪ
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
                        </Col>

                        <Banner />
                    </View>
                </Content>
            </Container>
        );
    }
}

export default DueDate;
