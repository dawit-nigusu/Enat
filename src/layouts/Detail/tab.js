import React, {Component} from "react";
import { Container, Content } from "native-base";
import Banner from "../Common/Banner";
import {
    Bulletin,
    ImageJumbotron,
    Paragraph,
    SubTitleHeader,
    TabHeader,
    Thumbnail,
    TitleHeader
} from "../Common/Detail";
import {Row, Col} from "react-native-easy-grid";
import { Image, View } from "react-native";

const ReactNative = require("react-native");
const {Dimensions} = ReactNative;
const deviceHeight = Dimensions.get("window").height;

class Tabs extends Component {
    constructor(props) {
        super(props);

        let _tabs = this.props.tabs;
        let _currentTab = {
            name: '',
            data: []
        };
        let _next = false;
        if (_tabs.length > 0) {
            _currentTab = _tabs[0];
        }
        if (_tabs.length > 1) {
            _next = true;
        }

        this.state = {
            prev: false,
            tabIndex: 0,
            tabs: _tabs,
            currentTab: _currentTab,
            next: _next,
        };
    }

    _handleOnPressNext = () => {
        let _tabIndex = this.state.tabIndex;
        if (_tabIndex < this.state.tabs.length - 1 ) {
            _tabIndex = _tabIndex + 1;
            this.setState({
                tabIndex: _tabIndex,
                currentTab: this.state.tabs[_tabIndex],
                prev: true,
            });
        }
        if (_tabIndex < this.state.tabs.length - 1 ) {
            this.setState({next: true});
        } else {
            this.setState({next: false});
        }
    };

    _handleOnPressPrev = () => {
        let _tabIndex = this.state.tabIndex;
        if (_tabIndex > 0 ) {
            _tabIndex = _tabIndex - 1;
            this.setState({
                tabIndex: _tabIndex,
                currentTab: this.state.tabs[_tabIndex],
                next: true
            });
        }
        if (_tabIndex > 0 ) {
            this.setState({prev: true});
        } else {
            this.setState({prev: false});
        }
    };

    render() {
        return (
            <Col>
                <TabHeader
                    prev={this.state.prev}
                    onPressPrev={this._handleOnPressPrev}
                    tabname={this.state.currentTab.name}
                    next={this.state.next}
                    onPressNext={this._handleOnPressNext}
                />
                {
                    this.props.image !== undefined ? <ImageJumbotron
                        image={this.props.image}/> : null
                }
                <View>
                    {this.state.currentTab.data.map((dataInfo) => {
                        if (dataInfo.type === 'title') {
                            return (
                                <TitleHeader
                                    key={dataInfo.id}
                                    text={dataInfo.text}/>
                            );
                        }
                        else if (dataInfo.type === 'subtitle') {
                            return (
                                <SubTitleHeader
                                    key={dataInfo.id}
                                    text={dataInfo.text}/>
                            );
                        }
                        else if (dataInfo.type === 'text') {
                            return (
                                <Paragraph
                                    key={dataInfo.id}
                                    text={dataInfo.text}/>
                            );
                        }
                        else if (dataInfo.type === 'banner') {
                            return (
                                <Banner
                                    key={dataInfo.id}
                                    image={dataInfo.image}/>
                            );
                        }
                        else if (dataInfo.type === 'jumbotron') {
                            return (
                                <ImageJumbotron
                                    key={dataInfo.id}
                                    image={dataInfo.image}/>
                            );
                        }
                        else if (dataInfo.type === 'fullscreenImage') {
                            return (
                                <Image
                                    key={dataInfo.id}
                                    source={dataInfo.image}
                                    style={{
                                        flex:1,
                                        width: null,
                                        height: deviceHeight * 0.8,
                                    }}/>
                            )
                        }
                        else if (dataInfo.type === 'thumbnail') {
                            return (
                                <Thumbnail
                                    key={dataInfo.id}
                                    primaryImage={dataInfo.primaryImage}
                                    primaryText={dataInfo.primaryText}
                                    secondaryText={dataInfo.secondaryText}
                                    tertiaryText={dataInfo.tertiaryText}
                                    secondaryImage={dataInfo.secondaryImage}
                                />
                            );
                        }
                        else if (dataInfo.type === 'bulletin') {
                            return (
                                <Bulletin
                                    key={dataInfo.id}
                                    list={dataInfo.list}/>
                            );
                        }
                    })}
                </View>
            </Col>
        );
    }
}

export default Tabs;
