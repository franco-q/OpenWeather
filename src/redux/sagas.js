import { call, put, takeEvery, all, takeLatest } from 'redux-saga/effects'
import { getPositionByIp, getWeather, getForecastWeather } from '../api'
import {
	getGeolocationFailed,
	getGeolocationSuccess,
	getWeatherByGeolocationSuccess,
	getWeatherByGeolocationFailed,
	searchCitySuccess,
	searchCityFailed,
	updateWeatherSuccess,
	updateWeatherFailed,
	GET_GEOLOCATION,
	GET_GEOLOCATION_SUCCESS,
	SEARCH_CITY,
	UPDATE_WEATHER,
	GET_FORECAST_WEATHER,
	getForecastWeatherSuccess,
	getForecastWeatherFailed
} from './actions'

/**
 * Watcher generator
 * Espera cada action type GET_GEOLOCATION
 * Arranca el proceso de geolocalización y consulta del clima local
 */
export function* watchGetGeolocation() {
	// GET_GEOLOCATION es lanzado desde "src/screens/index.js"
	yield takeEvery(GET_GEOLOCATION, getGeolocationSaga)
}

/**
 * Saga generator
 * Llama a ip-api y luego hace un dispatch de getGeolocationSuccess con el nombre de la ciudad
 * Esta Saga es lanzada desde watchGetGeolocation
 */
export function* getGeolocationSaga() {
	try {
		const geolocation = yield call(getPositionByIp)
		yield put(getGeolocationSuccess(geolocation))
	} catch (error) {
		// reducers error
		yield put(
			getGeolocationFailed({ message: 'No se pudo localizar tu ubicacion.' })
		)
	}
}

/**
 * Watcher generator
 * Espera cada action type GET_GEOLOCATION_SUCCESS
 * Lanzada desde getGeolocationSaga
 */
export function* watchGetGeolocationSuccess() {
	yield takeEvery(GET_GEOLOCATION_SUCCESS, getGeolocationSagaSuccessSaga)
}

/**
 * Saga generator
 * Recive el action { type : GET_GEOLOCATION_SUCCESS, geolocation }
 * Hace un call a OpenWeather con el valor de geolocation
 * Lanzada desde watchGetGeolocationSuccess
 */
export function* getGeolocationSagaSuccessSaga(action) {
	try {
		const data = yield call(getWeather, `q=${action.geolocation.city}`)
		// Este dispatch guarda la data en cities reducer
		yield put(getWeatherByGeolocationSuccess(data))
	} catch (error) {
		// reducers error
		yield put(
			getWeatherByGeolocationFailed({
				message: 'No se pudo encontrar el clima para tu ubicacion.'
			})
		)
	}
}

/**
 * Watcher generator
 * Llama a la saga searchCitySaga despues del ultimo dispatch type SEARCH_CITY
 */
export function* watchSearchCity() {
	yield takeLatest(SEARCH_CITY, searchCitySaga)
}

/**
 * Saga generador
 * Recive como paremetro el action { tpye SEARCH_CITY, query : string }
 * Hace un call a OpenWeather con el parametro de busqueda
 */
export function* searchCitySaga(action) {
	try {
		const data = yield call(getWeather, `q=${action.query}`)
		// Este dispatch guarda la data en cities reducer
		yield put(searchCitySuccess(data))
	} catch (e) {
		// reducers error
		yield put(
			searchCityFailed({
				message: 'No se encontraron ciudades que coincidan con la busqueda.'
			})
		)
	}
}

/**
 * Watcher generator
 * Llama a la saga updateWeatherSaga despues del ultimo dispatch type UPDATE_WEATHER
 */
export function* watchUpdateWeather() {
	yield takeLatest(UPDATE_WEATHER, updateWeatherSaga)
}

/**
 * Saga generador
 * Recive como paremetro el action { tpye SEARCH_CITY, id : string }
 * Hace un call a OpenWeather con el id como parametro de busqueda
 */
export function* updateWeatherSaga(action) {
	try {
		const data = yield call(getWeather, `id=${action.id}`)
		// Este dispatch guarda la data en cities reducer
		yield put(updateWeatherSuccess(data))
	} catch (e) {
		// reducers error
		yield put(
			updateWeatherFailed({
				message: 'No se encontraron ciudades que coincidan con la busqueda.'
			})
		)
	}
}

/**
 * Watcher generator
 * Llama a la saga getForecastWeather despues del ultimo dispatch type GET_FORECAST_WEATHER
 */
export function* watchGetForecastWeather() {
	yield takeLatest(GET_FORECAST_WEATHER, getForecastWeatherSaga)
}

/**
 * Saga generador
 * Recive como paremetro el action { tpye SEARCH_CITY, payload: { id: numeric, lat : numeric, lon: numeric }}
 * Hace un call a OpenWeather para obtener el pronostico a futuro
 */
export function* getForecastWeatherSaga(action) {
	try {
		const { id, lat, lon } = action.payload
		const data = yield call(getForecastWeather, lat, lon)
		// Este dispatch guarda la data en cities reducer
		yield put(getForecastWeatherSuccess(id, data))
	} catch (e) {
		// reducers error
		yield put(
			getForecastWeatherFailed({
				message: 'No se pudo obtener el pronostico del clima.'
			})
		)
	}
}

/**
 * rootSaga generator
 * Ejecuta todos los watchers
 */
export default function* () {
	yield all([
		watchGetGeolocation(),
		watchGetGeolocationSuccess(),
		watchSearchCity(),
		watchUpdateWeather(),
		watchGetForecastWeather()
	])
}
