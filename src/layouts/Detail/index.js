import React, {Component} from "react";
import {Container, Content } from "native-base";
import Header from "../Common/Header";
import {
    DetailHeader, Paragraph, Bulletin, ImageJumbotron,
    TitleHeader, SubTitleHeader, Thumbnail, Banner, Bold,
} from "../Common/Detail";
import Tabs from "./tab";
import KickCounter from "../KickCounter";
import Vaccination from "../Vaccination";
import Symptoms from "../Symptoms";
import Contacts from "../Calls";
import BabyName from "../BabyName"
import { BackHandler } from "react-native";

class Detail extends Component {

    constructor(props){
      super(props);
      this.backButtonClick = this.backButtonClick.bind(this);
    }

    componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.backButtonClick);
    }

    componentWillUnmount(){
      BackHandler.removeEventListener('hardwareBackPress', this.backButtonClick);
    }

    backButtonClick = () => {
      if(this.props.navigation && this.props.navigation.goBack){
        this.props.navigation.navigate(this.props.navigation.getParam('back', 'Home'));
        return true;
      }
      return false;
    }

    render() {
        const navigation = this.props.navigation;
        const header = navigation.getParam('header', []);
        const data = navigation.getParam('data', []);
        const route = navigation.getParam('back', 'Home');
        return (
            <Container style={{
                backgroundColor: "#FFF"
            }}>
                <Header />
                <DetailHeader text={header}
                              onPress={() => navigation.navigate(route)}/>
                <Content>
                    {data.map((dataInfo) => {
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
                            )
                        }
                        else if (dataInfo.type === 'text') {
                            return (
                                <Paragraph
                                    key={dataInfo.id}
                                    text={dataInfo.text}/>
                            );
                        }
                        else if (dataInfo.type === 'bold') {
                            return (
                                <Bold
                                    key={dataInfo.id}
                                    text={dataInfo.text}/>
                            );
                        }
                        else if (dataInfo.type === 'banner') {
                            return (
                                <Banner
                                    key={dataInfo.id}
                                    bannerid={dataInfo.bannerId}/>
                            );
                        }
                        else if (dataInfo.type === 'jumbotron') {
                            return (
                                <ImageJumbotron
                                    key={dataInfo.id}
                                    image={dataInfo.image}/>
                            );
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
                        else if (dataInfo.type === 'tabs') {
                            return (
                                <Tabs
                                    key={dataInfo.id}
                                    tabs={dataInfo.tabs}
                                    image={dataInfo.image}/>);
                        }
                        else if (dataInfo.type === 'kickcounter') {
                            return (
                                <KickCounter
                                    key={dataInfo.id}/>
                            );
                        }
                        else if (dataInfo.type === 'vaccination') {
                            return (
                                <Vaccination
                                    key={dataInfo.id}
                                    image={dataInfo.image}/>
                            );
                        }
                        else if (dataInfo.type === 'symptoms') {
                            return (
                                <Symptoms
                                    key={dataInfo.id}
                                    image={dataInfo.image}/>
                            );
                        }
                        else if (dataInfo.type === 'contacts') {
                            return (
                                <Contacts
                                    key={dataInfo.id}
                                    image={dataInfo.image}/>
                            );
                        }
                        else if (dataInfo.type === 'babyname') {
                            return (
                                <BabyName
                                    key={dataInfo.id}
                                    image={dataInfo.image}/>
                            );
                        }
                    })}
                </Content>
            </Container>
        );
    }
}

export default Detail;
