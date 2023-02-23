import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import {
    getCurrentUserData,
    getDataStatus,
    getIsLoggedIn
} from "../../store/auth";
import { getCart, getCartDataStatus, loadCart } from "../../store/cart";
import ProductCartCard from "../ui/productCartCard";

const CartPage = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUserData = useSelector(getCurrentUserData());
    const currentUserDataStatus = useSelector(getDataStatus());
    const cartDataStatus = useSelector(getCartDataStatus());
    const cart = useSelector(getCart());

    useEffect(() => {
        if (currentUserDataStatus)
            dispatch(loadCart(currentUserData.cart.map(item => item.id)));
    }, [currentUserDataStatus]);

    if (!isLoggedIn) return <Redirect to="/login" />;
    if (!cartDataStatus) return "Loading...";

    return (
        <div className="">
            <h1 className="ms-3">Корзина</h1>
            {cart.map(product => (
                <ProductCartCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default CartPage;
