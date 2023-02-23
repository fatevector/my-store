import { useDispatch, useSelector } from "react-redux";

import history from "../../utils/history";
import { getCurrentUserData } from "../../store/auth";
import { addProductToCart, removeProductFromCart } from "../../store/cart";

const ProductCartCard = ({ product }) => {
    const dispatch = useDispatch();
    const currentUserData = useSelector(getCurrentUserData());
    const inCart = currentUserData.cart.find(p => p.id === product.id);

    const handleNavToCart = () => {
        history.push("/cart");
    };

    const handleAddToCart = product => {
        dispatch(addProductToCart(product));
    };

    const handleRemoveFromCart = id => {
        dispatch(removeProductFromCart(id));
    };

    return (
        <div className="card m-3 d-flex flex-row">
            <img
                className="rounded-start"
                src={product.image}
                alt="Фото еще нет"
                width="300"
            />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.definition}</p>
                {inCart ? (
                    <>
                        <button
                            className="btn btn-lg btn-danger me-2 mb-2"
                            onClick={() => handleRemoveFromCart(product.id)}
                        >
                            Удалить из корзины
                        </button>
                        <button
                            className="btn btn-lg btn-primary me-2 mb-2"
                            onClick={handleNavToCart}
                        >
                            Перейти к корзине
                        </button>
                    </>
                ) : (
                    <button
                        className="btn btn-lg btn-primary me-2 mb-2"
                        onClick={() => handleAddToCart(product)}
                    >
                        В корзину
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCartCard;
