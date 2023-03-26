import { useDispatch, useSelector } from "react-redux";

import history from "../../utils/history";
import {
    getCurrentUserData,
    getDataStatus,
    getIsLoggedIn
} from "../../store/auth";
import { addProductToCart, removeProductFromCart } from "../../store/cart";

const ProductMenuCard = ({ product }) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const currentUserData = useSelector(getCurrentUserData());
    const currentUserDataStatus = useSelector(getDataStatus());
    const inCart = currentUserDataStatus
        ? currentUserData.cart.find(p => p.productId === product._id)
        : false;

    const handleNavToProductPage = (e, id) => {
        if (!e.target.className.includes("btn")) {
            history.push(`/product/${id}`);
        }
    };

    const handleAddToCart = product => {
        if (isLoggedIn) dispatch(addProductToCart(product));
        else history.push("/login", { from: history.location });
    };

    const handleRemoveFromCart = id => {
        dispatch(removeProductFromCart(id));
    };

    return (
        <div className="col-4">
            <div
                className="card text-body bg-body"
                role="button"
                onClick={e => handleNavToProductPage(e, product._id)}
            >
                <div>
                    <img
                        className="card-img-top"
                        src={product.image}
                        alt="Фото еще нет"
                    />
                </div>
                <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <div className="d-flex justify-content-between">
                        {inCart ? (
                            <button
                                className="btn btn-danger me-2 mb-2"
                                onClick={() =>
                                    handleRemoveFromCart(product._id)
                                }
                            >
                                Удалить из корзины
                            </button>
                        ) : (
                            <button
                                className="btn btn btn-primary me-2 mb-2"
                                onClick={() => handleAddToCart(product)}
                            >
                                В корзину
                            </button>
                        )}
                        <h3 className="card-text text-body text-end">
                            {product.price} руб.
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductMenuCard;
