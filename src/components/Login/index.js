import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    erMsg: '',
    loading: false,
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  submitForm = async event => {
    event.preventDefault()
    this.setState({loading: true})
    const {username, password} = this.state
    const credentials = {
      username,
      password,
    }
    // console.log(credentials)
    // const url = 'https://apis.ccbp.in/login'
    const url = 'https://tasty-kitchen-server.onrender.com/api/login'

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: JSON.stringify(credentials),
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    // console.log(jsonData.token)
    if (response.ok) {
      //   console.log(jsonData.jwt_token)
      Cookies.set('jwt_token', jsonData.token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      //   console.log(jsonData.error_msg)
      this.setState({erMsg: jsonData.msg})
    }
    this.setState({loading: false})
  }

  render() {
    const {username, loading, erMsg, password} = this.state
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
            placeholder="admin@demo.com"
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
            placeholder="admin"
            id="psw"
            type="password"
          />
          <br />
          <button className="but-login" type="submit">
            Login
          </button>
          {erMsg !== '' && <p>{erMsg}</p>}
          {loading && (
            <Loader className="login-container" color="red" type="ThreeDots" />
          )}
          <p>
            If you don't have account ?
            <Link to="/signup" className="signup-align">
              signup
            </Link>
          </p>
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
