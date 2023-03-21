import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCategoriesList } from "../../store/categories";
import { getProductsList, loadProductsList } from "../../store/products";
import paginate from "../../utils/paginate";
import history from "../../utils/history";
import { useTheme } from "../hooks/useTheme";

import GroupList from "../common/groupList";
import ProductsList from "../ui/productsList";
import Pagination from "../common/pagination";
import ProductCartCard from "../ui/productCartCard";
import Loader from "../common/loader";
import SearchField from "../common/searchField";

const AdminPage = () => {
    const { theme } = useTheme();
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

    const handleCreateProduct = () => {
        history.push("/admin/create");
    };

    const handleSearchChange = ({ target }) => {
        setSearchRequest(target.value);
    };

    const filteredProducts = filter
        ? productsList.filter(p => filter.rule(p))
        : productsList;

    useEffect(() => {
        if (
            filteredProducts &&
            currentPage > Math.ceil(filteredProducts.length / pageSize)
        )
            setCurrentPage(prevState => prevState - 1);

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
                <div className="d-flex flex-column container me-3">
                    {productsList ? (
                        <>
                            <button
                                className="btn border border-primary py-3 mb-3 fs-2 text-body bg-body"
                                onClick={handleCreateProduct}
                                data-bs-theme={theme}
                            >
                                +
                            </button>
                            <SearchField
                                name="searchRequest"
                                value={searchRequest}
                                onChange={handleSearchChange}
                                placeholder="Поиск..."
                                className="mb-3 rounded"
                            />
                            {filteredProducts.length !== 0 ? (
                                <>
                                    <ProductsList
                                        productsList={paginate(
                                            filteredProducts,
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
                                                itemsCount={
                                                    filteredProducts.length
                                                }
                                                pageSize={pageSize}
                                                currentPage={currentPage}
                                                onPageChange={handlePageChange}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <h3>По данному запросу нет товаров</h3>
                            )}
                        </>
                    ) : (
                        <Loader className="mt-70" />
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminPage;
