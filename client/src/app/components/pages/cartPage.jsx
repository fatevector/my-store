import { useSelector } from "react-redux";

import { getCart } from "../../store/cart";

import ProductCartCard from "../ui/productCartCard";

const CartPage = () => {
    let cart = useSelector(getCart());
    if (cart) cart = cart.filter(p => !p.isDeleted);

    const culcPrice = () => {
        if (cart.length !== 0)
            return cart.map(p => p.price).reduce((a, b) => a + b, 0);
        return 0;
    };

    return (
        <div className="m-3">
            <div className="d-flex justify-content-between align-items-baseline">
                <h1>Корзина</h1> <h3>Итого: {culcPrice()} руб.</h3>
            </div>
            {cart.length !== 0 ? (
                cart.map(product => (
                    <ProductCartCard
                        key={product._id}
                        product={product}
                        onCartPage={true}
                    />
                ))
            ) : (
                <p className="mt-3 text-body">Вы еще ничего сюда не положили</p>
            )}
        </div>
    );
};

export default CartPage;
