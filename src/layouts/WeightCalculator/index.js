import React, {Component} from "react";
import {
    Container, Content, Text, View, Form, Button, Item, Label, Input, Segment
} from "native-base";
import {Col, Row} from "react-native-easy-grid";
import styles from "./styles";
import Banner from "../Common/Banner";
import Header from "../Common/Header";
import { ImageJumbotron } from "../Common/Detail";
import { Switch, Picker, Alert } from "react-native";

const PickerItem = Picker.Item;
const cover = require('../../../assets/sidemenu/weight.jpg');

class WeightCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'የክብደት ማሰቢያ',
            message: '',
            weight: 0,
            height: 0,
            bmi: 0,
        };
    }

    _calculateWeight = () => {
        if(this.state.weight <= 0 || this.state.weight >= 200 ||
            this.state.height <= 0 || this.state.height >= 3 ) {
            Alert.alert(
                'ስህተት',
                "ትክክለኛ የሆነውን የክብደት መጠን እና ቁመት መጠን ማስገባት አለብሽ፡፡",
                [
                    { text: 'እሺ' },
                ]
            );
        } else {
            let bmi = this._calculateBMI(this.state.height, this.state.weight);

            if( bmi < 18.5) {
                this.setState({
                    message: `የክብደት መጥን፡ ዝቅተኛ ክብደት፤
                    ጠቅላላ የሚመከር የክብደት ጭማሪ በዘጠኝ ወራት ውስጥ ከ12.7ኪግ እስከ 18.14ኪግ፡፡
                    ይህ ማለትም በሁለተኛው 3 ወራት እና በሶስተኛው ሶስት ወራት(ከ3ወር እስከ 6ወር) በሳምንት በአማካይ 0.59ኪግ መጨመር ይመከራል፡፡`
                })
            } else if( bmi <= 24.9) {
                this.setState({
                    message: `የክብደት መጥን፡ መደበኛ ክብደት፤
                    ጠቅላላ የሚመከር የክብደት ጭማሪ በዘጠኝ ወራት ውስጥ ከ11.34ኪግ እስከ 15.87ኪግ፡፡
                    ይህ ማለትም በሁለተኛው 3 ወራት እና በሶስተኛው ሶስት ወራት(ከ3ወር እስከ 6ወር) በሳምንት በአማካይ 0.59ኪግ መጨመር ይመከራል፡፡`
                })
            } else if( bmi <= 29.9) {
                this.setState({
                    message: `የክብደት መጥን፡ ከፍተኛ ክብደት፤
                    ጠቅላላ የሚመከር የክብደት ጭማሪ በዘጠኝ ወራት ውስጥ ከ6.8ኪግ እስከ 11.34ኪግ፡፡
                    ለመንታ እርግዝና ከ16.78ኪግ እስከ 24.49ኪግ የክብደት መጠን መጨመር ይመከራል፡፡
                    ይህ ማለትም በሁለተኛው 3 ወራት እና በሶስተኛው ሶስት ወራት(ከ3ወር እስከ 6ወር) በሳምንት በአማካይ ከ0.36ኪግ እስከ 0.45ኪግ መጨመር ይመከራል፡፡`
                })
            } else {
                this.setState({
                    message: `የክብደት መጥን፡ በጣም ከፍተኛ ክብደት፤
                    ጠቅላላ የሚመከር የክብደት ጭማሪ በዘጠኝ ወራት ውስጥ ከ4.99ኪግ እስከ 9.07ኪግ፡፡
                    ለመንታ እርግዝና ከ11.34ኪግ እስከ 19.05ኪግ የክብደት መጠን መጨመር ይመከራል፡፡
                    ይህ ማለትም በሁለተኛው 3 ወራት እና በሶስተኛው ሶስት ወራት(ከ3ወር እስከ 6ወር) በሳምንት በአማካይ ከ0.18ኪግ እስከ 0.27ኪግ መጨመር ይመከራል፡፡`
                })
            }
        }
    }

    _calculateBMI = (h, w) => {
        return (w / (h*h));
    }

    //weight conversion
    _poundToKilo(pd) {
        return (pd * 0.4535924);
    }

    _handleWeightInput = (data) => {
        if (data === "") {
            return;
        }
        let weight = parseFloat(data);
        if (Number.isFinite(weight)) {
            if (weight > 200 || weight < 0)  {
                Alert.alert(
                    'ስህተት',
                    "ያስገባሽው ክብደት መጠን የተሳሳተ ነው፡፡ የክብደት መጠን የሚቀበለው ከ0 እስከ 200 ድረስ ያሉ ቁጥሮችን ብቻ ነው፡፡ ",
                    [
                        { text: 'እሺ' },
                    ]
                );
            } else {
                this.setState({
                    weight:weight
                });
            }
        } else {
            Alert.alert(
                'ስህተት',
                "የክብደት መጠን የሚቀበለው ከ0 እስከ 200 ድረስ ያሉ ቁጥሮችን ብቻ ነው፡፡ ",
                [
                    { text: 'እሺ' },
                ]
            );
        }
    }

    _handleHeightInput = (data) => {
        if (data === "") {
            return;
        }
        let height = parseFloat(data);
        if (Number.isFinite(height)) {
            if (height > 3.0 || height < 0)  {
                Alert.alert(
                    'ስህተት',
                    "ያስገባሽው ቁመት መጠን የተሳሳተ ነው፡፡ ",
                    [
                        { text: 'እሺ' },
                    ]
                );
            } else {
                this.setState({
                    height:height
                });
            }
        } else {
            Alert.alert(
                'ስህተት',
                "የቁመት መጠን የሚቀበለው ከ0 እስከ 3.0ሜ ድረስ ያሉ ቁጥሮችን ብቻ ነው፡፡",
                [
                    { text: 'እሺ' },
                ]
            );
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Header />
                <Content>
                    <ImageJumbotron image={cover}/>
                    <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                        <Row style={styles.welcomeContainer}>
                            <Text style={styles.welcome}>
                                {this.state.title}
                            </Text>
                        </Row>

                        <Row>
                            {this.state.message !== '' ? <Text style={{padding:10}}>
                                {this.state.message}
                            </Text>: null}
                        </Row>

                        <Form>
                            <Item inlineLabel>
                                <Label>ክብደትሽ በኪ.ግ.</Label>
                                <Input
                                    placeholder="ለምሳሌ 53"
                                    keyboardType="decimal-pad"
                                    onChangeText={(data) => this._handleWeightInput(data)}/>
                            </Item>
                            <Item inlineLabel>
                                <Label>ቁመትሽ በሜ.</Label>
                                <Input
                                    placeholder="ለምሳሌ 1.53"
                                    keyboardType="number-pad"
                                    onChangeText={(data) => this._handleHeightInput(data)}/>
                            </Item>
                        </Form>

                        <Col style={styles.buttonContainer}>
                            <Button block primary
                                    onPress={()=> this._calculateWeight()}
                                    style={styles.mb5}>
                                <Text>አስብ</Text>
                            </Button>
                        </Col>


                        <Banner />
                    </View>
                </Content>
            </Container>
        );
    }
}

export default WeightCalculator;
