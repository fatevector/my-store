import httpService from "./http.service";

const productEndpoint = "product/";

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
    }
};

export default productService;
