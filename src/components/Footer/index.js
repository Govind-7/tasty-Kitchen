import {
  FaInstagram,
  FaPinterestSquare,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-bg">
      <div>
        <div className="titel-footer">
          <img
            src="https://res.cloudinary.com/dvzlfmmcb/image/upload/v1692598499/Frame_274_basvzz.svg"
            alt="website-footer-logo"
          />
          <h1>Tasty Kitchens</h1>
        </div>
        <p>
          The only thing we are serious about is food.
          <br /> Contact us on
        </p>

        <FaPinterestSquare testid="pintrest-social-icon" />
        <FaInstagram testid="instagram-social-icon" />
        <FaTwitter testid="twitter-social-icon" />
        <FaFacebookSquare testid="facebook-social-icon" />
      </div>
    </div>
  )
}
