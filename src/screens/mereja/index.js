import React, {Component} from "react";
import { Menu } from "../../layouts/Menu";
import { items } from "./data";

class Mereja extends Component {
    render() {
        const navigation = this.props.navigation;

        return (
            <Menu active="mereja" navigation={navigation} items={items}/>
        );
    }
}

export default Mereja;
