import { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function CartPage({ CartItems, setCartItems }) {

    const [placed, setplaced] = useState(false);

    function deleteItem(item) {
        const updatedItems = CartItems.filter((i) => {
            if (i.product._id !== item.product._id) {
                return true;
            }
        })
        setCartItems(updatedItems)
    }
    function increaseCount(item) {
        if (item.product.stock == item.count) {
            return;
        }
        const updatedItems = CartItems.map((i) => {
            if (i.product._id == item.product._id) {
                i.count++
            }
            return i;
        })
        setCartItems(updatedItems)
    }

    function decreaseCount(item) {
        if (item.count > 1) {
            const updatedItems = CartItems.map((i) => {
                if (i.product._id == item.product._id) {
                    i.count--
                }
                return i;
            })
            setCartItems(updatedItems)
        }
    }

    function placeOrder() {
        fetch(process.env.REACT_APP_BASE_URL + '/orders', {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(CartItems)
        })
            .then(() => {
                setCartItems([]);
                setplaced(true);
                toast.success("ORDER SUCCESSFULLY PLACED!")
            })
    }

    return CartItems.length > 0 ? <Fragment>
        <div class="container container-fluid">
            <h2 class="mt-5">Your Cart: <b>{CartItems.length} Items</b></h2>

            <div class="row d-flex justify-content-between">
                <div class="col-12 col-lg-8">
                    {CartItems.map((item) => (
                        <Fragment>
                            <hr />
                            <div class="cart-item">
                                <div class="row">
                                    <div class="col-4 col-lg-3">
                                        <img src={item.product.images[0].image} alt={item.product.name} height="140" width="115" />
                                    </div>

                                    <div class="col-5 col-lg-3">
                                        <Link to={`/products/${item.product._id}`}>{item.product.name}</Link>
                                    </div>


                                    <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                                        <p id="card_item_price">₹{item.product.price}</p>
                                    </div>

                                    <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                                        <div class="stockCounter d-inline">
                                            <span class="btn btn-danger minus" onClick={() => decreaseCount(item)}>-</span>

                                            <input type="number" class="form-control count d-inline" value={item.count} readOnly />

                                            <span class="btn btn-primary plus" onClick={() => increaseCount(item)}>+</span>
                                        </div>
                                    </div>

                                    <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                                        <i id="delete_cart_item" onClick={() => deleteItem(item)} class="fa-solid fa-trash-can"></i>
                                    </div>

                                </div>
                            </div>
                        </Fragment>)
                    )}
                </div>

                <div class="col-12 col-lg-3 my-4">
                    <div id="order_summary">
                        <h4>Order Summary</h4>
                        <hr />
                        <p>Subtotal:  <span class="order-summary-values">{CartItems.reduce((acc, item) => (acc + item.count), 0)} (Units)</span></p>
                        <p>Est. total: <span class="order-summary-values">₹{CartItems.reduce((acc, item) => (acc + item.product.price * item.count), 0)} </span></p>

                        <hr />
                        <button id="checkout_btn" class="btn btn-primary btn-block" onClick={placeOrder}>Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment> : (!placed ? <h2 className='mt-5'>Your Cart is Empty!</h2> : <Fragment><h2 className='mt-5'>ORDER COMPLETED!</h2><p>Your Order has been placed successfully.. Happy shopping!</p></Fragment>)
}