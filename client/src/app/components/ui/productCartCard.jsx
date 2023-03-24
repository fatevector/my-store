import { useDispatch, useSelector } from "react-redux";

import history from "../../utils/history";
import {
    getCurrentUserData,
    getDataStatus,
    getIsLoggedIn,
    getUserCart,
    updateProductQuantity
} from "../../store/auth";
import { addProductToCart, removeProductFromCart } from "../../store/cart";
import { deleteProductById } from "../../store/products";

import Counter from "../common/counter";

const ProductCartCard = ({
    product,
    onCartPage = false,
    onAdminPage = false
}) => {
    const dispatch = useDispatch();
    const currentUserData = useSelector(getCurrentUserData());
    const currentUserDataStatus = useSelector(getDataStatus());
    const userCart = useSelector(getUserCart());
    const inCart = currentUserDataStatus
        ? currentUserData.cart.find(p => p.productId === product._id)
        : false;
    const productQuantity = inCart
        ? userCart.find(p => p.productId === product._id).quantity
        : 1;
    const isLoggedIn = useSelector(getIsLoggedIn());

    const handleNavToCart = () => {
        history.push("/cart");
    };

    const handleAddToCart = product => {
        if (isLoggedIn) dispatch(addProductToCart(product));
        else history.push("/login", { from: history.location });
    };

    const handleRemoveFromCart = id => {
        dispatch(removeProductFromCart(id));
    };

    const handleEditProduct = id => {
        history.push("/admin/edit/" + id);
    };

    const handleDeleteProduct = id => {
        dispatch(deleteProductById(id));
    };

    const handleUpdateQuantity = id => quantity => {
        dispatch(updateProductQuantity({ id, quantity }));
    };

    return (
        <div className="card mb-3 d-flex flex-row ps-0 text-body bg-body w-100">
            <img
                className="rounded-start"
                src={product.image}
                alt="Фото еще нет"
                width="300"
            />
            <div className="card-body">
                <h5 className="card-title text-body bg-body">{product.name}</h5>
                <p className="card-text text-body bg-body">
                    {product.definition}
                </p>
                <h3 className="card-text text-body text-end">
                    {product.price} руб.
                </h3>
                {!onAdminPage ? (
                    inCart ? (
                        <>
                            {onCartPage && (
                                <Counter
                                    onUpdate={handleUpdateQuantity(product._id)}
                                    initValue={productQuantity}
                                />
                            )}
                            <button
                                className="btn btn-lg btn-danger me-2 mb-2"
                                onClick={() =>
                                    handleRemoveFromCart(product._id)
                                }
                            >
                                Удалить из корзины
                            </button>
                            {!onCartPage && (
                                <button
                                    className="btn btn-lg btn-primary me-2 mb-2"
                                    onClick={handleNavToCart}
                                >
                                    Перейти к корзине
                                </button>
                            )}
                        </>
                    ) : (
                        <button
                            className="btn btn-lg btn-primary me-2 mb-2"
                            onClick={() => handleAddToCart(product)}
                        >
                            В корзину
                        </button>
                    )
                ) : (
                    <>
                        <button
                            className="btn btn-lg btn-secondary me-2 mb-2"
                            onClick={() => handleEditProduct(product._id)}
                        >
                            Редактировать
                        </button>
                        <button
                            className="btn btn-lg btn-danger me-2 mb-2"
                            onClick={() => handleDeleteProduct(product._id)}
                        >
                            Удалить
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCartCard;
