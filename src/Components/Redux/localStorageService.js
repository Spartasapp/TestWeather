const keys = { cities: 'cities' };
const maxCitiesCountForSaving = 3;


export const localStorageService = {
    saveCities(cities) {
        let cityAsString = JSON.stringify(cities.filter( (c, i) => i < maxCitiesCountForSaving));

        localStorage.setItem(keys.cities, cityAsString)
        return Promise.resolve();
    },

    loadCities() {
        const cities = JSON.parse(localStorage.getItem(keys.cities))
        return Promise.resolve(cities || []);
    }
}