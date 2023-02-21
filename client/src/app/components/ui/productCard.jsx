import history from "../../utils/history";

const ProductCard = ({ product }) => {
    const handleNavToProductPage = id => {
        history.push(`/product/${id}`);
    };
    return (
        <div className="col-4">
            <div
                className="card"
                role="button"
                onClick={() => handleNavToProductPage(product.id)}
            >
                <div className="">
                    <img
                        className="card-img"
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

export default ProductCard;
