import { combineReducers } from 'redux'
import {
	GET_GEOLOCATION,
	SEARCH_CITY,
	SEARCH_CITY_SUCCESS,
	SEARCH_CITY_FAILED,
	UPDATE_WEATHER,
	UPDATE_WEATHER_SUCCESS,
	UPDATE_WEATHER_FAILED,
	GET_WEATHER_BY_GEOLOCATION_SUCCESS,
	GET_WEATHER_BY_GEOLOCATION_FAILED,
	GET_FORECAST_WEATHER,
	GET_FORECAST_WEATHER_SUCCESS,
	GET_FORECAST_WEATHER_FAILED
} from './actions'

function cities(state = [], action) {
	switch (action.type) {
		case GET_WEATHER_BY_GEOLOCATION_SUCCESS:
			return [action.data, ...state.filter(city => city.id !== action.data.id)]
		case UPDATE_WEATHER_SUCCESS:
		case SEARCH_CITY_SUCCESS:
			return [...state.filter(city => city.id !== action.data.id), action.data]
		case GET_FORECAST_WEATHER_SUCCESS:
			const { id, forecast } = action.payload
			return state.map(city => (city.id === id ? { ...city, forecast } : city))
		default:
			return state
	}
}

function loading(state = true, action) {
	switch (action.type) {
		case SEARCH_CITY:
		case GET_GEOLOCATION:
		case UPDATE_WEATHER:
		case GET_FORECAST_WEATHER:
			return true
		case SEARCH_CITY_SUCCESS:
		case SEARCH_CITY_FAILED:
		case GET_WEATHER_BY_GEOLOCATION_SUCCESS:
		case GET_WEATHER_BY_GEOLOCATION_FAILED:
		case UPDATE_WEATHER_SUCCESS:
		case UPDATE_WEATHER_FAILED:
		case GET_FORECAST_WEATHER_SUCCESS:
		case GET_FORECAST_WEATHER_FAILED:
			return false
		default:
			return !!state
	}
}

function error(state = null, action) {
	switch (action.type) {
		case GET_WEATHER_BY_GEOLOCATION_FAILED:
		case SEARCH_CITY_FAILED:
		case GET_WEATHER_BY_GEOLOCATION_FAILED:
		case UPDATE_WEATHER_FAILED:
		case GET_FORECAST_WEATHER_FAILED:
			console.log(action)
			return action.error
		default:
			return state
	}
}

export default combineReducers({ cities, loading, error })
