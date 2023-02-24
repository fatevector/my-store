import httpService from "./http.service";
// import { getUserId } from "./localStorage.service";

const userEndpoint = "users/";

const userService = {
    // create: async payload => {
    //     const { data } = await httpService.put(
    //         userEndpoint + payload._id,
    //         payload
    //     );
    //     return data;
    // },
    update: async payload => {
        const { data } = await httpService.put(
            userEndpoint + payload.id,
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
