import httpService from "./http.service";
import { useSelector } from "react-redux";

const productEndpoint = "products/";

const productService = {
    getByCategory: async (categoryId, page, limit) => {
        const popularCategory = useSelector(getCategoriesList()).find(
            category => category.name === "Популярное"
        );
        let endpoint = productEndpoint.slice(0, -1);
        if (categoryId === popularCategory._id) {
            endpoint += "?filterBy=popular&equalTo=true";
        } else {
            endpoint += `?filterBy=category&equalTo=${categoryId}`;
        }
        if (page && limit) endpoint += `&_page=${page}&_limit=${limit}`;
        const { data } = await httpService.get(endpoint);
        return data;
    },
    getById: async id => {
        const { data } = await httpService.get(productEndpoint + id);
        return data;
    },
    getByIdsList: async idsList => {
        const dataList = await Promise.all(
            idsList.map(id => httpService.get(productEndpoint + id))
        );
        const data = { content: dataList.map(item => item.data.content) };
        return data;
    }
};

export default productService;
