import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentProduct, loadProductById } from "../../store/products";
import BackHistoryButton from "../common/backButton";
import ProductCartCard from "../ui/productCartCard";

const ProductPage = ({ id }) => {
    const dispatch = useDispatch();
    const product = useSelector(getCurrentProduct());

    useEffect(() => {
        dispatch(loadProductById(id));
    }, [id]);

    if (!product || product.id != id) return "Loading...";

    return (
        <div className="m-3">
            <BackHistoryButton />
            <ProductCartCard product={product} />;
        </div>
    );
};

export default ProductPage;
