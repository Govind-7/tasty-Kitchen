import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="notfound-bg">
    <img
      src="https://res.cloudinary.com/dvzlfmmcb/image/upload/v1692854525/erroring_1_120_lll2ly.png"
      alt="not found"
    />
    <h1>Page Not Found</h1>
    <p>
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button className="notfound-home-but" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound
