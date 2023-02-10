import React, { Component } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import Switch from "react-switch";

class SwitchTheme extends Component {
  constructor(props) {
    super(props);
    if (null !== props.checked) {
        if (props.checked == 'light') {
            this.state = { checked:  true};
        } else {
            this.state = { checked:  false};
        }
        
    } else {
        this.state = { checked:  false};
    }
    this.handleChange = this.handleChange.bind(this);
    console.log('switch', props.checked);
  }

  handleChange(checked) {
    console.log('checked', checked)
    this.setState({ checked });
    let theme
    if (checked) {
        theme = 'light';
    } else {
        theme = 'dark';
    }
    this.props.onChange(theme);
  }

  render() {
    return (
      <label>
        {/* <span>Switch Theme</span> */}
        <Switch onChange={this.handleChange} checked={this.state.checked}
            uncheckedIcon={
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }} >
                    <FiMoon />  
                </div>
            }
            checkedIcon={
                <div style={{
                    display: "grid",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }} >
                    <FiSun />  
                </div>
            }
            offColor="#444"
            onColor="#aaa"
            offHandleColor="#666"
            onHandleColor="#fff "
        />
      </label>
    );
  }
}

export default SwitchTheme;