import * as axios from "axios";

export const instance = axios.create({
    baseURL: 'http://api.openweathermap.org/data/2.5/',
});

export const weatherApi = {
    async getData(city) {
        try {
            const res = await instance.get(`weather?q=${city}&APPID=99f7b0899ae20d84d4ec3109e0e0d781`)
            return res.data;
        } catch(error) {
            if (error.response.status === 404) {
                return Promise.reject("City not found");
            } else {
                return Promise.reject("Some error occurred")
            }

        }
    }
}