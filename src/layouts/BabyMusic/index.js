import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    TouchableHighlight,
    ListView, FlatList, ImageBackground
} from "react-native";
import {Container, Content, Right, List, ListItem, Text, Button, Body, View} from "native-base";
import Slider from 'react-native-slider';
import {Row} from 'react-native-easy-grid';
import Header from "../Common/Header";
import {DetailHeader, ImageJumbotron} from "../Common/Detail";
import * as Font from 'expo-font';
import {Audio} from 'expo-av';
import {Asset} from 'expo-asset';
import {MaterialIcons} from '@expo/vector-icons';
import {retrieveItem, storeItem} from "../../Storage";

const cover = require('../../../assets/sidemenu/music.jpg');

class PlaylistItem {
    constructor(name, source, image, duration) {
        this.name = name;
        this.source = source;
        this.image = image;
        this.duration = duration;
    }
}

const PLAYLIST = [
    new PlaylistItem(
        'የህጻናት ሙዚቃ 1',
        require('../../../assets/Songs/fqv1.mp3'),
        'https://facebook.github.io/react/img/logo_og.png',
        '04:40'
    ),
    new PlaylistItem(
        'የህጻናት ሙዚቃ 2',
        require('../../../assets/Songs/fqv2.mp3'),
        'https://facebook.github.io/react/img/logo_og.png',
        '03:05'
    ),
    new PlaylistItem(
        'የህጻናት ሙዚቃ 3',
        require('../../../assets/Songs/fqv3.mp3'),
        'https://facebook.github.io/react/img/logo_og.png',
        '03:37'
    ),
    new PlaylistItem(
        'የህጻናት ሙዚቃ 4',
        require('../../../assets/Songs/fqv4.mp3'),
        'https://facebook.github.io/react/img/logo_og.png',
        '03:02'
    ),
    new PlaylistItem(
        'የህጻናት ሙዚቃ 5',
        require('../../../assets/Songs/fqv5.mp3'),
        'https://facebook.github.io/react/img/logo_og.png',
        '04:17'
    ),
    new PlaylistItem(
        'የህጻናት ሙዚቃ 6',
        require('../../../assets/Songs/fqv6.mp3'),
        'https://facebook.github.io/react/img/logo_og.png',
        '04:25'
    ),
];

const {width: DEVICE_WIDTH, height: DEVICE_HEIGHT} = Dimensions.get('window');
const BACKGROUND_COLOR = 'rgba(0, 0, 0, 0.2)';

const DISABLED_OPACITY = 0.5;
const FONT_SIZE = 14;
const LOADING_STRING = 'Loading...';
const BUFFERING_STRING = 'Buffering...';
const RATE_SCALE = 3.0;

class BabyMusic extends Component {
    static IS_PLAYING_IN_BACKGROUND = false;
    static PLAYBACK_INSTANCE_NAME = LOADING_STRING;
    static PLAYBACK_INSTANCE = null;
    static PORTRAIT = false;
    static IS_LOADING = false;
    static IS_PLAYING = false;
    static SHOULD_PLAY = false;
    static PLAYBACK_INSTANCE_POSITION = 0;
    static PLAYBACK_INSTANCE_DURATION = 0;
    static IS_BUFFERING = false;
    static RATE = false;
    static VOLUME = false;
    static INDEX = 0;

    isMounted = false;

    constructor(props) {
        super(props);
        this.index = 0;
        this.isSeeking = false;
        this.shouldPlayAtEndOfSeek = false;
        this.playbackInstance = null;

        this.state = {
            playbackInstanceName: LOADING_STRING,
            playbackInstancePosition: null,
            playbackInstanceDuration: null,
            shouldPlay: false,
            isPlaying: false,
            isBuffering: false,
            isLoading: true,
            fontLoaded: false,
            volume: 1.0,
            rate: 1.0,
            portrait: null,
            listViewData: PLAYLIST
        };
    }

    updateState(obj, callback) {
        if (this._isMounted) {
            this.setState(obj, callback);
        }
        else {
            callback();
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        });
        (async() => {
            await Font.loadAsync({
                ebrima: require('../../../assets/fonts/ebrima.ttf'),
            });
            this.updateState({fontLoaded: true});
        })();

