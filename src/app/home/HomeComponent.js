import React, { Component } from 'react'

class HomeComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: props.petDetails.name
    }
  }

  componentDidMount(){
    //console.log(this.state)
  }

  handleChange = (e) => {
    this.setState({name:e.target.value})
  }

  handleSubmit = () => {
    this.props.updatePetDetails({name: this.state.name, type: ""})
  }

  render(){
    return (
      <div>
        <button onClick={() => this.props.toggleMyBool()}>{`Toggle ${this.props.myBool}`}</button><br/>
        <input type="text" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
        <input type="submit" value="Update" onClick={this.handleSubmit} />
      </div>
    )
  }
}

export default HomeComponent