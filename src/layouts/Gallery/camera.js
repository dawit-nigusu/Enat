import React from 'react';
import {Text, View, KeyboardAvoidingView, Image, Vibration, ImageBackground, Alert} from "react-native";
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import {Button, Container, Icon, Form, Item, Label, Input, Content} from "native-base";
import {Col, Row, Grid} from "react-native-easy-grid";
import styles from "./styles";
import Header from "../Common/Header";
import {addItemToArray} from "../../Storage";
import {DetailHeader} from "../Common/Detail";
const ReactNative = require("react-native");
const {Dimensions} = ReactNative;
const deviceHeight = Dimensions.get("window").height;

export default class TakePicture extends React.Component {
    constructor() {
        super();
        this.state = {
            hasCameraPermission: null,
            type: Camera.Constants.Type.back,
            pictureSize: "640x480",
            preview: false,
            description: "",
            week: "",
        };
        this.onCameraReady = this.onCameraReady.bind(this);
        this.takePicture = this.takePicture.bind(this);
        this._handleSaveButton = this._handleSaveButton.bind(this);
    }

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
        FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
            // console.log(e, 'Directory exists');
        });
    }

    async takePicture() {
        if (this.camera) {
            this.camera.takePictureAsync().then(async(data) => {
                let photoUri = `${FileSystem.documentDirectory}photos/Photo_${Date.now()}.jpg`;
                FileSystem.moveAsync({
                    from: data.uri,
                    to: photoUri
                }).then(() => {
                    this.setState({
                        preview: true,
                        photoUri: photoUri,
                    });
                })
                Vibration.vibrate();
            })
        }
    }

    async onCameraReady() {
        let sizes = await this.camera.getAvailablePictureSizesAsync("1:1");
        sizes.catch((error) => {
                console.log(error)
            }
        );
        // console.log("Received sizes: " + JSON.stringify(sizes));
        if (sizes && sizes.length && sizes.length > 0) {
            // console.log("current picture size: " + this.camera.pictureSize);
            // console.log("going to change sizes into this: " + sizes[0]);
            this.camera.pictureSize = sizes[0];
            this.setState({pictureSize: sizes[0]});
            // console.log("new picture size: " + this.camera.pictureSize);
        }
    }

    _handleSaveButton() {
        if (this.state.preview) {
            let data = {
                uri: this.state.photoUri,
                week: this.state.week,
                description: this.state.description,
            };
            addItemToArray('photoList', data).then(
                () => {
                    // console.log('photoList updated');
                }
            );
            this.props.navigation.navigate('Gallery', data);
        } else {
            Alert.alert(
                'ስህተት',
                "የእርግዝና ፎቶ አልተነሳም፤ በድጋሚ ፎቶ ካነሱ በሇላ ይሞክሩ፡፡ ",
                [
                    {text: 'እሺ'},
                ]
            );
        }

    }

    _handleWeekInput(data) {
        if (data === "") {
            return;
        }
        let week = parseInt(data);
        if (Number.isInteger(week)) {
            if (week > 45 || week < 1) {
                Alert.alert(
                    'ስህተት',
                    "የእርግዝና ሳምንት ከ45 መብለጥ ወይም ከ0 ማነስ የለበትም፡፡ ",
                    [
                        {text: 'እሺ'},
                    ]
                );
            } else {
                this.setState({
                    week: data
                });
            }
        } else {
            Alert.alert(
                'ስህተት',
                "የእርግዝና ሳምንት የሚቀበለው ከ0 እስከ 45 ድረስ ያሉ ቁጥሮችን ብቻ ነው፡፡ ",
                [
                    {text: 'እሺ'},
                ]
            );
        }

    }

    render() {
        let cameraView = (
            <Camera style={{ flex: 1 }} type={this.state.type}
                    ref={ref => { this.camera = ref; }}
                    onCameraReady={this.onCameraReady}
                    ratio="1:1"
                    pictureSize={this.state.pictureSize}
                    autoFocus={Camera.Constants.AutoFocus.on}
                    zoom={0}
                    whiteBalance={"auto"}
            >
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    <Button
                        style={{alignSelf:'flex-end'}} transparent
                        onPress={() => {
                                this.setState({
                                    type: this.state.type === Camera.Constants.Type.back
                                        ? Camera.Constants.Type.front
                                        : Camera.Constants.Type.back,
                                });
                            }}>
                        <Icon type="MaterialCommunityIcons" name="rotate-3d"/>
                    </Button>
                    <Button style={{alignSelf:'flex-end'}}
                            onPress={()=>this.takePicture()}
                            transparent>
                        <Icon name="camera"/>
                    </Button>
                </View>
            </Camera>
        );
        let previewWithButton = (
            <ImageBackground style={{flex:1 }} source={{uri: this.state.photoUri}}>
                <View style={{
                        position: 'absolute',
                        bottom: 5,
                        alignSelf: 'center',
                        backgroundColor: "transparent"}}>
                    <View style={{
                            flexDirection:'row',
                            zIndex:2,
                        }}>
                        <Button style={{alignSelf:'flex-end'}} transparent>
                            <Icon type="Entypo" name="ccw"/>
                        </Button>
                        <Button style={{alignSelf:'flex-end'}} transparent>
                            <Icon type="Entypo" name="check"/>
                        </Button>
                    </View>
                </View>
            </ImageBackground>
        );

        let preview = (
            <Image style={{flex:1}} source={{uri: this.state.photoUri}}/>
        );

        let currentView = this.state.preview ? preview : cameraView;

        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Container style={styles.container}>
                    <Header/>
                    <DetailHeader
                        text="ማስታወሽያ ምስል ውሰጂ"
                        onPress={()=>this.props.navigation.navigate('Gallery')}
                    />
                    <Content >
                        <Row style={{ height: deviceHeight * 0.6, padding: 10}}>
                            {currentView}
                        </Row>
                        <Form style={{padding: 10}}>
                            <Item floatingLabel>
                                <Label>መግለጫ ፅሁፍ</Label>
                                <Input
                                    onChangeText={(text) => this.setState({description:text})}
                                    value={this.state.description}
                                />
                            </Item>
                            <Item floatingLabel last>
                                <Label>ፎቶ የተነሳበት የእርግዝና ሳምንት</Label>
                                <Input keyboardType="numeric"
                                       returnKeyType="go"
                                       maxLength={2}
                                       value={this.state.week}
                                       onChangeText={(week) => this._handleWeekInput(week)}/>
                            </Item>
                        </Form>
                        <Row style={{justifyContent: 'space-around', padding:10, marginBottom:35}}>
                            <Button style={{flex:0.3}} block primary onPress={this._handleSaveButton}>
                                <Text style={{color:'white', padding: 5}}>አስቀምጥ</Text>
                            </Button>
                            <Button style={{flex:0.3}} block primary
                                    onPress={() => this.props.navigation.navigate('Gallery')}>
                                <Text style={{color:'white', padding: 5}}>ሰርዝ </Text>
                            </Button>
                        </Row>
                    </Content>
                </Container>

            );
        }
    }
}
