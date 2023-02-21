import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getCurrentProduct, loadProductById } from "../../store/products";
import history from "../../utils/history";

const ProductPage = ({ id }) => {
    const dispatch = useDispatch();
    const product = useSelector(getCurrentProduct());
    const inCart = false;

    const handleNavToCart = () => {
        history.push("/cart");
    };

    const handleAddToCart = () => {
        console.log("Реализуй метод добавления в корзину");
    };

    useEffect(() => {
        dispatch(loadProductById(id));
    }, [id]);

    if (!product) return "Loading...";

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
                    <button
                        className="btn btn-lg btn-primary"
                        onClick={handleNavToCart}
                    >
                        Перейти к корзине
                    </button>
                ) : (
                    <button
                        className="btn btn-lg btn-primary"
                        onClick={handleAddToCart}
                    >
                        В корзину
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
