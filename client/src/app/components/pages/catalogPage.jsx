import { useSelector } from "react-redux";

import { getCategoriesList } from "../../store/categories";

const CatalogPage = () => {
    const categoriesList = useSelector(getCategoriesList());
    return (
        <ul>
            {categoriesList.map(category => (
                <li key={category.id}>{category.name}</li>
            ))}
        </ul>
    );
};

export default CatalogPage;
