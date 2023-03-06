import httpService from "./http.service";

const userEndpoint = "users/";

const userService = {
    create: async payload => {
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    update: async payload => {
        const { data } = await httpService.patch(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    get: async id => {
        const { data } = await httpService.get(userEndpoint + id);
        return data;
    }
};

export default userService;
