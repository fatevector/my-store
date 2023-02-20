const ProductsList = ({ productsList }) => {
    return (
        <ul>
            {productsList.map(product => (
                <li key={product.id}>{product.name}</li>
            ))}
        </ul>
    );
};

export default ProductsList;
