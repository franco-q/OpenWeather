export const GET_GEOLOCATION = 'GET_GEOLOCATION'
export const getGeolocation = () => ({
	type: GET_GEOLOCATION
})

export const GET_GEOLOCATION_SUCCESS = 'GET_GEOLOCATION_SUCCESS'
export const getGeolocationSuccess = geolocation => ({
	type: GET_GEOLOCATION_SUCCESS,
	payload: geolocation
})

export const GET_GEOLOCATION_FAILED = 'GET_GEOLOCATION_FAILED'
export const getGeolocationFailed = () => ({
	type: GET_GEOLOCATION_FAILED
})

export const GET_WEATHER_BY_GEOLOCATION = 'GET_WEATHER_BY_GEOLOCATION'
export const getWeatherByGeolocation = () => ({
	type: GET_WEATHER_BY_GEOLOCATION
})

export const GET_WEATHER_BY_GEOLOCATION_SUCCESS =
	'GET_WEATHER_BY_GEOLOCATION_SUCCESS'
export const getWeatherByGeolocationSuccess = data => ({
	type: GET_WEATHER_BY_GEOLOCATION_SUCCESS,
	payload: data
})

export const GET_WEATHER_BY_GEOLOCATION_FAILED =
	'GET_WEATHER_BY_GEOLOCATION_FAILED'
export const getWeatherByGeolocationFailed = error => ({
	type: GET_WEATHER_BY_GEOLOCATION_FAILED,
	error
})

export const SEARCH_CITY = 'SEARCH_CITY'
export const searchCity = query => ({
	type: SEARCH_CITY,
	payload: { query }
})

export const SEARCH_CITY_SUCCESS = 'SEARCH_CITY_SUCCESS'
export const searchCitySuccess = data => ({
	type: SEARCH_CITY_SUCCESS,
	payload: data
})

export const SEARCH_CITY_FAILED = 'SEARCH_CITY_FAILED'
export const searchCityFailed = error => ({
	type: SEARCH_CITY_FAILED,
	error
})

export const UPDATE_WEATHER = 'UPDATE_WEATHER'
export const updateWeather = id => ({
	type: UPDATE_WEATHER,
	payload: { id }
})

export const UPDATE_WEATHER_SUCCESS = 'UPDATE_WEATHER_SUCCESS'
export const updateWeatherSuccess = data => ({
	type: UPDATE_WEATHER_SUCCESS,
	payload: data
})

export const UPDATE_WEATHER_FAILED = 'UPDATE_WEATHER_FAILED'
export const updateWeatherFailed = error => ({
	type: UPDATE_WEATHER_FAILED,
	error
})

export const GET_FORECAST_WEATHER = 'GET_FORECAST_WEATHER'
export const getForecastWeather = (id, lat, lon) => ({
	type: GET_FORECAST_WEATHER,
	payload: { id, lat, lon }
})

export const GET_FORECAST_WEATHER_SUCCESS = 'GET_FORECAST_WEATHER_SUCCESS'
export const getForecastWeatherSuccess = (id, forecast) => ({
	type: GET_FORECAST_WEATHER_SUCCESS,
	payload: { id, forecast }
})

export const GET_FORECAST_WEATHER_FAILED = 'GET_FORECAST_WEATHER_FAILED'
export const getForecastWeatherFailed = error => ({
	type: GET_FORECAST_WEATHER_FAILED,
	error
})

export const REMOVE_CITY_BY_ID = 'REMOVE_CITY_BY_ID'
export const removeCityById = id => ({
	type: REMOVE_CITY_BY_ID,
	payload: { id }
})
