import httpService from "./http.service";
// import { getUserId } from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    // create: async payload => {
    //     const { data } = await httpService.put(
    //         userEndpoint + payload._id,
    //         payload
    //     );
    //     return data;
    // },
    update: async payload => {
        console.log(payload);
        const { data } = await httpService.put(
            userEndpoint + payload.id,
            payload
        );
        return data;
    },
    get: async () => {
        const { data } = await httpService.get(userEndpoint + 1); //убрать хардкод id
        return data;
    }
};

export default userService;
