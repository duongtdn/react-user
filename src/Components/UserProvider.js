"use strict"

import React, { Component } from 'react'

class UserProvider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    // escape server side
    if (typeof window === 'undefined') {
      if (this.props.user) {
        this.setState({ user: this.props.user });
      }
      return
    }
    if (this.props.accountClient) {
      this.props.accountClient.on('updated', user =>  this.setState({user}) )
      this.props.accountClient.on('authenticated', user =>  this.setState({user}) )
      this.props.accountClient.on('unauthenticated', () =>  this.setState({user: undefined}) )
    }    
  }

  render() {
    return (
      <div>
        {this.passUserToChildrenProps()}
      </div>
    )
  }

  passUserToChildrenProps() {
    return React.Children.map(
      this.props.children, 
      (child) => {
        return React.cloneElement(child, { user: this.state.user, accountClient: this.props.accountClient });
      }
    )
  }

}

export default UserProvider
