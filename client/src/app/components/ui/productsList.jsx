const ProductsList = ({ productsList, component: Component }) => {
    return (
        <div className="row row-cols-auto g-3">
            {productsList.map(product => (
                <Component key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductsList;
