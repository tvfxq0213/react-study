import React, { Component, createRef } from 'react';

class Try extends Component {
  render () {
    return (
      <li >
        <div>{this.props.tryInfo.try}</div>
        <div>{this.props.tryInfo.result}</div>
      </li>
    )
  }
}



export default Try;