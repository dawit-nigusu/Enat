import React from "react";
import {Image, ImageBackground, StyleSheet} from "react-native";
import {Button, Icon, View, Text, Left, Right} from "native-base";
import {Row, Col} from "react-native-easy-grid";

const ReactNative = require("react-native");
const {Dimensions} = ReactNative;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const cover = require("../../../assets/drawer-cover.png");

const DetailHeader = (props) => {
    return (
        <View style={{
            backgroundColor: '#eb3a7c',
            paddingTop: 5,
            paddingBottom: 5,
            height: 50,
            flexDirection: 'row',
            justifyContent: 'flex-start'
        }}>
                <Button
                    transparent
                    style={{ borderWidth: 0, height: 40 }}
                    onPress={props.onPress}>
                    <Icon style={{color: "#fff"}} name="chevron-thin-left" type='Entypo'/>
                </Button>
            <View sytle={{
                flex: 0.8,
                marginRight: 15,
            }}>
                <Text style={{
                    color: '#ffffff',
                    height: 40,
                    width: deviceWidth * 0.8,
                    fontSize: 16,
                    fontWeight: 'normal',
                    textAlignVertical: 'center',
                    textAlign:'justify',
                    flexWrap: 'wrap',
                }} numberOfLines={2}>{props.text}</Text>
            </View>

        </View>
    )
};

const TabHeader = (props) => {
    let prev = null;
    let next = null;
    if(props.prev === true) {
        prev = (<Button transparent
                                          style={{
                                              borderWidth: 0,
                                              height: 40
                                          }}
                                          onPress={props.onPressPrev}
            >
                <Icon style={{color: "#c31e5c"}} name="chevron-small-left" type='Entypo'/>
            </Button>);
    }
    if(props.next === true) {
        next = (<Button transparent
                style={{
                    borderWidth: 0,
                    height: 40
                }}
                onPress={props.onPressNext}
        >
            <Icon style={{color: "#c31e5c"}} name="chevron-small-right" type='Entypo'/>
        </Button>);
    }
    return (
        <View style={[styles.tabHeader]}>
            <Left>
                {prev}
            </Left>

            <View sytle={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingRight: 5,
            }}>
                <Text style={styles.tabHeaderText}>{props.tabname}</Text>
            </View>
            <Right>
                {next}
            </Right>

        </View>
    )
};

const TitleHeader = (props) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{props.text}</Text>
        </View>
    )
};

const Banner = (props) => {
    // TODO::fetch with props.bannerId from Asyncstorage
    // return (
    //     <Row>
    //         <Image
    //             source={cover}
    //             style={{
    //                 flex: 1,
    //                 width: null,
    //                 height: 90,
    //                 marginTop: 5,
    //                 marginBottom: 5,
    //             }}/>
    //     </Row>
    // )
    return (
        <Image
                source={{
                    uri: 'http://enat.hlmikhatech.com/banners/banner.jpg',
                    cache: 'force-cache',
                }}
                style={[{
                    flex: 1,
                    width: '100%',
                    height: 90,
                    marginTop: 5,
                }]}/>
    );

};

const SubTitleHeader = (props) => {
    return (
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>{props.text}</Text>
        </View>
    )
};

const Paragraph = (props) => {
    return (
        <Row style={[styles.body]}>
            <Text style={[styles.text, {
                marginBottom: 0
            }]}>
                {props.text}
            </Text>
        </Row>
    )
};

const Bold = (props) => {
    return (
        <View>
            <Text style={{fontWeight:'bold'}}>
                {props.text}
            </Text>
        </View>
    )
};

const BulletinItem = (props) => {
    return (
        <Row style={styles.body}>
            <Text style={styles.bullet}> {'\u2022'} </Text>
            <Text style={styles.bulletText}>
                {props.text}
            </Text>
        </Row>
    )
};

const Bulletin = (props) => {
    return (
        <View>
            {props.list.map((item) => {
                return (
                    <BulletinItem key={item.id} text={item.text}/>
                );
            })}
        </View>
    )
};

const ImageJumbotron = (props) => {
    return (
        <Row style={styles.mb10}>
            <ImageBackground
                source={props.image}
                style={styles.image}

            >
            </ImageBackground>
        </Row>
    )
};

const Thumbnail = (props) => {
    return (
        <Row style={[styles.body, styles.mb10]}>
            <Col style={{
                flex:3
            }}>
                <ImageBackground
                    source={props.primaryImage}
                    style={[styles.primaryImage, styles.bottom]}
                >
                </ImageBackground>
            </Col>
            <Col style={{
                paddingTop: 5,
                paddingLeft: 25,
                flex:2
            }}>
                <Text style={{
                    fontSize: 12,
                    lineHeight:25,
                }}>{props.primaryText}</Text>
                <Text style={{
                    fontSize: 12,
                    lineHeight:20,
                    color:'rgb(194, 24, 91)'
                }}>{props.secondaryText}</Text>
                <Text style={{
                    fontSize: 12,
                    lineHeight:20,
                }}>{props.tertiaryText}</Text>
                {props.secondaryImage !== undefined ? <ImageBackground
                    source={props.secondaryImage}
                    style={[styles.secondaryImage]}/> : null}

            </Col>
        </Row>
    )
};

const styles = StyleSheet.create({
    mainHeader: {
        backgroundColor: '#eb3a7c',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    mainHeaderText: {
        color: '#ffffff',
        marginRight: 10,
        height: 40,
        alignSelf: 'flex-start',
        fontSize: 16,
        fontWeight: 'normal',
        textAlignVertical: 'center',
        flexWrap: 'wrap',
        flex:0.9,
    },
    tabHeader: {
        backgroundColor: '#fdecf3',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 5,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabHeaderText: {
        color: '#c31e5c',
        paddingRight: 5,
        height: 20,
        alignSelf: 'center',
        fontSize: 14,
        fontWeight: 'normal',
        textAlignVertical: 'center',
        flexWrap: 'wrap',
    },
    body: {
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10,
    },
    text: {
        bottom: 6,
        marginTop: 5,
        alignSelf: "flex-start",
        marginBottom: 7,
        marginRight: 10,
        fontSize: 13,
        letterSpacing: 1,
        color: "#444444",
        lineHeight: 18,
    },
    mb10: {
        marginBottom: 10
    },
    stretch: {
        flex: 1,
    },
    titleContainer: {
        backgroundColor: '#fdecf3',
        flex: 1,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    title: {
        backgroundColor: '#fdecf3',
        color: '#be1f57',
        fontWeight: 'bold',
        fontSize: 17,
        padding: 10,
    },
    subtitleContainer: {
        backgroundColor: '#fff',
        flex: 1,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    subtitle: {
        backgroundColor: '#fff',
        color: '#be1f57',
        fontSize: 16,
        padding: 10,
    },
    bullet: {
        color: "#e82064"
    },
    bulletText: {
        marginLeft: 5,
        marginRight: 10,
        fontSize: 13,
        letterSpacing: 1,
        color: "#686463",
        lineHeight: 18,
    },
    image: {
        width: deviceWidth,
        height: (167 * deviceWidth)/375,
    },
    primaryImage: {
        width: deviceWidth * 0.55,
        height: 120,
        justifyContent: 'flex-end'
    },
    secondaryImage: {
        flex: 1,
        width: 76,
        height: 60,

        justifyContent: 'flex-end'
    }

});

export {
    DetailHeader,
    Paragraph,
    Bulletin,
    ImageJumbotron,
    TitleHeader,
    SubTitleHeader,
    Thumbnail,
    Banner,
    TabHeader,
    Bold
};
