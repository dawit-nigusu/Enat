import React, {Component} from "react";
import { Menu } from "../../layouts/Menu";
import { items } from "./data";

class Lanchi extends Component {
    render() {
        const navigation = this.props.navigation;

        return (
            <Menu active="lanchi" navigation={navigation} items={items}/>
        );
    }
}

export default Lanchi;
