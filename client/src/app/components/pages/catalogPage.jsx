import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategoriesList } from "../../store/categories";
import { getProductsList, loadProductsList } from "../../store/products";
import paginate from "../../utils/paginate";

import GroupList from "../common/groupList";
import ProductsList from "../ui/productsList";
import Pagination from "../common/pagination";
// import SearchField from "../common/searchField";

const CatalogPage = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsList());
    const categoriesList = useSelector(getCategoriesList());
    const [selectedCategory, setSelectedCategory] = useState({
        id: 0,
        name: "Популярное"
    });
    // const [searchRequest, setSearchRequest] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    // const [filter, setFilter] = useState();

    const handleCategorySelect = item => {
        setSelectedCategory(item);
    };

    const handleClearFilter = () => {
        setSelectedCategory({
            id: 0,
            name: "Популярное"
        });
        setCurrentPage(1);
        // setFilter(undefined);
        // setSearchRequest(undefined);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    useEffect(() => {
        if (selectedCategory !== undefined) {
            setCurrentPage(1);
            // setSearchRequest(undefined);
            dispatch(loadProductsList(selectedCategory.id));
            // setFilter({
            //     rule: product => product.category === selectedCategory.id
            // });
        }
    }, [selectedCategory]);

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
                    <>
                        {/* <SearchField
                            name="searchRequest"
                            value={searchRequest}
                            onChange={handleSearchChange}
                            placeholder="Поиск..."
                        /> */}
                        <ProductsList
                            productsList={paginate(
                                productsList,
                                currentPage,
                                pageSize
                            )}
                        />
                        <div className="d-flex justify-content-center">
                            <Pagination
                                itemsCount={productsList.length}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
