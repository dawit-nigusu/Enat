import React, {Component} from "react";
import { Menu } from "../../layouts/Menu";
import { items } from "./data";

class Lelijish extends Component {
    render() {
        const navigation = this.props.navigation;
        return (
            <Menu active="lelijish" navigation={navigation} items={items}/>
        );
    }
}

export default Lelijish;
