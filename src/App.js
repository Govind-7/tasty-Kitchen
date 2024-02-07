import {Component} from 'react'
import {Route, Redirect, Switch} from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Cart from './components/Cart'
import Home from './components/Home'
import ContextRct from './Context/index'
import RestDetails from './components/RestDetails'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {cartItems: []}

  addCartItems = lov => {
    const jnu = {
      id: lov.id,
      cost: lov.cost,
      foodType: lov.food_type,
      imageUrl: lov.image_url,
      name: lov.name,
      rating: lov.rating,
      quantity: 1,
      totalCost: lov.cost,
    }

    const a = JSON.parse(localStorage.getItem('cartData'))
    let lst = [jnu]
    if (a !== null) {
      lst = [...a, jnu]
    }

    localStorage.setItem('cartData', JSON.stringify(lst))

    // const locaList = JSON.parse(localStorage.getItem('arry'))
    // console.log(locaList)
    // localStorage.removeItem('arry')

    this.setState(prevS => ({cartItems: [...prevS.cartItems, jnu]}))
  }

  QtyIncr = jnu => {
    this.setState(prevS => ({
      cartItems: prevS.cartItems.map(item => {
        if (item.id === jnu) {
          return {
            id: item.id,

            imageUrl: item.imageUrl,
            name: item.name,

            quantity: item.quantity + 1,
            cost: item.cost,
          }
        }
        return item
      }),
    }))

    const darling = JSON.parse(localStorage.getItem('cartData'))
    const darlingList = darling.map(item => {
      if (item.id === jnu) {
        return {
          id: item.id,

          imageUrl: item.imageUrl,
          name: item.name,

          quantity: item.quantity + 1,
          cost: item.cost,
        }
      }
      return item
    })
    localStorage.setItem('cartData', JSON.stringify(darlingList))
  }

  QtyDcr = jnu => {
    this.setState(prevS => ({
      cartItems: prevS.cartItems
        .map(item => {
          if (item.id === jnu) {
            if (item.quantity === 1) {
              //   console.log('map0')
              return null
            }
            // console.log('map1')
            return {
              id: item.id,

              imageUrl: item.imageUrl,
              name: item.name,

              quantity: item.quantity - 1,
              cost: item.cost,
            }
          }
          return item
        })
        .filter(item => item !== null),
    }))

    const darling = JSON.parse(localStorage.getItem('cartData'))
    const darlingList = darling
      .map(item => {
        if (item.id === jnu) {
          if (item.quantity === 1) {
            //   console.log('map0')
            return null
          }
          // console.log('map1')
          return {
            id: item.id,

            imageUrl: item.imageUrl,
            name: item.name,

            quantity: item.quantity - 1,
            cost: item.cost,
          }
        }
        return item
      })
      .filter(item => item !== null)
    localStorage.setItem('cartData', JSON.stringify(darlingList))
  }

  emptyCart = () => {
    this.setState({cartItems: []})
  }

  render() {
    const {cartItems} = this.state
    // console.log(cartItems)
    // localStorage.removeItem('cartData')

    return (
      <ContextRct.Provider
        value={{
          sortByOptions,
          cartItems,
          addCartItems: this.addCartItems,
          QtyIncr: this.QtyIncr,
          QtyDcr: this.QtyDcr,
          emptyCart: this.emptyCart,
        }}
      >
        <Switch>
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ContextRct.Provider>
    )
  }
}
export default App
