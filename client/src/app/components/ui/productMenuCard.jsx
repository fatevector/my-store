import history from "../../utils/history";

const ProductMenuCard = ({ product }) => {
    const handleNavToProductPage = id => {
        history.push(`/product/${id}`);
    };
    return (
        <div className="col-4">
            <div
                className="card text-body bg-body"
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
                    <h3 className="card-text text-body text-end">
                        {product.price} руб.
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default ProductMenuCard;
