import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUserData, getDataStatus } from "../../store/auth";
import { getCart, loadCart } from "../../store/cart";

import ProductCartCard from "../ui/productCartCard";

const CartPage = () => {
    const dispatch = useDispatch();
    const currentUserData = useSelector(getCurrentUserData());
    const currentUserDataStatus = useSelector(getDataStatus());
    const cart = useSelector(getCart());

    useEffect(() => {
        if (currentUserDataStatus)
            dispatch(loadCart(currentUserData.cart.map(item => item.id)));
    }, [currentUserDataStatus]);

    return (
        <div className="m-3">
            <h1>Корзина</h1>
            {cart.map(product => (
                <ProductCartCard key={product.id} product={product} />
            ))}
        </div>
    );
};

export default CartPage;
