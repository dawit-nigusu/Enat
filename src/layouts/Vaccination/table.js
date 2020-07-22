import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import { Col, Row} from "react-native-easy-grid";

class table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRow(data, rowStyle, textStyle, index) {
        if (data.merge) {
            return (
                <Row style={rowStyle} key={index}>
                    <Col size={1} style={styles.cell}>
                        <Text style={textStyle}>{data.vaccine}</Text>
                    </Col>
                </Row>
            )
        }
        return (
            <Row style={rowStyle} key={index}>
                <Col size={1} style={styles.cell}>
                    <Text style={textStyle}>{data.vaccine}</Text>
                </Col>
                <Col size={3} style={styles.cell}>
                    <Text style={textStyle}>{data.date}</Text>
                </Col>
            </Row>
        );
    }

    render() {
        const header = {
            'date': 'የክትባት ቀን',
            'vaccine': 'ክትባት',
        };
        return (
            <View style={this.props.style}>
                {this.renderRow(header, styles.tableHeader, styles.headerText, 10000)}
                {
                    this.props.dataSource.map((data, index) => (
                        this.renderRow(data, index % 2 && styles.darkRow || styles.lightRow, styles.text, index)
                    ))
                }
            </View>
        );
    }
}

export default table;

const styles = StyleSheet.create({
    tableHeader: {
        backgroundColor: "#ec407a",
        justifyContent: 'space-between'
    },
    cell: {
        flex: 1,
        borderColor: "#fff",
        borderWidth: 1,
        padding: 2,
        alignItems: 'center',
        height: 'auto',
    },
    headerText: {
        color: "#fff",
        fontSize: 18,
        lineHeight: 28,
    },
    lightRow: {
        backgroundColor: "#ffeeff"
    },
    darkRow: {
        backgroundColor: "#f8bbd0"
    },
    text: {
        color: "#4e4e4e",
        alignSelf: 'center',
    }
});
