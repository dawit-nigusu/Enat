import React, {Component} from "react";
import {Container, Content, Text, View, Segment, Button} from "native-base";
import {Col, Row} from "react-native-easy-grid";
import styles from "./styles";
import Table from "./table";
import Banner from "../Common/Banner";
import Header from "../Common/Header";
import { ImageJumbotron } from "../Common/Detail";
import { Picker } from "react-native";
import {storeItem, retrieveItem} from "../../Storage";
import moment from 'moment/moment';
import {toGregorian, toEthiopian} from "../../Calendar";
const PickerItem = Picker.Item;

const DOB = 'DOB'; //date of birth
const DOV = 'DOV'; // the frist date of vaccination for the mother
const child_vaccination_days = [0, 6, 10, 14, 26, 39];
const mother_vaccination_days = [0, 4, 30, 82, 134];
const mother_vaccine_message = [
    'በመጀመሪያዎቹ ክትትሎችሽ እንደ ሐኪምሽ ትዕዛዝ',
    'ከቲቲ 1 አራት  ሳምንት በሁዋላ ',
    'ከቲቲ 2 ስድስት ወር በሁዋላ',
    'ከቲቲ 3 ቢያንስ 1 አመት በሁዋላ ወይም ቀጣይ እርግዝና',
    'ከቲቲ 4 ቢያንስ አንድ አመት በሁዋላ ካልሆነም በቀጣይ እርግዝና',
];
const child_vaccines = [
    'BCG, OPV0',
    'DTP-HepB1-Hib1 ,OPV1,PCV1, Rota1',
    '3DTP-HepB2-Hib2,OPV2,PCV2, Rota2 ',
    'DTP-HepB3-Hb3, OPV3, PCV3, IPV',
    'Measles',
];
const child_vaccine_day_desc = [
    'ስትወለጂ',
    'ስድስት ሳምንት',
    'አስር ሳምንት',
    'አስራ አራት ሳምንት',
    'ዘጠኝ ወር',
];

const cover = require('../../../assets/sidemenu/vaccination.jpg');

