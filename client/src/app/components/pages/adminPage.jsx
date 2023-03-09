import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategoriesList } from "../../store/categories";
import { getProductsList, loadProductsList } from "../../store/products";
import paginate from "../../utils/paginate";

import GroupList from "../common/groupList";
import ProductsList from "../ui/productsList";
import Pagination from "../common/pagination";
import ProductCartCard from "../ui/productCartCard";
// import SearchField from "../common/searchField";

const AdminPage = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(getProductsList());
    const categoriesList = useSelector(getCategoriesList());
    const categories = useSelector(getCategoriesList());
    const popularCategory = categories.find(
        category => category.name === "Популярное"
    );
    const [selectedCategory, setSelectedCategory] = useState(popularCategory);
    // const [searchRequest, setSearchRequest] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    // const [filter, setFilter] = useState();

    const handleCategorySelect = item => {
        setSelectedCategory(item);
    };

    const handleClearFilter = () => {
        setSelectedCategory(popularCategory);
        setCurrentPage(1);
        // setFilter(undefined);
        // setSearchRequest(undefined);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleCreateProduct = () => {
        console.log("Реализуй handleCreateProduct");
    };

    useEffect(() => {
        if (
            productsList &&
            currentPage > Math.ceil(productsList.length / pageSize)
        )
            setCurrentPage(prevState => prevState - 1);
    }, [productsList]);

    useEffect(() => {
        if (selectedCategory !== undefined) {
            setCurrentPage(1);
            // setSearchRequest(undefined);
            dispatch(loadProductsList(selectedCategory));
            // setFilter({
            //     rule: product => product.category === selectedCategory._id
            // });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    return (
        <>
            <h1 className="ms-3">Каталог</h1>
            <div className="d-flex">
                <div className="d-flex flex-column flex-shink-0 px-3">
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
                <div className="d-flex flex-column container">
                    {productsList ? (
                        <>
                            {/* <SearchField
                            name="searchRequest"
                            value={searchRequest}
                            onChange={handleSearchChange}
                            placeholder="Поиск..."
                        /> */}
                            <button
                                className="btn btn-light border border-primary py-3 mb-3 fs-2"
                                onClick={handleCreateProduct}
                            >
                                +
                            </button>
                            {productsList.length !== 0 ? (
                                <>
                                    <ProductsList
                                        productsList={paginate(
                                            productsList,
                                            currentPage,
                                            pageSize
                                        )}
                                        component={props => (
                                            <ProductCartCard
                                                onAdminPage={true}
                                                {...props}
                                            />
                                        )}
                                    />
                                    <div className="row">
                                        <div className="col-12 g-3 d-flex justify-content-center">
                                            <Pagination
                                                itemsCount={productsList.length}
                                                pageSize={pageSize}
                                                currentPage={currentPage}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <h3>В данной категории нет товаров</h3>
                            )}
                        </>
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
