import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    erMsg: '',
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const credentials = {
      username,
      password,
    }
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(credentials),
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    if (response.ok) {
      //   console.log(jsonData.jwt_token)
      Cookies.set('jwt_token', jsonData.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      //   console.log(jsonData.error_msg)
      this.setState({erMsg: jsonData.error_msg})
    }
  }

  render() {
    const {username, erMsg, password} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <form onSubmit={this.submitForm} className="login-card">
          <div className="logo-bg mobile-first-login">
            <img
              src="https://res.cloudinary.com/dvzlfmmcb/image/upload/v1692598499/Frame_274_basvzz.svg"
              alt="website logo"
            />
            <h1>Tasty Kitchens</h1>
          </div>
          <div className="m-img">
            <img
              alt="website login"
              src="https://res.cloudinary.com/dvzlfmmcb/image/upload/v1692946034/Rectangle_1457_apzyqu.png"
            />
          </div>

          <h1 className="login-head">Login</h1>
          <label htmlFor="userid">USERNAME</label>
          <br />
          <input
            value={username}
            onChange={this.changeUsername}
            className="input-size-login"
            id="userid"
            type="text"
          />
          <br />
          <label htmlFor="psw">PASSWORD</label>
          <br />
          <input
            value={password}
            onChange={this.changePassword}
            className="input-size-login"
            id="psw"
            type="password"
          />
          <br />
          <button className="but-login" type="submit">
            Login
          </button>
          {erMsg !== '' && <p>{erMsg}</p>}
        </form>

        <div>
          <img
            alt="website login"
            className="img-siz mobile-first-login "
            src="https://res.cloudinary.com/dvzlfmmcb/image/upload/v1692598150/Rectangle_1456_1_qgstsi.png"
          />
        </div>
      </div>
    )
  }
}

export default Login
