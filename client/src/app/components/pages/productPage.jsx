import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentProduct, loadProductById } from "../../store/products";

import Loader from "../common/loader";
import BackHistoryButton from "../common/backButton";
import ProductCartCard from "../ui/productCartCard";

const ProductPage = ({ id }) => {
    const dispatch = useDispatch();
    const product = useSelector(getCurrentProduct());

    useEffect(() => {
        dispatch(loadProductById(id));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    if (!product || product._id !== id) return <Loader className="mt-200" />;

    return (
        <div className="m-3">
            <BackHistoryButton />
            <ProductCartCard product={product} />;
        </div>
    );
};

export default ProductPage;
