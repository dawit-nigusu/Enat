import React, {Component} from "react";
import {ImageBackground} from "react-native";
import {Container, Text, View} from "native-base";
import {Col, Row} from "react-native-easy-grid";
import styles from "./styles";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import variable from "./../../theme/variables/platform";
import moment from "moment/moment";
import {toEthiopian, toGregorian} from "../../Calendar";
import {retrieveItem, storeItem} from "../../Storage";
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';

const DUE_DATE = 'dueDate';
const cover = require('../../../assets/home.jpg');
const MONTH = ['መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
    'መጋቢት', 'ሚያዚያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ'];

const DueDateBanner = (props) => {
    if (props.isBorn) {
        return (
            <Col style={{
                width: "100%",
                backgroundColor: "rgba(235, 58, 124, 0.5)",
                padding: 7,
            }}>
                <Text style={{
                    color: "white",
                    fontSize: 32,
                    textAlign: "center",
                    textAlignVertical: "center",
                    fontWeight: "bold",
                }}>ልጅሽ ተወልዷል</Text>
            </Col>
        );
    }
    return (
        <Col style={{
            width: "100%",
            backgroundColor: "rgba(235, 58, 124, 0.5)",
            padding: 7,
        }}>
            <Text style={[styles.titleText]}>አሁን ያለሽበት ሳምንት {props.currentWeek} ሳምንት</Text>
            <Text style={[styles.titleText]}>
                ልጅሽን ለመውለድ የቀረሽ {props.weeksRemaining} ሳምንት ከ{props.daysRemaining} ቀን
            </Text>
            <Text style={[styles.titleText]}>ቀኑ {props.birthday}</Text>
        </Col>
    );
};

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            weeksRemaining: 0,
            daysRemaining: 0,
            currentWeek: 0,
            day: "",
            month: "",
            year: "",
            birthday: "",
            isBorn: false,
            isReady: false,
        };
    }

    componentWillMount() {
        this._getDueDate();
        // try{
        //     FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'enat').then(() => {
        //         try {
        //             FileSystem.downloadAsync(
        //                 'http://192.168.98.2:8000/media/test.png',
        //                 FileSystem.documentDirectory + "enat/banner.png"
        //             ).then(({uri}) => {
        //                 storeItem('banner_uri', uri).then(() => {
        //                     console.log('Finished downloading to ', uri);
        //                 }).catch((error) => {
        //                 });
        //             }).catch((error) => {
        //                 console.error(error);
        //             });
        //         }
        //         catch (error){
        //            console.log(error)
        //         }
        //
        //     }).catch(e => {
        //         console.log(e);
        //     });
        // }
        // catch (error)
        // {
        //      console.log(error)
        // }

    }

    _getDueDate() {
        let [y, m, d] = toEthiopian(moment().year(), moment().month() + 1, moment().date());

        retrieveItem(DUE_DATE).then((item) => {
            // console.log(item);
            if (item !== undefined && item != null) {
                if (item.date !== undefined && item.date !== null) {
                    this.setState({day: parseInt(item.date),});
                    if (item.date !== undefined && item.date !== null) {
                        this.setState({month: item.month,});
                        if (item.date !== undefined && item.date !== null) {
                            this.setState({
                                year: parseInt(item.year),
                                birthday: `${MONTH[item.month]} ${item.date}፤ ${item.year}`
                            })
                        } else {
                            this.setState({
                                day: d,
                                month: m - 1,
                                year: y,
                                birthday: `${MONTH[m - 1]} ${d}፤ ${y}`,
                            });
                        }
                    } else {
                        this.setState({
                            day: d,
                            month: m - 1,
                            year: y,
                            birthday: `${MONTH[m - 1]} ${d}፤ ${y}`,
                        });
                    }
                } else {
                    this.setState({
                        day: d,
                        month: m - 1,
                        year: y,
                        birthday: `${MONTH[m - 1]} ${d}፤ ${y}`,
                    });
                }
            } else {
                this.setState({
                    day: d,
                    month: m - 1,
                    year: y,
                    birthday: `${MONTH[m - 1]} ${d}፤ ${y}`,
                });
            }
            this.dueDateCalculator();
        }).catch(function (error) {
            console.error(error.message);
        });

    }

    dueDateCalculator() {
        let [y, m, d] = toGregorian(this.state.year, this.state.month + 1, this.state.day);
        let duration = moment([y, m - 1, d]).diff(moment(), 'days');
        const weeksRemaining = Math.floor(duration / 7);
        const daysRemaining = duration % 7;
        const currentWeek = 40 - weeksRemaining;
        // console.log('current week ' + currentWeek);
        if (duration <= 0 || weeksRemaining > 40 || duration === undefined || isNaN(duration)) {
            this.setState({
                isBorn: true,
                isReady: true,
            });
        } else {
            this.setState({
                weeksRemaining: weeksRemaining,
                daysRemaining: daysRemaining,
                currentWeek: currentWeek,
                isReady: true,
            });
        }
    }


    render() {
        return (
            <Container style={styles.container}>
                <Header  />
                <View style={{
                    flexDirection: "column",
                    flex: 1,
                    marginBottom: variable.footerHeight
                }}>
                    <Row style={{
                        flex: 1,
                        padding: 0
                    }}>
                        <ImageBackground
                            source={cover}
                            style={[styles.homeImage, styles.bottom]}
                        >
                            <DueDateBanner
                                weeksRemaining={this.state.weeksRemaining}
                                daysRemaining={this.state.daysRemaining}
                                currentWeek={this.state.currentWeek}
                                isBorn={this.state.isBorn}
                                birthday={this.state.birthday}
                            />
                        </ImageBackground>
                    </Row>
                </View>
                <Footer navigation={this.props.navigation}/>
            </Container>
        );
    }
}

export default Home;
