import React, {Component} from "react";
import { Alert, CameraRoll, Image, TouchableOpacity, View } from "react-native";
import {
    Container, Button, Text, Thumbnail, Content, Icon, H3
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import styles from "./styles";
import Header from "../Common/Header";
import { ImageJumbotron } from "../Common/Detail";
import { removeItem, retrieveItem } from "../../Storage";

const ReactNative = require("react-native");
const {Dimensions} = ReactNative;
const deviceWidth = Dimensions.get("window").width - 20;

const cover = require('../../../assets/sidemenu/photo.jpg');

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
        this._reset = this._reset.bind(this);
        this._init = this._init.bind(this);
        this._remove = this._remove.bind(this);

    }

    componentDidMount() {
        this._init();
    }

    _init() {
        // retrieve photos list from AsyncStorage and also navigation param
        retrieveItem('photoList').then((data) => {
            if (data !== undefined && data != null) {
                this.setState({ photos: data });
            }
            const uri = this.props.navigation.getParam('uri', "");
            const description = this.props.navigation.getParam('description', "");
            const week = this.props.navigation.getParam('week', "");
            const paramData = {
                uri: uri,
                description: description,
                week: week,
            };
            if (uri !== undefined && uri !== "") {
                let tempPhotos = this.state.photos;
                tempPhotos.push(paramData)
                this.setState({
                    photos:tempPhotos
                });
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    _reset() {
        Alert.alert(
            'ማስጠንቀቂያ',
            "ሁሉም የተመዘገቡ ፎቶዎች ይጠፋሉ፡፡ ",
            [
                {text: 'ሰርዝ', onPress: () => this._remove()},
                {text: 'ተው', onPress: () => {}},
            ]
        );
    }

    _remove() {
        removeItem('photoList');
        this.setState({ photos: [] });
    }

    _renderPhotoCard() {
            let photosCard = (
                this.state.photos.map((data, index) => {
                    return (
                        <View key={index} style={{
                            flexDirection: 'column', alignSelf: 'flex-start',
                            marginLeft: 5, marginBottom: 10, alignContent: 'center'
                        }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('DetailPicture', {data: data, index: index})}>
                                <Thumbnail square large source={{uri: data.uri}} style={{width:deviceWidth/3}} />
                                <Text style={{alignSelf: 'center'}}>{data.week}ተኛ ሳምንት</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
            );
            return (
                <View style={{flex:1}}>
                    <Row style={{flexWrap: 'wrap'}}>
                        {photosCard}
                    </Row>
                    <Col style={{margin: 35}}>
                        <Button style={{ alignSelf: 'center', padding: 10 }}
                                iconLeft large warning
                                onPress={() => this._reset()} >
                            <Icon name='camera' />
                            <Text>ሰርዝ</Text>
                        </Button>
                    </Col>

                </View>
            )
    }

     render() {
        return (
            <Container style={styles.container}>
                <Header/>
                <Content>
                    <ImageJumbotron image={cover}/>
                    <Row style={{padding:10}}>
                        <Text>በእርግዝናሽ ወቅት ያሉሽን ልዩ ልዩ ትውስታዎች በፎቶና በፅሁፍ ያስቀምጥልሻል</Text>
                    </Row>
                    <Col style={{justifyContent: 'space-between', padding:10, marginBottom: 15}}>
                        <Button iconLeft large block
                                onPress={() => this.props.navigation.navigate('TakePicture')} >
                            <Icon name='camera' />
                            <Text>የእርግዝና ጊዜ ፎቶ </Text>
                        </Button>
                    </Col>
                    <View style={{flexDirection:'row', flexWrap: 'wrap'}}>
                        {
                            this.state.photos.length > 0 ?
                                this._renderPhotoCard() :
                                <Col style={{alignSelf:'center'}}>
                                    <H3 style={{alignSelf:'center'}}>የተቀመጠ ፎቶ የለም</H3>
                                </Col>
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}

export default Gallery;
