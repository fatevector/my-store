import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategoriesList } from "../../store/categories";
import { getProductsList, loadProductsList } from "../../store/products";
import GroupList from "../common/groupList";
import ProductsList from "../ui/productsList";

const CatalogPage = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsList());
    const categoriesList = useSelector(getCategoriesList());
    const [selectedCategory, setSelectedCategory] = useState();

    const handleCategorySelect = item => {
        setSelectedCategory(item);
    };

    const handleClearFilter = () => {
        setSelectedCategory(undefined);
        // setCurrentPage(1);
        // setFilter(undefined);
        // setSearchRequest(undefined);
    };

    useEffect(() => {
        dispatch(loadProductsList("popular", 1, 3));
    }, []);

    return (
        <div className="d-flex">
            <div className="d-flex flex-column flex-shink-0 p-3">
                <GroupList
                    selectedItem={selectedCategory}
                    items={categoriesList}
                    onItemSelect={handleCategorySelect}
                />
                <button
                    className="btn btn-secondary mt-2"
                    onClick={handleClearFilter}
                >
                    Очистить
                </button>
            </div>
            <div className="d-flex flex-column">
                {productsList ? (
                    <ProductsList productsList={productsList} />
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
