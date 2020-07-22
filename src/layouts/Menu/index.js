import React from "react";
import {Image} from "react-native";
import { Container, Content, Text, Card, CardItem } from "native-base";
import {Col, Row} from "react-native-easy-grid";
import styles from "./styles";
import variable from "./../../theme/variables/platform";
import Header from "../Common/Header";
import Footer from "../Common/Footer";

const Tile = (props) => {
    const navigation = props.navigation;
    const data = props.data;
    return (
        <Col size={1} style={[props.style]}>
            <Card style={[styles.mb10, styles.cardColumn]}>
                <CardItem cardBody
                          button onPress={() => navigation.navigate("Detail", data)}>
                    <Image
                        style={styles.imageContainer}
                        source={data.image}
                    />
                </CardItem>
                <CardItem cardBody style={styles.card}
                          button onPress={() => navigation.navigate("Detail", data)}>
                    <Text style={styles.text}>{data.header}</Text>
                </CardItem>
            </Card>
        </Col>
    );
};

const Menu = (props) => {
    const navigation = props.navigation;
    const items = props.items;
    const active = props.active;
    const menuItems = [];

    for (let i = 0; i < Math.floor((items.length + 1) / 2); i++){
        let tiles = [];
        for (let j = 0; j < Math.min(2, items.length - (i * 2)); j++)
        {
            tiles.push(
                <Tile key={j}
                      navigation={navigation}
                      data={items[i * 2 + j]}
                      style={styles.m10}/>
            )
        }
        menuItems.push(
            <Row key = {i} style={{
                alignItems: 'center',
            }}>
                {tiles}
            </Row>
        )
    }

    return (
        <Container style={styles.container}>
            <Header />
            <Content style={{
                padding:5,
                marginBottom: variable.footerHeight
            }}>
                { menuItems }
            </Content>
            <Footer navigation={navigation} active={active}/>
        </Container>
    );
};

export {Menu};
