class ButtonEdit extends Component {
  text = 'edit me';
  onAccept = (text) => {
    this.setState({ text })
  }

  render () {
    return (
      <EditButton onAccept={this.onAccept}>
        <span>{this.text}</span>
        
      </EditButton>
    )
  }
}

export default ButtonEdit;
