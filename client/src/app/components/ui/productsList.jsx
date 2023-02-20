const ProductsList = ({ productsList }) => {
    return (
        <ul>
            {productsList.map(product => (
                <li>{product.name}</li>
            ))}
        </ul>
    );
};

export default ProductsList;
