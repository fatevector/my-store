import history from "../../utils/history";
import { useTheme } from "../hooks/useTheme";

const ProductMenuCard = ({ product }) => {
    const { theme } = useTheme();
    const handleNavToProductPage = id => {
        history.push(`/product/${id}`);
    };
    return (
        <div className="col-4">
            <div
                className={"card " + theme}
                role="button"
                onClick={() => handleNavToProductPage(product._id)}
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
                </div>
            </div>
        </div>
    );
};

export default ProductMenuCard;
