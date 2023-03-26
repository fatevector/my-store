import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getCurrentProduct,
    getProductError,
    loadProductById
} from "../../store/products";

import Loader from "../common/loader";
import BackHistoryButton from "../common/backButton";
import ProductCartCard from "../ui/productCartCard";

const ProductPage = ({ id }) => {
    const dispatch = useDispatch();
    const product = useSelector(getCurrentProduct());
    const loadingError = useSelector(getProductError());

    useEffect(() => {
        dispatch(loadProductById(id));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (loadingError)
        return (
            <div className="m-3">
                <BackHistoryButton />
                <h3 className="mt-3 text-body">Товар не найден</h3>;
            </div>
        );
    if (!product || product._id !== id) return <Loader className="mt-200" />;

    return (
        <div className="m-3">
            <BackHistoryButton />
            {product.isDeleted ? (
                <h3 className="m-3 text-body">Данный товар удален</h3>
            ) : (
                <ProductCartCard product={product} />
            )}
        </div>
    );
};

export default ProductPage;
