import React, {Component} from "react";
import {
    Container, Content, Button, Icon, Text, View, H3
} from "native-base";
import {Row} from "react-native-easy-grid";
import styles from "./styles";
import Table from "./table";
import Header from "../Common/Header";
import {retrieveItem, storeItem} from "../../Storage";
import {DetailHeader} from "../Common/Detail";
import CustomIcon from "../Common/Icons";
import moment from 'moment/moment';
import {toEthiopian, toGregorian} from "../../Calendar";

const maxAllowedDuration = 2;

const TimerMixin = require('react-timer-mixin');
const reactMixin = require('react-mixin');

const Box = (props) => {
    let currentStyle = props.active ? styles.dotActive : styles.dotInactive;
    return (
        <View style={[styles.dot, currentStyle]}/>
    );
};

class KickCounter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kickCounterStartTime: null,
            kickCounter: 0,
            length: null,
            now: new Date(),
            kickCounts: [],
            data: [],
            interval: null,
            months: ['መስከረም', 'ጥቅምት', 'ህዳር', 'ታህሳስ', 'ጥር', 'የካቲት',
                'መጋቢት', 'ሚያዚያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜ']
        };

        retrieveItem('kickCounterStartTime').then((kickCounterStartTimeString) => {
            if (kickCounterStartTimeString != undefined && kickCounterStartTimeString != null) {
                let kickCounterStartTime = new Date(Date.parse(kickCounterStartTimeString));
                let hours = (this.state.now - kickCounterStartTime) / 3600000;
                if (hours >= maxAllowedDuration) {
                    retrieveItem('kickCounter').then((kickCounter) => {
                        if (kickCounter > 0) {
                            retrieveItem('kickLength').then((kickLength) => {
                                if (this.state.kickCounts == null || this.state.kickCounts.length == 0) {
                                    retrieveItem('kickCounts').then((kickCounts) => {
                                        if (kickCounts != undefined && kickCounts != null) {
                                            console.log("kickcounts saved ", kickCounts);
                                            this.setState({
                                                kickCounts: kickCounts
                                            }, this.updateData);
                                            this.saveKickCount(kickCounts, kickCounterStartTime, kickCounter, kickLength);
                                        }
                                        else {
                                            this.setState({
                                                kickCounts: []
                                            }, this.updateData);
                                            this.saveKickCount([], kickCounterStartTime, kickCounter, kickLength);
                                        }
                                    }).catch((error) => {

                                    });
                                }
                                else {
                                    this.saveKickCount(this.state.kickCounts, kickCounterStartTime, kickCounter, kickLength);
                                }
                            }).catch((error) => {

                            });
                        }
                    }).catch((error) => {
                    });
                }
                else {
                    this.setState({
                        kickCounterStartTime: kickCounterStartTime
                    }, () => {
                        retrieveItem('kickCounter').then((kickCounter) => {
                            if (kickCounter > 0) {
                                this.setState({
                                    kickCounter: kickCounter
                                }, () => {
                                    retrieveItem('kickLength').then((kickLength) => {
                                        if (kickLength != undefined && kickLength != null) {
                                            this.setState({
                                                length: kickLength
                                            }, () => {
                                                if (this.state.interval == null) {
                                                    this.setState({
                                                        interval: this.setInterval(() => {
                                                            if (this.state.kickCounterStartTime != null) {
                                                                const now = new Date();
                                                                this.setState({
                                                                    now: now
                                                                });
                                                                let hours = (now - this.state.kickCounterStartTime) / 3600000;
                                                                if (hours >= maxAllowedDuration) {
                                                                    this.saveKickCount(this.state.kickCounts, this.state.kickCounterStartTime, this.state.kickCounter, this.state.length);
                                                                    this.setState({
                                                                        kickCounter: 0,
                                                                        kickCounterStartTime: null,
                                                                        length: null
                                                                    }, () => {
                                                                        storeItem('kickCounterStartTime', null).then(() => {
                                                                        }).catch((error) => {

                                                                        });

                                                                        storeItem('kickCounter', this.state.kickCounter).then(() => {
                                                                        }).catch((error) => {

                                                                        });

                                                                        storeItem('kickLength', null).then(() => {
                                                                        }).catch((error) => {

                                                                        });
                                                                        this.clearInterval(this.state.interval);
                                                                        this.setState({
                                                                            interval: null
                                                                        })
                                                                    });
                                                                }
                                                            }
                                                        }, 1000)
                                                    });
                                                }
                                            });
                                        }
                                    }).catch((error) => {

                                    });
                                });
                            }
                        }).catch((error) => {
                        });
                    });
                }
            }
        }).catch((error) => {

        });
        this.setTimeout(() => {
            this.getKickCounts();
        }, 100);
    }

    getKickCounts() {
        if (this.state.kickCounts == null || this.state.kickCounts.length == 0) {
            retrieveItem('kickCounts').then((kickCounts) => {
                if (kickCounts != undefined && kickCounts != null) {
                    this.setState({
                        kickCounts: kickCounts
                    }, this.updateData);
                }
                else {
                    this.setState({
                        kickCounts: []
                    }, this.updateData);
                }
            }).catch((error) => {

            });
        }
    }

    saveKickCount(kickCounts, kickCounterStartTime, kickCounter, length) {
        const kickCount = {
            kickCounterStartTime: kickCounterStartTime.toString(),
            kickCounter: kickCounter,
            length: length
        };
        kickCounts.push(kickCount);
        storeItem('kickCounts', kickCounts).then(() => {
        }).catch((error) => {

        });

        this.updateData();
    }

    kick() {
        if (this.state.kickCounter == 0) {
            this.setState({
                now: new Date(),
                kickCounterStartTime: new Date(),
                kickCounter: this.state.kickCounter + 1,
                length: "0 ሰዓት ከ0 ደቂቃ ከ0 ሴኮንድ"
            }, () => {
                storeItem('kickCounterStartTime', this.state.kickCounterStartTime.toString()).then(() => {
                }).catch((error) => {

                });

                storeItem('kickCounter', this.state.kickCounter).then(() => {
                }).catch((error) => {

                });

                storeItem('kickLength', this.state.length).then(() => {
                }).catch((error) => {

                });

                if (this.state.interval == null) {
                    this.setState({
                        interval: this.setInterval(() => {
                            if (this.state.kickCounterStartTime != null) {
                                const now = new Date();
                                this.setState({
                                    now: now
                                });
                                let hours = (now - this.state.kickCounterStartTime) / 3600000;
                                if (hours >= maxAllowedDuration) {
                                    this.saveKickCount(this.state.kickCounts, this.state.kickCounterStartTime, this.state.kickCounter, this.state.length);
                                    this.setState({
                                        kickCounter: 0,
                                        kickCounterStartTime: null,
                                        length: null
                                    }, () => {
                                        storeItem('kickCounterStartTime', null).then(() => {
                                        }).catch((error) => {

                                        });

                                        storeItem('kickCounter', this.state.kickCounter).then(() => {
                                        }).catch((error) => {

                                        });

                                        storeItem('kickLength', null).then(() => {
                                        }).catch((error) => {

                                        });
                                        this.clearInterval(this.state.interval);
                                        this.setState({
                                            interval: null
                                        })
                                    });
                                }
                            }
                        }, 1000)
                    });
                }
            });
        }
        else if (this.state.kickCounter >= 9) {
            let date = KickCounter.getDateWithoutZero(this.state.now, this.state.kickCounterStartTime);
            let length = date.hours + " ሰዓት ከ" + date.minutes + " ደቂቃ ከ" + date.seconds + " ሴኮንድ";
            this.setState({
                kickCounter: 10,
                length: length,
            }, () => {
                this.saveKickCount(this.state.kickCounts, this.state.kickCounterStartTime, this.state.kickCounter, this.state.length);
                this.setState({
                    kickCounter: 0,
                    kickCounterStartTime: null,
                    length: null
                }, () => {
                    storeItem('kickCounterStartTime', null).then(() => {
                    }).catch((error) => {

                    });

                    storeItem('kickCounter', this.state.kickCounter).then(() => {
                    }).catch((error) => {

                    });

                    storeItem('kickLength', null).then(() => {
                    }).catch((error) => {

                    });
                    this.clearInterval(this.state.interval);
                    this.setState({
                        interval: null
                    })
                });
            });
        }
        else {
            const now = new Date();
            this.setState({
                now: now
            });
            let hours = (now - this.state.kickCounterStartTime) / 3600000;
            if (hours < maxAllowedDuration) {
                const kickCounter = this.state.kickCounter + 1;
                let date = KickCounter.getDateWithoutZero(now, this.state.kickCounterStartTime);
                const length = date.hours + " ሰዓት ከ" + date.minutes + " ደቂቃ ከ" + date.seconds + " ሴኮንድ";
                this.setState({
                    kickCounter: this.state.kickCounter + 1,
                    length: length
                }, () => {
                    storeItem('kickCounter', this.state.kickCounter).then(() => {
                    }).catch((error) => {

                    });

                    storeItem('kickLength', this.state.length).then(() => {
                    }).catch((error) => {

                    });
                });
            }
        }
    }

    static getDate(dateFuture, dateNow) {
        let delta = Math.abs(dateFuture - dateNow) / 1000;
        const hours = ("0" + Math.floor(delta / 3600)).slice(-2);
        delta -= hours * 3600;
        const minutes = ("0" + Math.floor(delta / 60) % 60).slice(-2);
        delta -= minutes * 60;
        const seconds = ("0" + Math.floor(delta % 60)).slice(-2);

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
    }

    static getDateWithoutZero(dateFuture, dateNow) {
        let delta = Math.abs(dateFuture - dateNow) / 1000;
        const hours = (Math.floor(delta / 3600));
        delta -= hours * 3600;
        const minutes = (Math.floor(delta / 60) % 60);
        delta -= minutes * 60;
        const seconds = (Math.floor(delta % 60));

        return {
            hours: hours,
            minutes: minutes,
            seconds: seconds,
        }
    }

    updateData() {
        const kickCounts = this.state.kickCounts;
        const data = [];
        for (let i = 0; i < kickCounts.length; i++) {
            const gregorian_date = moment(new Date(Date.parse(kickCounts[i].kickCounterStartTime)));
            let [y, m, d] = toEthiopian(
                gregorian_date.year(),
                gregorian_date.month() + 1,
                gregorian_date.date()
            );
            data.push({
                date: this.state.months[m - 1] + " " + d + " ፣ " + y,
                kick: kickCounts[i].kickCounter,
                len: kickCounts[i].length,
                time: moment(new Date(Date.parse(kickCounts[i].kickCounterStartTime))).format("hh:mm")
            })
        }

        this.setState({
            data: data
        });
    }

    render() {
        const navigation = this.props.navigation;

        let boxes = [];
        for (let i = 0; i < 10; i++) {
            boxes.push(
                <Box key={i} active={i < this.state.kickCounter}/>
            )
        }
        const date = KickCounter.getDate(this.state.now, this.state.kickCounterStartTime);
        let ui = "00:00:00";
        if (this.state.kickCounter > 0) {
            ui = date.hours + ":" + date.minutes + ":" + date.seconds;
        }
        const data = this.state.data;

        return (
            <Container style={styles.container}>
                <Header />
                <Content>
                    <Row style={{
                        marginTop: 10
                    }}>
                        <H3 style={{alignSelf: 'center', paddingLeft: 10, marginBottom: 5}}>
                            የልጅዎን እንቅስቃሴ ይቆጣጠሩ
                        </H3>
                    </Row>
                    <Row style={styles.progressRow}>
                        {boxes}
                    </Row>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginBottom: 10
                    }}>
                        <Button transparent
                                style={{
                                width: 140,
                                height: 140,
                                alignSelf: 'center',
                                borderRadius: 140,
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 2,

                            }}
                                onPress={() => {
                                this.kick()
                            }}
                        >
                            <CustomIcon name="fingerprint" color="#be1f57" size={130}/>
                        </Button>

                        <View style={{
                            width: 70,
                            height: 70,
                            backgroundColor: "#fdecf3",
                            alignSelf: 'flex-end',
                            borderRadius: 70,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginLeft: -20
                        }}>
                            <Text style={{
                                color: '#be1f57',
                                fontWeight: 'bold',
                                fontSize: 28
                            }}>{this.state.kickCounter}</Text>
                        </View>
                    </View>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: 19
                        }}>
                            {ui}
                        </Text>
                    </View>
                    <Table style={styles.mb10} dataSource={data}/>
                    <View style={{padding: 10}}>
                        <Button block rounded danger onPress={() => {
                            this.setState({
                                kickCounter: 0,
                                kickCounterStartTime: null,
                                length: null
                            }, () => {
                                storeItem('kickCounterStartTime', null).then(() => {
                                }).catch((error) => {

                                });

                                storeItem('kickCounter', this.state.kickCounter).then(() => {
                                }).catch((error) => {

                                });

                                storeItem('kickLength', null).then(() => {
                                }).catch((error) => {

                                });
                                this.clearInterval(this.state.interval);
                                this.setState({
                                    interval: null
                                })
                                    });
                        }}><Text>ሰርዝ</Text></Button>
                    </View>
                </Content>
            </Container>
        );
    }
}

reactMixin(KickCounter.prototype, TimerMixin);

export default KickCounter;