        if (BabyMusic.IS_PLAYING) {
            this.index = BabyMusic.INDEX;
            this.updateState({
                playbackInstanceName: BabyMusic.PLAYBACK_INSTANCE_NAME,
                playbackInstancePosition: BabyMusic.PLAYBACK_INSTANCE_POSITION,
                playbackInstanceDuration: BabyMusic.PLAYBACK_INSTANCE_DURATION,
                shouldPlay: BabyMusic.SHOULD_PLAY,
                isPlaying: BabyMusic.IS_PLAYING,
                isBuffering: BabyMusic.IS_BUFFERING,
                isLoading: BabyMusic.IS_LOADING,
                volume: BabyMusic.VOLUME,
                rate: BabyMusic.RATE,
                portrait: BabyMusic.PORTRAIT,
            }, () => {
                this.playbackInstance = BabyMusic.PLAYBACK_INSTANCE;
                this.playbackInstance.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate);
            });
        } else {
            this._loadNewPlaybackInstance(false);
        }
    }

    async _loadNewPlaybackInstance(playing) {
        if (this.playbackInstance != null) {
            await this.playbackInstance.unloadAsync().then(function () {

            });
            this.playbackInstance.setOnPlaybackStatusUpdate(null);
            this.playbackInstance = null;
            BabyMusic.PLAYBACK_INSTANCE = this.playbackInstance;
        }

        const initialStatus = {
            shouldPlay: playing,
            rate: this.state.rate,
            volume: this.state.volume,
        };

        const {sound, status} = await Audio.Sound.createAsync(
            PLAYLIST[this.index].source,
            initialStatus,
            this._onPlaybackStatusUpdate
        );
        this.playbackInstance = sound;
        BabyMusic.PLAYBACK_INSTANCE = this.playbackInstance;

        this._updateScreenForLoading(false);
    }

    _updateScreenForLoading(isLoading) {
        if (isLoading) {
            try {
                this.updateState({
                    isPlaying: false,
                    playbackInstanceName: LOADING_STRING,
                    playbackInstanceDuration: null,
                    playbackInstancePosition: null,
                    isLoading: true,
                }, () => {
                    BabyMusic.IS_PLAYING = this.state.isPlaying;
                    BabyMusic.PLAYBACK_INSTANCE_NAME = this.state.playbackInstanceName;
                    BabyMusic.PLAYBACK_INSTANCE_DURATION = this.state.playbackInstanceDuration;
                    BabyMusic.PLAYBACK_INSTANCE_POSITION = this.state.playbackInstancePosition;
                    BabyMusic.IS_LOADING = this.state.isLoading;
                });
            }
            catch (error) {
                console.log(error);
            }
        } else {
            try {
                this.updateState({
                    playbackInstanceName: PLAYLIST[this.index].name,
                    portrait: PLAYLIST[this.index].image,
                    isLoading: false,
                }, () => {
                    BabyMusic.PLAYBACK_INSTANCE_NAME = this.state.playbackInstanceName;
                    BabyMusic.IS_LOADING = this.state.isLoading;
                    BabyMusic.PORTRAIT = this.state.portrait;
                });
            }
            catch (error) {
                console.log(error);
            }
        }
    }

    _onPlaybackStatusUpdate = status => {
        if (status.isLoaded) {
            if (this.playbackInstance) {
                // retrieveItem("stopPlayback").then((stopPlayback) => {
                //     if (stopPlayback) {
                //         this.playbackInstance.stopAsync().then(() => {
                //
                //         }).catch((error) => {
                //             console.log(error)
                //         });
                //     }
                // });
            }
            this.updateState({
                playbackInstancePosition: status.positionMillis,
                playbackInstanceDuration: status.durationMillis,
                shouldPlay: status.shouldPlay,
                isPlaying: status.isPlaying,
                isBuffering: status.isBuffering,
                rate: status.rate,
                volume: status.volume,
            }, () => {
                BabyMusic.PLAYBACK_INSTANCE_POSITION = this.state.playbackInstancePosition;
                BabyMusic.PLAYBACK_INSTANCE_DURATION = this.state.playbackInstanceDuration;
                BabyMusic.SHOULD_PLAY = this.state.shouldPlay;
                BabyMusic.IS_PLAYING = this.state.isPlaying;
                BabyMusic.IS_BUFFERING = this.state.isBuffering;
                BabyMusic.RATE = this.state.rate;
                BabyMusic.VOLUME = this.state.volume;
            });
            if (status.didJustFinish) {
                this._advanceIndex(true);
                this._updatePlaybackInstanceForIndex(true);
            }
        } else {
            if (status.error) {
                console.log(`FATAL PLAYER ERROR: ${status.error}`);
            }
        }
    };

    _advanceIndex(forward) {
        this.index =
            (this.index + (forward ? 1 : PLAYLIST.length - 1)) %
            PLAYLIST.length;
    }

    async _updatePlaybackInstanceForIndex(playing) {
        this._updateScreenForLoading(true);

        this._loadNewPlaybackInstance(playing);
    }

    _onPlayPausePressed = () => {
        if (this.playbackInstance != null) {
            if (this.state.isPlaying) {
                this.playbackInstance.pauseAsync().then(() => {
                }).catch((error) => {
                    console.log(error)
                });
            } else {
                this.playbackInstance.playAsync().then(() => {
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    };

    _onStopPressed = () => {
        if (this.playbackInstance != null) {
            this.playbackInstance.stopAsync().then(() => {
                // storeItem("stopPlayback", true).then(() => {
                // }).catch((error) => {
                //     console.log(error)
                // });
            }).catch((error) => {
                console.log(error)
            });
        }
        else {
            // storeItem("stopPlayback", true).then(() => {
            // }).catch((error) => {
            //     console.log(error)
            // });
        }
    };

    _onForwardPressed = () => {
        if (this.playbackInstance != null) {
            this._advanceIndex(true);
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    };

    _onBackPressed = () => {
        if (this.playbackInstance != null) {
            this._advanceIndex(false);
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    };

    _onVolumeSliderValueChange = value => {
        if (this.playbackInstance != null) {
            this.playbackInstance.setVolumeAsync(value).then(() => {
            }).catch((error) => {
                console.log(error)
            });
        }
    };

    _trySetRate = async rate => {
        if (this.playbackInstance != null) {
            try {
                await this.playbackInstance.setRateAsync(rate);
            } catch (error) {
                // Rate changing could not be performed, possibly because the client's Android API is too old.
            }
        }
    };

    _onRateSliderSlidingComplete = async value => {
        this._trySetRate(value * RATE_SCALE);
    };

    _onSeekSliderValueChange = value => {
        if (this.playbackInstance != null && !this.isSeeking) {
            this.isSeeking = true;
            this.shouldPlayAtEndOfSeek = this.state.shouldPlay;
            this.playbackInstance.pauseAsync().then(() => {
            }).catch((error) => {
                console.log(error)
            });
        }
    };

    _onSeekSliderSlidingComplete = async value => {
        if (this.playbackInstance != null) {
            this.isSeeking = false;
            const seekPosition = value * this.state.playbackInstanceDuration;
            if (this.shouldPlayAtEndOfSeek) {
                this.playbackInstance.playFromPositionAsync(seekPosition).then(() => {
                }).catch((error) => {
                    console.log(error)
                });
            } else {
                this.playbackInstance.setPositionAsync(seekPosition).then(() => {
                }).catch((error) => {
                    console.log(error)
                });
            }
        }
    };

    _getSeekSliderPosition() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return (
                this.state.playbackInstancePosition /
                this.state.playbackInstanceDuration
            );
        }
        return 0;
    }

    _getMMSSFromMillis(millis) {
        const totalSeconds = millis / 1000;
        const seconds = Math.floor(totalSeconds % 60);
        const minutes = Math.floor(totalSeconds / 60);

        const padWithZero = number => {
            const string = number.toString();
            if (number < 10) {
                return '0' + string;
            }
            return string;
        };
        return padWithZero(minutes) + ':' + padWithZero(seconds);
    }

    _getTimestamp() {
        if (
            this.playbackInstance != null &&
            this.state.playbackInstancePosition != null &&
            this.state.playbackInstanceDuration != null
        ) {
            return `${this._getMMSSFromMillis(
                this.state.playbackInstancePosition
            )} / ${this._getMMSSFromMillis(
                this.state.playbackInstanceDuration
            )}`;
        }
        return '';
    }

    play(index) {
        if (this.playbackInstance != null) {
            this.index = index;
            BabyMusic.INDEX = index;
            this._updatePlaybackInstanceForIndex(this.state.shouldPlay);
        }
    }

    _renderPlayListItem(data) {
        return (
            <ListItem onPress={() => this.play(data.index)} style={{
                marginLeft: 0,
                paddingLeft: 15,
                paddingTop: 10,
                paddingBottom: 0,
                backgroundColor: 'white'
            }}>
                <Body style={{
                    height: 50,
                }}>
                <View
                    style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                    <Text style={{
                        color: 'rgb(194, 24, 91)'
                    }}>
                        {data.item.name}
                    </Text>
                </View>
                <View
                    style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
                    <Text style={{
                        color: 'rgb(80, 80, 80)',
                        fontSize: 12
                    }}>
                        {data.item.duration}
                    </Text>
                </View>
                </Body>
            </ListItem>
        );
    }

    render() {
        const navigation = this.props.navigation;
        return (
            <Container style={styles.container}>
                <Header />
                <DetailHeader text='የህጻናት ሙዚቃ' onPress={() => navigation.navigate('Home')}/>
                <Content>
                    <ImageBackground source={cover} style={styles.mainView}>
                        <View style={{
                            backgroundColor: 'rgba(194, 24, 91, 0.8)',//Change the transparency here
                            width:'100%'
                        }}>
                            {/*<ImageJumbotron image={cover}/>*/}
                            <View style={styles.detailsContainer}>
                                <Text style={[styles.text]}>
                                    {this.state.playbackInstanceName}
                                </Text>
                                <Text style={[styles.text]}>
                                    {this.state.isBuffering ? (
                                            BUFFERING_STRING
                                        ) : (
                                            this._getTimestamp()
                                        )}
                                </Text>
                            </View>
                            <View
                                style={[
                                    styles.buttonsContainerBase,
                                    styles.buttonsContainerTopRow,
                                    {
                                        opacity: this.state.isLoading
                                            ? DISABLED_OPACITY
                                            : 1.0,
                                    },
                                ]}
                            >
                                <TouchableHighlight
                                    underlayColor={BACKGROUND_COLOR}
                                    style={styles.wrapper}
                                    onPress={this._onBackPressed}
                                    disabled={this.state.isLoading}
                                >
                                    <View>
                                        <MaterialIcons
                                            name="fast-rewind"
                                            size={40}
                                            color="#FFFFFF"
                                        />
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor={BACKGROUND_COLOR}
                                    style={styles.wrapper}
                                    onPress={this._onPlayPausePressed}
                                    disabled={this.state.isLoading}
                                >
                                    <View>
                                        {this.state.isPlaying ? (
                                                <MaterialIcons
                                                    name="pause"
                                                    size={30}
                                                    color="#FFFFFF"
                                                />
                                            ) : (
                                                <MaterialIcons
                                                    name="play-arrow"
                                                    size={30}
                                                    color="#FFFFFF"
                                                />
                                            )}
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor={BACKGROUND_COLOR}
                                    style={styles.wrapper}
                                    onPress={this._onStopPressed}
                                    disabled={this.state.isLoading}
                                >
                                    <View>
                                        <MaterialIcons
                                            name="stop"
                                            size={30}
                                            color="#FFFFFF"
                                        />
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight
                                    underlayColor={BACKGROUND_COLOR}
                                    style={styles.wrapper}
                                    onPress={this._onForwardPressed}
                                    disabled={this.state.isLoading}
                                >
                                    <View>
                                        <MaterialIcons
                                            name="fast-forward"
                                            size={30}
                                            color="#FFFFFF"
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                            <View
                                style={[
                                    styles.playbackContainer,
                                    {
                                        opacity: this.state.isLoading
                                            ? DISABLED_OPACITY
                                            : 1.0,
                                    },
                                ]}
                            >
                                <Slider
                                    style={styles.playbackSlider}
                                    value={this._getSeekSliderPosition()}
                                    onValueChange={this._onSeekSliderValueChange}
                                    onSlidingComplete={this._onSeekSliderSlidingComplete}
                                    thumbTintColor="#000000"
                                    minimumTrackTintColor="#4CCFF9"
                                    disabled={this.state.isLoading}
                                />
                            </View>
                        </View>
                    </ImageBackground>
                    <View style={{padding: 10}}>
                        <Text>ዝግ ያለ ክላሲካል ሙዚቃ አሊያም ማንኛውንም የምትወጂውን ሙዚቃ በመካከለኛ ድምጽ ከፍታችሁ ተዝናኑ።በማህጸን ውስጥ ያለ ጽንስ ከ 23 ሳምንት
                            አካባቢ ጀምሮ ድምጽ በአግባቡ ማዳመጥ ይጀምራል/ትጀምራለች</Text>
                    </View>
                    <FlatList
                        data={this.state.listViewData}
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        renderItem={(item) => this._renderPlayListItem(item)}
                    />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    mainView: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    detailsContainer: {
        height: 40,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    playbackContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    playbackSlider: {
        alignSelf: 'stretch',
        marginLeft: 10,
        marginRight: 10,
    },
    text: {
        fontSize: FONT_SIZE,
        minHeight: FONT_SIZE,
        color: 'white',
    },
    buttonsContainerBase: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonsContainerTopRow: {
        maxHeight: 20,
        minWidth: DEVICE_WIDTH / 2.0,
        maxWidth: DEVICE_WIDTH / 2.0,
    },
    buttonsContainerMiddleRow: {
        maxHeight: 20,
        alignSelf: 'stretch',
        paddingRight: 20,
    },
    volumeContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: DEVICE_WIDTH - 40,
        maxWidth: DEVICE_WIDTH - 40,
    },
    volumeSlider: {
        width: DEVICE_WIDTH - 80,
    },
    buttonsContainerBottomRow: {
        alignSelf: 'stretch',
    },
    rateSlider: {
        width: DEVICE_WIDTH - 80,
    },
});

export default BabyMusic;
