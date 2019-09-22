import {weatherApi} from "./weatherApi";
import {localStorageService as repositoryService} from "./localStorageService";

export const GET_WEATHER_SUCCESS = "Weather/GET_WEATHER_SUCCESS";
export const SET_CURRENT_CITY = "Weather/SET_CURRENT_CITY";
export const SET_ERROR = "Weather/SET_ERROR";
export const ADD_CITY = "Weather/ADD_CITY";
export const SET_CITIES = "Weather/SET_CITIES";

const initialState = {
    city: null,
    temp: null,
    windSpeed: null,
    dirOfWind: null,
    cities: [],
    isResponseFromServer: false,
    error: null
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_WEATHER_SUCCESS:
            debugger
            let directionWind = action.dirOfWind;
            if (action.dirOfWind = 0) {
                directionWind = 'С'
            } else if (action.dirOfWind > 0 && action.dirOfWind < 90) {
                directionWind = 'СВ'
            } else if (action.dirOfWind = 90) {
                directionWind = 'В'
            } else if (action.dirOfWind > 90 && action.dirOfWind < 180) {
                directionWind = 'ЮВ'
            } else if (action.dirOfWind = 180) {
                directionWind = 'Ю'
            } else if (action.dirOfWind > 180 && action.dirOfWind < 270) {
                directionWind = 'ЮЗ'
            } else if (action.dirOfWind = 270) {
                directionWind = 'З'
            } else if (action.dirOfWind > 270 && action.dirOfWind < 360) {
                directionWind = 'СВ'
            } else if (action.dirOfWind = 360) {
                directionWind = 'С'
            }
            return {

                ...state,
                temp: action.temp,
                windSpeed: action.windSpeed,
                dirOfWind: directionWind
            }
        case SET_CURRENT_CITY: {
            return {
                ...state,
                city: action.city
            }
        }
        case ADD_CITY: {
            return {
                ...state,
                cities: [action.city, ...state.cities]
            }
        }

        case SET_CITIES: {
            return {
                ...state,
                cities: action.cities
            }
        }
        case SET_ERROR: {
            return {
                ...state,
                error: action.error
            }
        }

        default :
            return state;
    }
}

export const getWeather = (title) => async (dispatch, getState) => {
    let city = title;
    let cities = getState().weatherPage.cities;

    try {
        const data = await weatherApi.getData(city);
        // res.data.main.temp - temperature in kelvin
        dispatch(getWeatherSuccess(data.main.temp, data.wind.speed, data.wind.deg))

        // don't push the city which already is in list;
        let compareCity = cities.filter(oldCity => oldCity.toUpperCase() === city.toUpperCase());
        if (compareCity.length === 0) {
            dispatch(addCity(city));
            repositoryService.saveCities(getState().weatherPage.cities);
        }
        dispatch(setCurrentCity(title));
        dispatch(setError(null));
    } catch (errorMessage) {
        dispatch(setError(errorMessage));
    }
}
export const loadCities = () => async (dispatch) => {
    const cities = await repositoryService.loadCities();
    dispatch(loadCitiesSuccess(cities));
}

export const setCurrentCity = (city) => ({type: SET_CURRENT_CITY, city})
export const setError = (error) => ({type: SET_ERROR, error})
export const addCity = (city) => ({type: ADD_CITY, city})
export const loadCitiesSuccess = (cities) => ({type: SET_CITIES, cities});
export const getWeatherSuccess = (temp, speed, deg) => ({
    type: GET_WEATHER_SUCCESS,
    // 273.15 - is absolute zero
    temp: Math.floor(temp - 273.15),
    windSpeed: speed,
    dirOfWind: deg
})


export default reducer;