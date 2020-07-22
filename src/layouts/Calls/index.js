import React, {Component} from "react";
import { Container, Content, Text, View, Thumbnail, Card, CardItem, } from "native-base";
import call from "react-native-phone-call";
import styles from "./styles";
import Banner from "../Common/Banner";
import Header from "../Common/Header";
import {ImageJumbotron} from "../Common/Detail";
import CustomIcon from "../Common/Icons";

const ContactCard = (props) => {
    const args = {
        number: props.phone,
        prompt: false,
    };
    return (
        <Card style={{marginLeft: 15, marginRight: 15}}>
            <CardItem button onPress={() => call(args).catch(console.error)}>
                <View style={{flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-end"}}>
                    <View style={{justifyContent: "center", alignItems: "center", marginBottom: 10, marginRight: 15}}>
                        <Text style={{color: "#b4004e", fontWeight: "bold", marginBottom: 15}}>{props.place}</Text>
                        <Text note>{props.phone}</Text>
                    </View>
                    <View>
                        <CustomIcon name="phone" style={{color: "#b4004e", fontWeight: "bold", marginBottom: 15}}/>
                    </View>
                </View>
            </CardItem>
        </Card>
    );
};

class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
                <Content>
                    <ImageJumbotron image={this.props.image} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"}/>
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <Banner />

                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <Banner />

                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <ContactCard place={"ሚኪ የቤተሰብ ዕቅድ ማዕከል"} phone={"0912345678"} />
                    <Banner />

                </Content>
        );
    }
}

export default Contacts;
