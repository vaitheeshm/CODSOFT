import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'

export default function ProductDetail({ CartItems, setCartItems }) {
    const [product, setProduct] = useState(null);
    const [count, setCount] = useState(1)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const baseUrl = process.env.REACT_APP_BASE_URL
                const url = `${baseUrl}/products/${id}`;

                const res = await fetch(url);

                if (!res.ok) {
                    const errorText = await res.text();
                    throw new Error(`Network response was not ok: ${res.statusText}`);
                }

                const data = await res.json();

                if (data.success && data.Products) {
                    setProduct(data.Products);
                } else {
                    throw new Error('Product not found');
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    function increaseCount() {
        if (count > 0 && count < product.stock) {
            setCount(count + 1)
        }
    }

    function decreaseCount() {
        if (count > 1) {
            setCount(count - 1)
        }
    }

    function addToCart() {
        const itemExist = CartItems.find((item) => item.product._id == product._id)
        if (!itemExist) {
            const newItems = { count, product };
            setCartItems((oldstate) => [...oldstate, newItems])
            toast.success("Cart items added !")
        }

    }

    return <div className="container container-fluid">
        <div className="row f-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
                <img src={product.images[0].image} alt={product.name} height="300" width="300" />
            </div>

            <div className="col-12 col-lg-5 mt-5">
                <h3>{product.name}</h3>
                <p id="product_id">Product # {product._id}</p>

                <hr />

                <div className="rating-outer">
                    <div className="rating-inner" style={{ width: `${product.ratings * 20}%` }}></div>
                </div>

                <hr />

                <p id="product_price">₹{product.price}</p>
                <div className="stockCounter d-inline">
                    <span className="btn btn-danger minus" onClick={decreaseCount}>-</span>

                    <input type="number" className="form-control count d-inline" value={count} readOnly />

                    <span className="btn btn-primary plus" onClick={increaseCount}>+</span>
                </div>
                <button type="button" onClick={addToCart} disabled={product.stock == 0} id="cart_btn" className="btn btn-primary d-inline ml-4">Add to Cart</button>

                <hr />

                <p>Status: <span id="stock_status" className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span></p>

                <hr />

                <h4 className="mt-2">Description:</h4>
                <p>{product.description}</p>

                <hr />
                <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>

                <div className="rating w-50"></div>
            </div>
        </div>
    </div>
}
