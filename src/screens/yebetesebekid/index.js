import React, {Component} from "react";
import { Menu } from "../../layouts/Menu";
import { items } from "./data";

class YebetesebEkid extends Component {
    render() {
        const navigation = this.props.navigation;

        return (
            <Menu active="yebeteseb_ekid" navigation={navigation} items={items}/>
        );
    }
}

export default YebetesebEkid;
