import {useState} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {IoEyeOffSharp, IoEyeSharp} from 'react-icons/io5'
import {FaGoogle, FaFacebookSquare} from 'react-icons/fa'
// import {FaXTwitter} from 'react-icons/fa6'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const Signup = () => {
  const [passWord, setPassView] = useState('password')
  const token = Cookies.get('jwt_token')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [loading, setloading] = useState(false)

  //   console.log(email);

  const click = async event => {
    event.preventDefault()
    setloading(true)

    const url = 'https://tasty-kitchen-server.onrender.com/signup'
    const data = {username, email, password: pass}
    const details = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    try {
      const verific = await fetch(url, details)
      // console.log(verific);

      const verificjson = await verific.json()
      setloading(false)
      alert(verificjson.msg)

      // console.log(verificjson.token);
    } catch (error) {
      console.log('error som    ', error)
    }
  }

  const passVisible = () => {
    if (passWord === 'password') {
      setPassView('text')
    } else {
      setPassView('password')
    }
  }
  if (token !== undefined) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <div className="login-form">
        <form onSubmit={click}>
          <label htmlFor="email">Username</label>
          <br />

          <input
            placeholder="Jahn"
            required
            onChange={e => {
              setUsername(e.target.value)
            }}
            value={username}
            id="username"
            className="login-input-email"
            type="text"
          />

          <br />

          <label htmlFor="email">Email</label>
          <br />

          <input
            placeholder="exampl@demo.com"
            required
            onChange={e => {
              setEmail(e.target.value)
            }}
            value={email}
            id="email"
            className="login-input-email"
            type="text"
          />

          <br />

          <label htmlFor="password">Password</label>
          <br />
          <div className="pass-container">
            <input
              id="password"
              required
              placeholder="* * * * * * * * * * "
              onChange={e => {
                setPass(e.target.value)
              }}
              value={pass}
              className="login-input-pass"
              type={passWord}
            />
            <button type="button" onClick={passVisible} className="view-button">
              {passWord === 'password' ? (
                <IoEyeOffSharp size="25" />
              ) : (
                <IoEyeSharp size="25" />
              )}
            </button>
          </div>

          <br />
          <div className="forgot-container">
            <div>
              <input id="remember" required type="checkbox" />
              <label htmlFor="remember">
                Iagree to <Link to="/signup">privacy & terms</Link>
              </label>
            </div>
          </div>

          <button type="submit" className="login-button">
            Signup
          </button>
          {loading && (
            <Loader className="login-container" color="red" type="ThreeDots" />
          )}
        </form>
        <br />
        <p>
          Already have an account ?<Link to="/login"> sign in instead</Link>
        </p>

        <p>___________________or___________________</p>

        <div className="or-signup">
          <FaGoogle className="google" size="35" />
          <FaFacebookSquare className="facebook" size="35" />
          {/* <FaXTwitter className="xlu" size="35" /> */}
        </div>
      </div>
    </div>
  )
}

export default Signup
