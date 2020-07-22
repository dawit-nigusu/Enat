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
const cover = require('../../../assets/sidemenu/feed.jpg');

class WeightCalculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seg: 1,
            title: 'የልጅሽ አመጋገብ አስቢ',
            message: '',
            motherMilk: true,
            dailyIntake: 450,
            weight: 0,
            selectedAge: 'ከ1-4 ቀን',
            selectedAgeIndex: 0,
            ages: ['ከ1-4 ቀን', 'ከ5ቀን - 3ወር', 'ከ3-6 ወር', 'ከ6 - 12 ወር'],
        };
    }

    _breastMilkSegment = () => {
        this.setState({
            seg: 1,
            message: '',
            motherMilk: true,
            dailyIntake: 450,
            selectedAge: 'ከ1-4 ቀን',
            selectedAgeIndex: 0,
            ages: ['ከ1-4 ቀን', 'ከ5ቀን - 3ወር', 'ከ3-6 ወር', 'ከ6 - 12 ወር'],
        });
    }

    _powderMilkSegment = () => {
        this.setState({
            seg: 2,
            message: '',
            motherMilk: false,
            dailyIntake: 450,
            selectedAge: 'ከ1-4 ቀን',
            selectedAgeIndex: 0,
            ages: ['ከ1-4 ቀን', 'ከ5ቀን - 3ወር', 'ከ3-6 ወር', 'ከ6 - 12 ወር'],
        });
    }

    _calculateWeight = () => {
        if(this.state.weight <= 0) {
            Alert.alert(
                'ስህተት',
                "ትክክለኛ የሆነውን የልጅሽን የክብደት መጠን ማስገባት አለብሽ፡፡",
                [
                    { text: 'እሺ' },
                ]
            );
        } else {
            if(this.state.motherMilk) {
                if(this.state.weight >= 2.5) {
                    let intake = Math.floor(this.state.weight * 150);
                    this.setState({message:`${intake}ሚሊ በየቀኑ ለልጅሽ ማጠጣት አለብሽ፡፡ ይህ ማለት በአማካይ ${Math.floor(intake/8)}ሚሊ 8 የተለያዩ ጊዜያት ማጥባት አለብሽ ማለት ነው፡፡`});
                } else {
                    let totalintake = Math.floor(this.state.weight * 200);
                    let intake = totalintake - 60;
                    this.setState({message:`${intake}ሚሊ በየቀኑ ለልጅሽ ማጠጣት አለብሽ፡፡ መጀመር 60 ሚ.ሊ ማጥባት ቀጥሎም፤ በአማካይ ${Math.floor(intake/7)}ሚሊ 7 የተለያዩ ጊዜያት ማጥባት አለብሽ ማለት ነው፡፡`});
                }
            } else {
                if(this.state.selectedAgeIndex === 0) {
                    let lowerIntake = Math.floor(this.state.weight * 30);
                    let upperIntake = Math.floor(this.state.weight * 60);
                    this.setState({message:`በተለያዩ ምክንያቶች የዱቄት ወተት መስጠት አስፈላጊ ከሆነ የሚከትለውን ተመልከቺ። ከ${lowerIntake}ሚሊ እስከ ${upperIntake}ሚሊ በየቀኑ ለልጅሽ ማጠጣት አለብሽ፡፡ ይህ ማለት በአማካይ ከ${Math.floor(lowerIntake/8)}ሚሊ እስከ ${Math.floor(upperIntake/8)}ሚሊ 8 የተለያዩ ጊዜያት ማጥባት አለብሽ ማለት ነው፡፡ ይህ  አማካይ መጠን ነው  ሃኪምሽን ማማከር ይፈልጋል።`});
                } else if(this.state.selectedAgeIndex === 1) {
                    let intake = Math.floor(this.state.weight * 150);
                    this.setState({message:`በተለያዩ ምክንያቶች የዱቄት ወተት መስጠት አስፈላጊ ከሆነ የሚከትለውን ተመልከቺ። ${intake}ሚሊ በየቀኑ ለልጅሽ ማጠጣት አለብሽ፡፡ ይህ ማለት በአማካይ ${Math.floor(intake/8)}ሚሊ 8 የተለያዩ ጊዜያት ማጥባት አለብሽ ማለት ነው፡፡ ይህ  አማካይ መጠን ነው  ሃኪምሽን ማማከር ይፈልጋል።`});
                } else if(this.state.selectedAgeIndex === 2) {
                    let intake = Math.floor(this.state.weight * 120);
                    this.setState({message:`በተለያዩ ምክንያቶች የዱቄት ወተት መስጠት አስፈላጊ ከሆነ የሚከትለውን ተመልከቺ። ${intake}ሚሊ በየቀኑ ለልጅሽ ማጠጣት አለብሽ፡፡ ይህ ማለት በአማካይ ${Math.floor(intake/8)}ሚሊ 8 የተለያዩ ጊዜያት ማጥባት አለብሽ ማለት ነው፡፡ ይህ  አማካይ መጠን ነው  ሃኪምሽን ማማከር ይፈልጋል።`});
                } else if(this.state.selectedAgeIndex === 3) {
                    let intake = Math.floor(this.state.weight * 100);
                    this.setState({message:`በተለያዩ ምክንያቶች የዱቄት ወተት መስጠት አስፈላጊ ከሆነ የሚከትለውን ተመልከቺ። ${intake}ሚሊ በየቀኑ ለልጅሽ ማጠጣት አለብሽ፡፡ ይህ ማለት በአማካይ ${Math.floor(intake/8)}ሚሊ 8 የተለያዩ ጊዜያት ማጥባት አለብሽ ማለት ነው፡፡ ይህ  አማካይ መጠን ነው  ሃኪምሽን ማማከር ይፈልጋል።`});
                }
            }
        }

    };

    _form () {
        return (
            <View>
                <Form>
                    <Item inlineLabel>
                        <Label>ልጅሽ ክብደት (በኪግ)</Label>
                        <Input
                            keyboardType="decimal-pad"
                            placeholder="ለምሳሌ 4.35"
                            onChangeText={(data) => this._handleWeightInput(data)}/>
                    </Item>
                    <View style={{flex:1}}>
                        <View style={{justifyContent:'center', alignItems:'center'}}>
                            <Text style={{fontSize:17, padding: 15}}>የልጅሽ ዕድሜ</Text>
                        </View>
                        <View>
                            <Picker selectedValue={this.state.selectedAge}
                                    onValueChange={(value, index) => this.setState({
                                        selectedAge: value, selectedAgeIndex: index
                                    })}>
                                  {this.state.ages.map((age, index) => {
                                    return (<PickerItem key={index} label={age} value={age} />)
                                  })}

                            </Picker>
                        </View>
                    </View>
                </Form>

                <Col style={styles.buttonContainer}>
                    <Button block primary
                            onPress={()=> this._calculateWeight()}
                            style={styles.mb5}>
                        <Text>አስብ</Text>
                    </Button>
                </Col>
            </View>
        )
    };

    //weight conversion
    _poundToKilo(pd) {
        return (pd * 0.4535924);
    }

    _handleWeightInput = (data) => {
        if (data === "") {
            return;
        }
        let weight = parseInt(data);
        if (Number.isFinite(weight)) {
            if (weight > 20 || weight < 0)  {
                Alert.alert(
                    'ስህተት',
                    "ያስገባሽው ክብደት መጠን የተሳሳተ ነው፡፡ ",
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
                "የእርግዝና ሳምንት የሚቀበለው ከ0 እስከ 45 ድረስ ያሉ ቁጥሮችን ብቻ ነው፡፡ ",
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
                <Segment>
                    <Button
                        first
                        active={this.state.seg === 1 ? true : false}
                        onPress={() => this._breastMilkSegment()}
                    >
                        <Text>የእናት ጡት ወተት</Text>
                    </Button>
                    <Button
                        last
                        active={this.state.seg === 2 ? true : false}
                        onPress={() => this._powderMilkSegment()}
                    >
                        <Text>የዱቄት ወተት</Text>
                    </Button>
                </Segment>
                <Content>
                    <ImageJumbotron image={cover}/>
                    <View style={{justifyContent: 'center', flexDirection: 'column'}}>
                        <Row style={{padding:10}}>
                            {
                                this.state.motherMilk ?
                                    <Text>በቀን ምን ያህል የጡት ወተት ለልጅሽ መስጠት እንደሚገባ ያሰላል</Text> :
                                    <Text>በቀን ምን ያህል የዱቄት ወተት ለልጅሽ መስጠት እንደሚገባ ያሰላል</Text>
                            }
                        </Row>
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

                        {this._form()}

                        <Row>

                            {!this.state.motherMilk ? <Text style={{padding:10}}>ልብ በይ！ሁልጊዜም ለልጅ የሚመከረው የእናት ጡት ወተት ነው። ከሱ የተሻለ ስለሌለ።</Text> : null}
                        </Row>

                        <Row>
                            <Text style={{padding:10}}>የልጅ ተገቢውን የክብደት መጠን መጨመር፣ የሽንት ጨርቅ 6 ጊዜያት እና ከዛ በላይ መቀየር፣ ንቁ ልጅ ወዘተ በቂ ምግብ ልጅሽ እያገኘች እንደሆነ ያመለክታሉ።</Text>
                        </Row>
                        <Banner />
                    </View>
                </Content>
            </Container>
        );
    }
}

export default WeightCalculator;
