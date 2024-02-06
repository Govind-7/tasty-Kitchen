import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {AiOutlineMenu} from 'react-icons/ai'
import {ImCross} from 'react-icons/im'
import './index.css'

class Header extends Component {
  state = {mMode: false}

  logoutFunction = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  specialFunc = () => {
    this.setState(prevS => ({mMode: !prevS.mMode}))
  }

  render() {
    const {mMode} = this.state
    return (
      <div>
        <nav className="header-bg">
          <div className="header-heading">
            <Link to="/">
              <img
                alt="website logo"
                src="https://res.cloudinary.com/dvzlfmmcb/image/upload/v1692598499/Frame_274_basvzz.svg"
              />
            </Link>
            <Link to="/" className="new-icon">
              <h1>Tasty Kitchen</h1>
            </Link>
          </div>

          <div className="bg-home-2">
            <Link className="head-special" to="/">
              <p>Home</p>
            </Link>
            <Link className="head-special" to="/cart">
              <p>Cart</p>
            </Link>

            <button
              className="header-button"
              onClick={this.logoutFunction}
              type="button"
            >
              Logout
            </button>

            <button
              onClick={this.specialFunc}
              className="menu-button"
              type="button"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </nav>
        {mMode && (
          <nav className="mobile-view-align">
            <Link className="one" to="/">
              <p>Home</p>
            </Link>
            <Link className="one" to="/cart">
              <p>Cart</p>
            </Link>

            <button
              className="but1"
              onClick={this.logoutFunction}
              type="button"
            >
              Logout
            </button>

            <button className="but2" onClick={this.specialFunc} type="button">
              <ImCross />
            </button>
          </nav>
        )}
      </div>
    )
  }
}

export default withRouter(Header)
