import {AiFillStar} from 'react-icons/ai'
import ContextRct from '../../Context'

import './index.css'

const FoodItem = props => {
  const {data} = props
  const {id} = data
  return (
    <ContextRct.Consumer>
      {value => {
        const {cartItems, addCartItems, QtyDcr, QtyIncr} = value
        const filt = cartItems.filter(item => item.id === id)

        const addingCart = () => {
          addCartItems(data)
        }

        const increment = () => {
          QtyIncr(id)
        }

        const dicrement = () => {
          QtyDcr(id)
        }

        return (
          <li data-testid="foodItem" className="item-align ">
            <img
              className="item-img-size"
              src={data.image_url}
              alt={data.name}
            />
            <div className="line-spacing">
              <h5>{data.name}</h5>
              <p>{data.cost}</p>
              <p>
                {' '}
                <AiFillStar color="#FFCC00" size="15" />
                {data.rating}
              </p>
              {filt.length === 0 ? (
                <button
                  type="button"
                  className="f-add-but"
                  onClick={addingCart}
                >
                  Add
                </button>
              ) : (
                <div className="f-item-align">
                  <button
                    data-testid="decrement-count"
                    onClick={dicrement}
                    type="button"
                  >
                    -
                  </button>
                  <p data-testid="active-count">{filt[0].quantity}</p>
                  <button
                    data-testid="increment-count"
                    onClick={increment}
                    type="button"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </li>
        )
      }}
    </ContextRct.Consumer>
  )
}

export default FoodItem
