import { useSelector } from "react-redux";

import { getCart } from "../../store/cart";
import { getUserCart } from "../../store/auth";

import ProductCartCard from "../ui/productCartCard";

const CartPage = () => {
    let cart = useSelector(getCart());
    if (cart) cart = cart.filter(p => !p.isDeleted);
    const userCart = useSelector(getUserCart());
    const calcPrice = () => {
        let price = 0;
        if (cart.length !== 0)
            cart.forEach(product => {
                const { quantity } = userCart.find(
                    p => p.productId === product._id
                );
                price += product.price * quantity;
            });
        return price;
    };

    return (
        <div className="m-3">
            <div className="d-flex justify-content-between align-items-baseline">
                <h1>Корзина</h1> <h3>Итого: {calcPrice()} руб.</h3>
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
