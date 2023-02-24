import { useSelector } from "react-redux";

import { getCartDataStatus } from "../../store/cart";

import CartPage from "../pages/cartPage";

const Cart = () => {
    const cartDataStatus = useSelector(getCartDataStatus());

    if (!cartDataStatus) return "Loading...";

    return <CartPage />;
};

export default Cart;