class Vaccination extends Component {
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
            selectedYear: '',
            dob: [],
            firstVaccine: [],
            data: [],
            seg: 1,
            title: 'የልጅሽ ውልደት ቀን',
        };

        this.dayChange = this.dayChange.bind(this);
        this.monthChange = this.monthChange.bind(this);
        this.yearChange = this.yearChange.bind(this);
        this._ChildSegment = this._ChildSegment.bind(this);
        this._MotherSegment = this._MotherSegment.bind(this);
        this._calculateVaccination = this._calculateVaccination.bind(this);
        this._getVaccinationList = this._getVaccinationList.bind(this);
        this._receiveDate = this._receiveDate.bind(this);
        this._saveDate = this._saveDate.bind(this);
        this._init = this._init.bind(this);


    }

    componentDidMount() {
        this._init();
    }

    _init() {
        this._receiveDate(DOB);
    }

    dayChange(value) {
          this.setState({selectedDay: value});
    }

    monthChange(value, index) {
        this.setState({selectedMonth:value});
        if (index === 12){
            if (this.state.selectedYear % 4 === 3){
              this.setState({
                days: ['1', '2', '3', '4', '5', '6'],
              });
            } else {
              this.setState({
                days: ['1', '2', '3', '4', '5'],
              });
            }

        } else {
            this.setState({
              days: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10',
                '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
                '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            });
        }
    }

    yearChange(value) {
        this.setState({selectedYear:value});
        if (this.state.selectedMonth === 'ጳጉሜ'){
            if (value % 4 === 3){
                this.setState({
                    days: ['1', '2', '3', '4', '5', '6'],
                });
            } else {
                this.setState({
                    days: ['1', '2', '3', '4', '5'],
                });
            }
        }
    }

    _calculateVaccination() {

        this._getVaccinationList();

        this._saveDate();

    }

    /**
     * retrieve stored date and set it to selected date or
     * set today to selected date
     * @param key = can be dob for child and dov for mother
     * @private
     */
    _receiveDate(key) {
        let [y, m, d] = toEthiopian(moment().year(), moment().month()+1, moment().date());

        retrieveItem(key).then((item) => {
            if (item !== undefined && item != null) {
                this.setState({
                    selectedDay: item.date,
                    selectedMonth: this.state.months[item.month],
                    selectedYear: item.year,
                });
            } else {
                this.setState({
                    selectedDay: d.toString(),
                    selectedMonth: this.state.months[m-1],
                    selectedYear: y.toString(),
                });
            }

            this._getVaccinationList();

        }).catch(function (error) {
            console.error(error.message);
        });
    }

    _saveDate() {
        let data = {
            date: this.state.selectedDay,
            month: this.state.months.indexOf(this.state.selectedMonth),
            year: this.state.selectedYear,
        };

        if (this.state.seg === 1) {
            storeItem(DOB, data).then(() => {
            }).catch((error) => {
                console.error(error.message);
            });
        } else {
            storeItem(DOV, data).then(() => {
            }).catch((error) => {
                console.error(error.message);
            });
        }

    }

    /**
     * generate vaccination date list
     * @private
     */
    _getVaccinationList() {
        let [y, m, d] = toGregorian(
            parseInt(this.state.selectedYear),
            this.state.months.indexOf(this.state.selectedMonth) + 1,
            parseInt(this.state.selectedDay)
        );
        let data = [];
        const vaccination_days = this.state.seg === 1 ? child_vaccination_days : mother_vaccination_days;
        vaccination_days.map((week, index) => {
            let vaccine = '';
            if(this.state.seg === 1){
                vaccine = child_vaccines[index];
            } else {
                vaccine = `ቲቲ ${index+1}`;
            }
            let gregorian_date = moment([y, m-1, d]).add(week, 'weeks');
            let [vaccine_year, vaccine_month, vaccine_date] = toEthiopian(
                gregorian_date.year(),
                gregorian_date.month() + 1,
                gregorian_date.date()
            );
            data.push({
                vaccine:vaccine,
                date: `${this.state.months[vaccine_month-1]} ${vaccine_date} ፤ ${vaccine_year} - ${this.state.seg === 2 ? mother_vaccine_message[index] : child_vaccine_day_desc[index]}`,
                merge: false,
            })
        });
        if(this.state.seg === 2) {
            data.push({
                vaccine: 'ቫይታሚን ኤ ለሁሉም ለወለዱ እናቶች',
                merge: true
            });
        } else {
            data.push({
                vaccine: 'ቫይታሚን ኤ ከ6 እስከ 59 ወር',
                merge: true
            })
        }

        this.setState({
            data: data,
        });
    }

    /**
     * handle segement for the child
     * @private
     */
    _ChildSegment() {
        this.setState({
            seg: 1,
            title: 'የልጅሽ ውልደት ቀን',
        });

        this._receiveDate(DOB);
    }

    /**
     * hancle segement for the mother
     * @private
     */
    _MotherSegment() {
        this.setState({
            seg: 2,
            title: 'የመጀመሪያ ክትባትሽን የወሰድሽበት ቀን',
        });

        this._receiveDate(DOV);
    }

    render() {
        return (
            <Container style={styles.container}>
            <Header />
                <Segment>
                  <Button
                    first
                    active={this.state.seg === 1 ? true : false}
                    onPress={() => this._ChildSegment()}
                  >
                    <Text>ለልጅሽ</Text>
                  </Button>
                  <Button
                      last
                      active={this.state.seg === 2 ? true : false}
                      onPress={() => this._MotherSegment()}
                  >
                    <Text>ላንቺ</Text>
                  </Button>
                </Segment>

                <Content>
                    <ImageJumbotron image={cover}/>
                    <View style={{justifyContent: 'center', flexDirection: 'column'}}>

                        <Row style={{padding:10}}>
                            <Text>ይህ የቀን ማስያ ክትባት መቼ መከተብ እንዳለብሽ ይነግርሻል</Text>
                        </Row>

                        <Row style={styles.welcomeContainer}>
                            <Text style={styles.welcome}>
                                {this.state.title}
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
                            <Button block primary
                                    style={styles.mb15}
                                    onPress={this._calculateVaccination}>
                                <Text>የክትባት ቀናትን አስብ</Text>
                            </Button>
                        </Col>

                        <Table dataSource={this.state.data}/>

                        { this.state.seg === 2 ?
                            <Col style={{padding: 10}}>
                                <Text>ቲቲ=  ቴታነስ ቶክሶይድ</Text>
                                <Text>ቲቲ አምስት ግዜ ከተከተብሽ ልጅ ለመዉለጃ እድሜሽ በሙሉ ያገለግላል።</Text>
                            </Col>
                        : null }
                    </View>
                    <Banner />
                </Content>
            </Container>
        );
    }
}

export default Vaccination;
