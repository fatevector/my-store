import ProductMenuCard from "./productMenuCard";

const ProductsList = ({ productsList }) => {
    return (
        <ul className="row g-3 pe-3">
            {productsList.map(product => (
                <ProductMenuCard key={product.id} product={product} />
            ))}
        </ul>
    );
};

export default ProductsList;
