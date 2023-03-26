import { useParams } from "react-router-dom";

import CatalogPage from "../pages/catalogPage";
import ProductPage from "../pages/productPage";

const Catalog = () => {
    const params = useParams();
    if (!params.id) {
        return (
            <>
                <CatalogPage />
            </>
        );
    } else {
        return <ProductPage id={params.id} />;
    }
};

export default Catalog;
