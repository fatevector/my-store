import httpService from "./http.service";

const productEndpoint = "products/";

const productService = {
    get: async () => {
        const { data } = await httpService.get(productEndpoint);
        return data;
    },
    getByCategory: async (category, page, limit) => {
        let endpoint = productEndpoint.slice(0, -1);
        if (category.name === "Популярное") {
            endpoint += "?filterBy=popular&equalTo=true";
        } else {
            endpoint += `?filterBy=category&equalTo=${category._id}`;
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
    },
    deleteById: async id => {
        const { data } = await httpService.delete(productEndpoint + id);
        return data;
    },
    create: async payload => {
        const { data } = await httpService.post(productEndpoint, payload);
        return data;
    },
    update: async payload => {
        const { data } = await httpService.patch(
            productEndpoint + payload._id,
            payload
        );
        return data;
    }
};

export default productService;
