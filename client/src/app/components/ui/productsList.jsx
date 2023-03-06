import ProductMenuCard from "./productMenuCard";

const ProductsList = ({ productsList }) => {
    return (
        <div className="row row-cols-auto g-3">
            {productsList.map(product => (
                <ProductMenuCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductsList;
