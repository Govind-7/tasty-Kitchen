import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
// import ContextRct from '../../Context/index'
import './index.css'
import FoodItem from '../FoodItem'

const resDetailsStatus = {
  loading: 'loading',
  success: 'success',
}

class RestDetails extends Component {
  state = {
    hotelData: '',
    foodItems: [],
    status: resDetailsStatus.loading,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    // console.log(id)
    const url = `https://apis.ccbp.in/restaurants-list/${id} `
    const token = Cookies.get('jwt_token')
    const options = {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const jsonData = await response.json()
    this.setState({
      hotelData: jsonData,
      foodItems: jsonData.food_items,
      status: resDetailsStatus.success,
    })
    // console.log(jsonData)
  }

  successFunction = () => {
    const {hotelData, foodItems} = this.state

    return (
      <div>
        <div className="rest-img-details-align">
          <img alt="restaurant" src={hotelData.image_url} />
          <div className="resta-details-align">
            <h1>{hotelData.name}</h1>
            <p>{hotelData.cuisine}</p>
            <p>{hotelData.location}</p>
            <div className="rating-align">
              <div>
                <p>{hotelData.rating}</p>
                <p>{hotelData.reviews_count} ratings</p>
              </div>
              <div>
                <p>{hotelData.cost_for_two} Cost for two</p>
              </div>
            </div>
          </div>
        </div>

        <ul className="ul-items-align">
          {foodItems.map(item => (
            <FoodItem key={item.id} data={item} />
          ))}
        </ul>
      </div>
    )
  }

  loadingFunction = () => (
    <div data-testid="restaurant-details-loader" className="loader-align">
      <Loader color="blue" type="ThreeDots" />
    </div>
  )

  aiFUnction = () => {
    const {status} = this.state
    switch (status) {
      case 'success':
        return this.successFunction()

      case 'loading':
        return this.loadingFunction()

      default:
        return ''
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.aiFUnction()}
        <Footer />
      </div>
    )
  }
}

export default RestDetails
