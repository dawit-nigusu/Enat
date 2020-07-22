import React, {Component} from "react";
import {  Alert, FlatList } from "react-native";
import {
    Content, Button, Text, Segment, Icon, Toast
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./styles";
import Header from "../Common/Header";
import { DetailHeader } from "../Common/Detail";
import { retrieveItem, addItemToArray, removeItemFromArray } from "../../Storage";
import {MaterialIcons} from '@expo/vector-icons';

const FAV_NAMES = ["ethiopianMaleFav", "ethiopianFemaleFav", "christianMaleFav", "christianFemaleFav", "muslimMaleFav", "muslimFemaleFav"];
import { ETHIOPIAN, CHRISTIAN, MUSLIM } from "./data";

class BabyName extends Component {

    constructor(props) {
        super(props);
        this.state = {
            seg: 1,
            namekey: {
                male: "ethiopianMale",
                female: "ethiopianFemale"
            },
            favkey: {
                male: "ethiopianMaleFav",
                female: "ethiopianFemaleFav"
            },

            ethiopianMaleFav: [],
            ethiopianFemaleFav: [],
            christianMaleFav: [],
            christianFemaleFav: [],
            muslimMaleFav: [],
            muslimFemaleFav: [],

            ethiopianMale: ETHIOPIAN.male,
            ethiopianFemale: ETHIOPIAN.female,
            christianMale: CHRISTIAN.male,
            christianFemale: CHRISTIAN.female,
            muslimMale: MUSLIM.male,
            muslimFemale: MUSLIM.female,
        };
    }

    componentDidMount() {
        this._getFavNames();
    }

    _ethiopianSegment = () => {
        this.setState({
            seg: 1,
            namekey: {
                male: "ethiopianMale",
                female: "ethiopianFemale"
            },
            favkey: {
                male: "ethiopianMaleFav",
                female: "ethiopianFemaleFav"
            },
        });
    }

    _christianSegment = () => {
        this.setState({
            seg: 2,
            namekey: {
                male: "christianMale",
                female: "christianFemale"
            },
            favkey: {
                male: "christianMaleFav",
                female: "christianFemaleFav"
            },
        });
    }

    _muslimSegment = () => {
        this.setState({
            seg: 3,
            namekey: {
                male: "muslimMale",
                female: "muslimFemale"
            },
            favkey: {
                male: "muslimMaleFav",
                female: "muslimFemaleFav"
            },
        });
    }

    _showMeaning(item, key) {
        let buttonText = item.fav === 1 ? 'ተው' : 'ምረጥ';
        return (
            Alert.alert(
                'የ' + item.name+' ትርጉም',
                item.meaning,
                [
                    {text: buttonText, onPress: () => this._toggleFav(item, key)},
                    { text: 'ይቅር' },
                ]
            )
        )
    }

    _nameCard = (item, key) => {
        return (
            <Row style={{
                    backgroundColor:"#fff",
                    borderBottomWidth: 1,
                    borderBottomColor: "#e4e4e4",
                    flex:1,
                }}
                 onPress={() => this._showMeaning(item, key)}
            >
                <MaterialIcons
                    style={{padding:5, color: "#e82064"}}
                    name={item.fav === 1 ? "favorite" : "favorite-border"}
                    onPress={() => this._toggleFav(item, key)}
                />
                <Text style={{alignSelf: "center"}}>{item.name}</Text>
            </Row>
        );
    }

    _toggleFav = (item, key) => {
        if(item.fav === 0) {
            item.fav = 1;
            addItemToArray(key, item.id).then(()=>{this._getFavNames()});
            let data = this.state[key + 'Fav'];
            data.push(item.id);
            this._updateFavToState(key+'Fav', data);
        } else {
            item.fav = 0;
            removeItemFromArray(key, item.id).then(()=>{ this._getFavNames() });
            let data = this.state[key + 'Fav'];
            let index = data.indexOf(item.id);
            if (index > -1) {
              data.splice(index, 1);
            }
            this._updateFavToState(key+'Fav', data);
        }

        Toast.show({
            text: item.fav === 1 ?
                item.name+' የሚወደዱ ስሞች ዝርዝር ውስጥ ተካቷል' :
                item.name+' ከሚወደዱ ስሞች ዝርዝር ውስጥ ወጥቷል',
            buttonText: "እሽ",
            duration: 3000
        });
    }

    _getFavNames = () => {
        FAV_NAMES.forEach((key)=> {
            retrieveItem(key).then((item) => {
                if (item !== undefined && item != null) {
                    this._updateFavToState(key, item);
                }
            }).catch(function (error) {
                console.error(error.message);
            });
        });

    };

    _updateFavToState = (key, item) => {
        if(key === 'ethiopianMaleFav') {
            this.setState({
                ethiopianMaleFav: item
            });
            this._markFav('ethiopianMale', item);
        } else if(key === 'ethiopianFemaleFav') {
            this.setState({
                ethiopianFemaleFav: item
            });
            this._markFav('ethiopianFemale', item);
        } else if(key === 'christianMaleFav') {
            this.setState({
                christianMaleFav: item
            });
            this._markFav('christianMale', item);
        } else if(key === 'christianFemaleFav') {
            this.setState({
                christianFemaleFav: item
            });
            this._markFav('christianFemale', item);
        } else if(key === 'muslimMaleFav') {
            this.setState({
                muslimMaleFav: item
            });
            this._markFav('muslimMale', item);
        } else if(key === 'muslimFemaleFav') {
            this.setState({
                muslimFemaleFav: item
            });
            this._markFav('muslimFemale', item);
        }
    }

    _markFav = (namekey, favIdList) => {
        let name = this.state[namekey];
        favIdList.forEach((favid)=>{
            name.map((item)=> {
                if(item.id === favid) {
                    item.fav = 1;
                }
                return item;
            })
        });

        if(namekey === 'ethiopianMale') {
            this.setState({
                ethiopianMale: name
            });
        } else if(namekey === 'ethiopianFemale') {
            this.setState({
                ethiopianFemale: name
            });
        } else if(namekey === 'christianMale') {
            this.setState({
                christianMale: name
            });
        } else if(namekey === 'christianFemale') {
            this.setState({
                christianFemale: name
            });
        } else if(namekey === 'muslimMale') {
            this.setState({
                muslimMale: name
            });
        } else if(namekey === 'muslimFemale') {
            this.setState({
                muslimFemale: name
            });
        }
    }

    render() {
        let _male = this.state[this.state.namekey.male];
        let _female = this.state[this.state.namekey.female];
        return (
            <Content>
                <Segment style={{backgroundColor:"#eb3a7c"}}>
                    <Button
                        first
                        active={this.state.seg === 1 ? true : false}
                        onPress={() => this._ethiopianSegment()}>
                        <Text>ኢትዮጵያዊ</Text>
                    </Button>
                    <Button
                        active={this.state.seg === 2 ? true : false}
                        onPress={() => this._christianSegment()}>
                      <Text>የክርስቲያን</Text>
                    </Button>
                    <Button
                        last
                        active={this.state.seg === 3 ? true : false}
                        onPress={() => this._muslimSegment()}>
                        <Text>የሙስሊም</Text>
                    </Button>
                </Segment>

                <Grid>
                    <Col style={{
                        backgroundColor: "#fff",
                        padding: 5,
                        marginRight: 5,
                    }}>
                        <Text style={{
                                    alignSelf: "center",
                                    color:"#be1f57",
                                    fontWeight: "bold",
                                    fontSize: 17
                                }}>የወንድ</Text>
                        <FlatList
                            data={this.state[this.state.namekey.male]}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                            renderItem={(item) => this._nameCard(item.item, this.state.namekey.male)}
                        />
                    </Col>
                    <Col style={{ backgroundColor: "#fff", padding: 5,}}>
                        <Text style={{
                            alignSelf: "center",
                            color:"#be1f57",
                            fontWeight: "bold",
                            fontSize: 17
                        }}>የሴት</Text>
                        <FlatList
                            data={this.state[this.state.namekey.female]}
                            keyExtractor={(item, index) => index.toString()}
                            extraData={this.state}
                            renderItem={(item) => this._nameCard(item.item, this.state.namekey.female)}/>
                    </Col>
                </Grid>
            </Content>
        );
    }

}

export default BabyName;
