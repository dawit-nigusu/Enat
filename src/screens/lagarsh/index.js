import React, {Component} from "react";
import {Menu} from "../../layouts/Menu";
import { items } from "./data";

class Lagarsh extends Component {
    render() {
        const navigation = this.props.navigation;

        return (
            <Menu active="lagarsh" navigation={navigation} items={items}/>
        );
    }
}

export default Lagarsh;
