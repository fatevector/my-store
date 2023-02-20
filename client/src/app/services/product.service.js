import httpService from "./http.service";

const productEndpoint = "product/";

const productService = {
    getByCategory: async (category = "popular", page = 1, limit = 3) => {
        let endpoint = productEndpoint.slice(0, -1);
        if (category === "popular") {
            endpoint += "?popular=true";
        } else {
            endpoint += `?category=${category}`;
        }
        endpoint += `&_page=${page}&_limit=${limit}`;
        const { data } = await httpService.get(endpoint);
        return data;
    }
};

export default productService;
