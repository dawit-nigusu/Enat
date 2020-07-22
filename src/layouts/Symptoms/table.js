import React, {Component} from "react";
import {Text, View, StyleSheet} from "react-native";
import { Col, Row} from "react-native-easy-grid";


class table extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRow(data, rowStyle, textStyle, index) {
        return (
            <Row style={rowStyle} key={index}>
                <Col style={styles.cell}>
                    <Text style={textStyle}>{data}</Text>
                </Col>
            </Row>
        );
    }

    render() {
        const header = {
            'data': 'ስሜቱ የተመዘገበበት ቀን',
        };
        let notFound = null;
        if (this.props.dataSource.length === 0) {
            notFound = this.renderRow("የተመዘገበ ቀን የለም", styles.lightRow, styles.text, 1);
        }

        return (
            <View style={this.props.style}>
                {this.renderRow(header.data, styles.tableHeader, styles.headerText, 10000)}
                { notFound }
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
        borderColor: "#fff",
        borderWidth: 1,
        alignSelf: 'center',
        padding: 2,
        alignItems: 'center',
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
        color: "#4e4e4e"
    }
});
