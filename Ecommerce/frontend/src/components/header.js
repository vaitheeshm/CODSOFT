import { Link } from "react-router-dom";
import SearchComponent from "./search";

export default function HeaderComponent({ CartItems }) {
    return (
        <nav className="navbar row">
            <div className="col-12 col-md-3">
                <div className="navbar-brand">
                    <Link to={'/'}><img width="150px" src="/images/logo.png" /></Link>
                </div>
            </div>

            <SearchComponent />

            <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
                <Link className="linktag" to={'/cart'}>
                    <span id="cart" className="ml-3">Cart</span>
                    <span className="ml-1" id="cart_count">{CartItems.length}</span>
                </Link>
            </div>
        </nav>
    )
}