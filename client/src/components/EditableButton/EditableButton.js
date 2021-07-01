
import React, { Component } from 'react'
import EditButton from 'react-edit-button'
import { Button } from '@material-ui/core';
import './styles.css'
import { labelsNames } from "../../marking.js"


class EditableButton extends Component {
  state = {
    text: this.props.text,
    enabled: false
  }
  onAccept = (text) => {
    this.setState({ text: text, enabled: false })
    labelsNames[this.props.labelId] = text;
  }
  onReject = () => {
    this.setState({ enabled: false })
  }
  onEditButtonClick = () => {
    this.setState({ enabled: true })
  }

  render () {
    return (
      <EditButton onAccept={this.onAccept} onEditButtonClick={this.onEditButtonClick} onReject={this.onReject} editMode={this.state.enabled} style={{paddingRight: 0}}>
        <Button className={this.props.className} style={this.props.style} variant="contained" size="small" onClick={this.props.onClick}>{this.state.text}</Button> 
      </EditButton>
    )
  }
}

export default EditableButton;
