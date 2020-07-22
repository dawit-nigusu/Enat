import React, {Component} from "react";
import { Content, Container } from "native-base";
import Banner from "../Common/Banner";
import Header from "../Common/Header";
import {ImageJumbotron} from "../Common/Detail";


const cover = require('../../../assets/sidemenu/sidebar.jpg');

class AboutUs extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Container>
                <Header />
                <Content>
                    <ImageJumbotron image={cover} />

                    <Banner />

                </Content>
            </Container>
        );
    }
}

export default AboutUs;
