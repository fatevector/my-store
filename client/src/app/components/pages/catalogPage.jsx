import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategoriesList } from "../../store/categories";
import { getProductsList, loadProductsList } from "../../store/products";
import paginate from "../../utils/paginate";

import GroupList from "../common/groupList";
import ProductsList from "../ui/productsList";
import Pagination from "../common/pagination";
import ProductMenuCard from "../ui/productMenuCard";
import Loader from "../common/loader";
import SearchField from "../common/searchField";
import Sort from "../ui/sort";

const CatalogPage = () => {
    const dispatch = useDispatch();
    let productsList = useSelector(getProductsList());
    if (productsList) productsList = productsList.filter(p => !p.isDeleted);
    const categoriesList = useSelector(getCategoriesList());
    const categories = useSelector(getCategoriesList());
    const popularCategory = categories.find(
        category => category.name === "Популярное"
    );
    const [selectedCategory, setSelectedCategory] = useState(popularCategory);
    const [searchRequest, setSearchRequest] = useState(undefined);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 3;
    const [filter, setFilter] = useState();
    const [sort, setSort] = useState("up");

    const handleCategorySelect = item => {
        setSelectedCategory(item);
    };

    const handleClearFilter = () => {
        setSelectedCategory(undefined);
        setCurrentPage(1);
        setFilter(undefined);
        setSearchRequest(undefined);
    };

    const handlePageChange = pageIndex => {
        setCurrentPage(pageIndex);
    };

    const handleSearchChange = ({ target }) => {
        setSearchRequest(target.value);
    };

    const handlePriceUp = () => {
        setSort("up");
    };

    const handlePriceDown = () => {
        setSort("down");
    };

    let sortedProducts;
    if (productsList)
        sortedProducts =
            sort === "up"
                ? productsList.sort((a, b) => a.price - b.price)
                : productsList.sort((a, b) => b.price - a.price);

    const filteredProducts =
        sortedProducts && filter
            ? sortedProducts.filter(p => filter.rule(p))
            : sortedProducts;

    useEffect(() => {
        if (
            filteredProducts &&
            currentPage > Math.ceil(filteredProducts.length / pageSize)
        ) {
            setCurrentPage(prevState => prevState - 1);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filteredProducts]);

    useEffect(() => {
        if (selectedCategory !== undefined) {
            setCurrentPage(1);
            setSearchRequest(undefined);
            dispatch(loadProductsList());
            if (selectedCategory.name === "Популярное") {
                setFilter({
                    rule: product => product.popular === true
                });
            } else {
                setFilter({
                    rule: product => product.category === selectedCategory._id
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCategory]);

    useEffect(() => {
        if (searchRequest !== undefined) {
            setCurrentPage(1);
            setSelectedCategory(undefined);
            setFilter({
                rule: p =>
                    p.name.toLowerCase().includes(searchRequest.toLowerCase())
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchRequest]);

    return (
        <>
            <h1 className="ms-3 ">Каталог</h1>
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
                    <SearchField
                        name="searchRequest"
                        value={searchRequest}
                        onChange={handleSearchChange}
                        placeholder="Поиск..."
                        className="mb-3 rounded"
                    />
                    {productsList ? (
                        <>
                            <Sort
                                onPriceUp={handlePriceUp}
                                onPriceDown={handlePriceDown}
                                value={sort}
                            />
                            <ProductsList
                                productsList={paginate(
                                    filteredProducts,
                                    currentPage,
                                    pageSize
                                )}
                                component={ProductMenuCard}
                            />
                            {/* <div className="d-flex justify-content-center "> */}
                            <div className="row">
                                <div className="col-12 g-3 d-flex justify-content-center">
                                    <Pagination
                                        itemsCount={filteredProducts.length}
                                        pageSize={pageSize}
                                        currentPage={currentPage}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </>
                    ) : (
                        <Loader className="mt-70" />
                    )}
                </div>
            </div>
        </>
    );
};

export default CatalogPage;
