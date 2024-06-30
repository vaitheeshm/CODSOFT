import { Fragment } from "react";
import ProductsContainer from "../components/products";
import {useSearchParams} from 'react-router-dom';
import { useEffect, useState } from "react"

export default function HomeComponent() {

    const [products, setProducts] = useState([]);
    const [searchparams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetch(process.env.REACT_APP_BASE_URL + '/products?'+searchparams)
            .then(res => res.json())
            .then(res => setProducts(res.products))
    }, [searchparams])

    return (
        <Fragment>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
                <div className="row">
                    {products.map(product => <ProductsContainer product={product} />)}
                </div>
            </section>
        </Fragment>
    )
}