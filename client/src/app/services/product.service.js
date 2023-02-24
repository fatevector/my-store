import httpService from "./http.service";

const productEndpoint = "products/";

const productService = {
    getByCategory: async (categoryId = 0, page, limit) => {
        let endpoint = productEndpoint.slice(0, -1);
        if (categoryId === 0) {
            endpoint += "?popular=true";
        } else {
            endpoint += `?category=${categoryId}`;
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
