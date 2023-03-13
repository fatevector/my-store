import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUserData, getDataStatus } from "../../store/auth";
import { getCartDataStatus, loadCart } from "../../store/cart";

import CartPage from "../pages/cartPage";

const Cart = () => {
    const dispatch = useDispatch();
    const currentUserData = useSelector(getCurrentUserData());
    const currentUserDataStatus = useSelector(getDataStatus());
    const cartDataStatus = useSelector(getCartDataStatus());

    useEffect(() => {
        if (currentUserDataStatus)
            dispatch(
                loadCart(currentUserData.cart.map(item => item.productId))
            );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserDataStatus]);

    if (!cartDataStatus) return "Loading...";

    return <CartPage />;
};

export default Cart;
