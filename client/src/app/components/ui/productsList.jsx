import ProductCard from "./productCard";

const ProductsList = ({ productsList }) => {
    return (
        <ul className="row g-3 pe-3">
            {productsList.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ul>
    );
};

export default ProductsList;
