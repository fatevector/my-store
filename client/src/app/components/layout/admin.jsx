import { useParams } from "react-router-dom";

import ProductCreationPage from "../pages/productCreationPage";
import ProductEditingPage from "../pages/productEditingPage";
import AdminPage from "../pages/adminPage";

const Admin = () => {
    const { mode } = useParams();

    switch (mode) {
        case "create":
            return <ProductCreationPage />;
        case "edit":
            return <ProductEditingPage />;
        default:
            return <AdminPage />;
    }
};

export default Admin;
