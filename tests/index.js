"use strict"

import React, { Component } from 'react'
import { render } from "react-dom"

import AccountClient  from "account-realm-client"

import UserProvider from '../src/Components/UserProvider'

const acc = new AccountClient({
  realm: 'realm',
  app: 'dev',
  baseurl: 'http://localhost:3100'
})

acc.sso()

class App extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div >
        <header className="w3-bar w3-blue">
          <div className="w3-right">
            <button className="w3-bar-item w3-button" onClick={evt => this.props.accountClient.signup()}> Sign up</button>
            <button className="w3-bar-item w3-button" onClick={evt => this.props.accountClient.signin()}> Sign in</button>
            <button className="w3-bar-item w3-button" onClick={evt => this.props.accountClient.signout()}> Sign out</button>
          </div>
        </header>
        <div>
          {
            this.props.user ? 
              <p> {this.props.user.profile.displayName} </p>
            : this.props.user === undefined?
                <p> no sign-in user </p>
              : <p> Loading </p>
          }
        </div>
      </div>
    )
  }
}

document.addEventListener("DOMContentLoaded", function(event) {  
  render(
    <UserProvider accountClient = {acc} >
      <App />
    </UserProvider>, 
    document.getElementById("root"))
})

