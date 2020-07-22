import React from "react";
import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import icoMoonConfig from "../../../assets/fonts/config.json";
const Icon = createIconSetFromIcoMoon(icoMoonConfig, "Icomoon");

export default class CustomIcon extends React.Component {
    render() {
        let name = this.props.name !== undefined ? this.props.name : "icon-logoIcon";
        let size = this.props.size !== undefined ? this.props.size : 27;
        let color = this.props.color !== undefined ? this.props.color : "#fff";
        return (
            <Icon style={this.props.style} name={name} size={size} color={color} />
        );
    }
}
