import { useSelector } from "react-redux";

import { getCart } from "../../store/cart";

import ProductCartCard from "../ui/productCartCard";

const CartPage = () => {
    let cart = useSelector(getCart());
    if (cart) cart = cart.filter(p => !p.isDeleted);

    return (
        <div className="m-3">
            <h1>Корзина</h1>
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
