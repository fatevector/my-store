import { useDispatch, useSelector } from "react-redux";

import history from "../../utils/history";
import { getCurrentUserData, getDataStatus } from "../../store/auth";
import { addProductToCart, removeProductFromCart } from "../../store/cart";
import { deleteProductById } from "../../store/products";

const ProductCartCard = ({
    product,
    onCartPage = false,
    onAdminPage = false
}) => {
    const dispatch = useDispatch();
    const currentUserData = useSelector(getCurrentUserData());
    const currentUserDataStatus = useSelector(getDataStatus());
    const inCart = currentUserDataStatus
        ? currentUserData.cart.find(p => p.productId === product._id)
        : false;

    const handleNavToCart = () => {
        history.push("/cart");
    };

    const handleAddToCart = product => {
        dispatch(addProductToCart(product));
    };

    const handleRemoveFromCart = id => {
        dispatch(removeProductFromCart(id));
    };

    const handleEditProduct = id => {
        console.log("Реалихуй handleEditProduct!", id);
    };

    const handleDeleteProduct = id => {
        dispatch(deleteProductById(id));
    };

    return (
        <div className="card mb-3 d-flex flex-row ps-0">
            <img
                className="rounded-start"
                src={product.image}
                alt="Фото еще нет"
                width="300"
            />
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.definition}</p>
                {!onAdminPage ? (
                    inCart ? (
                        <>
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
