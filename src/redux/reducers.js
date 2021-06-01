/* eslint-disable no-mixed-spaces-and-tabs */
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
	GET_FORECAST_WEATHER_FAILED,
	REMOVE_CITY_BY_ID,
	REMOVE_SNACKBAR
} from './actions'

function cities(state = [], action) {
	switch (action.type) {
		case REMOVE_CITY_BY_ID:
			return state.filter(city => city.id !== action.payload.id)
		case GET_WEATHER_BY_GEOLOCATION_SUCCESS:
			// La ciudad actual se guarda en el indice 0
			return [
				action.payload,
				...state.filter(city => city.id !== action.payload.id)
			]
		case UPDATE_WEATHER_SUCCESS:
		case SEARCH_CITY_SUCCESS:
			// si city ya existe la modifico sino hago un push al array
			return state.some(city => city.id === action.payload.id)
				? state.map(city =>
						city.id === action.payload.id ? action.payload : city
				  )
				: [...state, action.payload]
		case GET_FORECAST_WEATHER_SUCCESS:
			const { id, forecast } = action.payload
			// busco la ciudad por id y agrego/actualizo la prop forecast
			return state.map(city => (city.id === id ? { ...city, forecast } : city))
		default:
			return state
	}
}

function loading(state = true, action) {
	//loading = true -> action que lanza alguna function async(sagas)
	//loading = false -> action es llamada como resultado de una funcion async(sagas)
	switch (action.type) {
		case SEARCH_CITY:
		case GET_GEOLOCATION:
		case UPDATE_WEATHER:
		case GET_FORECAST_WEATHER:
			return true
		case REMOVE_CITY_BY_ID:
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
			return action.error
		default:
			return state
	}
}

/**
 * Usado para redirigir hacia alguna pantalla
 * despues de cierto action.
 * @returns {screen: String, params: any} { screen: Pantalla a redireccionar, params: parametros a pasar }.
 * ie ({ screen: 'Forecast', params: { id : 3430863 } })
 */
function redirect(state = null, action) {
	switch (action.type) {
		case GET_FORECAST_WEATHER_SUCCESS:
			const { id } = action.payload
			return { screen: 'Forecast', params: { id } }
		default:
			return state
	}
}

/**
 * Usado para mostrar el componente SnackBar en App.js
 * @returns {message: any, onDismiss: Func} { message: Mensaje a mostrar, onDismiss: funcion a ejecutar en el evento onDismiss }.
 * ie ({ message: 'Success.', onDismiss: () => console.log('Success.') })
 */
function snackbar(state, action) {
	switch (action.type) {
		case SEARCH_CITY_SUCCESS:
			return { message: 'Ciudad guardada.' }
		case REMOVE_CITY_BY_ID:
			return { message: 'Ciudad eliminada.' }
		case UPDATE_WEATHER_SUCCESS:
			return { message: 'Clima actualizado.' }
		case REMOVE_SNACKBAR:
		default:
			return null
	}
}

export default combineReducers({ cities, loading, error, redirect, snackbar })
